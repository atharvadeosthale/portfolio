---
title: How I fixed a major build issue in Appwrite's marketing website
date: 15-08-2026
cover: /blog/how-i-optimized-appwrite-website/cover.png
author: atharva
description: "My frustrations with the build process of the Appwrite marketing website, and how I took matters into my own hands to investigate and solve the problems."
---

As a Developer Advocate at [Appwrite](https://appwrite.io), I primarily work on documentation, blogs and internal tooling to make our team's life simpler. As a Developer Advocate or a Developer Relations person, I highly believe that someone working in DevRel **must** be technical. The name itself contains "**Developer** Advocate" and "**Developer** Relations", and as someone who is technical, you naturally find opportunities to improve workflows where you work, whether it's directly on the product or tooling that supports doing your job nicely.

I don't think I'm the perfect example of the ideal DevRel guy, because I lean towards the technical parts more than the relations part, but that makes me want to share a story with you all.

## What had happened

When I'm working on documentation at Appwrite, we're mostly dealing with pre-release software documentation, which goes through different rounds of reviews to make sure the documentation is well aligned with what users would find the most easy to follow. Part of the review process is to just run the marketing website that holds our blog, documentation, and our API references.

For all my colleagues in the DevRel team, it's quite easy, because we keep the `appwrite/website` repository cloned, and it's just a matter of switching branches and running the dev server. However, for the engineering team, who don't interact with the `appwrite/website` repository daily, it was very difficult to review based on the diff shown on GitHub.

Now, of course, you could go and set up custom preview deployments, but we decided not to, since we have an offering called [Appwrite Sites](https://appwrite.io/products/sites). Part of the offering is that we provide preview deployments for each PR opened. We believe that we should dogfood our ideas as much as possible.

So the problem should be solved and every engineer would see a preview deployment for our documentation changes, right? _Right?_

Well, my life isn't _that_ easy.

Turns out our marketing website was _undeployable_ on Appwrite Sites for reasons I wasn't aware of. I didn't have production or staging access for our edge infrastructure back then, so there was no way for me to find out. The builds would just die and no feedback would appear on logs.

We thought the build might be running out of memory, so we increased the build specifications to use 8GB RAM, and the build still failed. For more context, we only provide 8GB RAM to enterprise users.

The build problem existed since forever. It's just that we never got the time to actually check what was wrong because there was so much happening everyday at Appwrite, and for a problem someone could work around by just running a dev server, it didn't feel right to spend too much time investigating.

But I had enough of that. I was tired of looking at GitHub diff, and wanted to understand what is the problem that would just not let us run our marketing website on Appwrite Sites.

## Then I started investigating

Once I had decided that this was a problem I will try solving until I die, I tried a few things to understand what _really_ was wrong.

Our Appwrite Cloud and self-hosted versions work differently when it comes to the Sites offerings, for self-hosted, everything is under the one server you configured Appwrite on, unless you tinker around to change that.

For Cloud, we have an edge infrastructure that deals with building and serving sites and functions. My problem was specific to cloud.

So, I decided to run the most minimal version of Appwrite Cloud locally. I set up the main Appwrite Cloud API and the most minimal version of the edge infrastructure on my machine, and now I had a little sandbox I could play around with. My laptop was struggling, but I was at war with a problem.

So then I tried deploying the marketing website on the local version of cloud, and kept a close eye on any build containers that would pop up. I used Claude Code to specifically monitor any anomalies so we know where exactly is the failing point.

And the build container showed something the cloud logs never did. The build wasn't hanging at all. It was thrashing against the memory limit until the kernel killed it.

## The build that produced 49,123 files

Our API references are generated from a package called `@appwrite.io/specs`, which holds two kinds of files: OpenAPI spec JSONs describing every endpoint, and markdown files with code examples for every SDK method. The website pulled both into the build with `import.meta.glob`, one glob per Appwrite version for the examples and one for all the specs:

```ts
const examplesByVersion: Record<ExampleVersion, ExampleLoaders> = {
    '0.15.x': import.meta.glob('/node_modules/@appwrite.io/specs/examples/0.15.x/**/*.md', {
        query: '?raw',
        import: 'default'
    }),
    '1.0.x': import.meta.glob('/node_modules/@appwrite.io/specs/examples/1.0.x/**/*.md', {
        query: '?raw',
        import: 'default'
    }),
    // ...nine more of these
};

const specs = import.meta.glob('/node_modules/@appwrite.io/specs/specs/*/open-api3*.json', {
    exhaustive: true
});
```

This looks harmless, but `import.meta.glob` turns every matched file into a JavaScript module, and these globs matched a lot of files. Every spec JSON and every example markdown file went through Vite's full module treatment: transform, sourcemap, chunk. The globs expanded into around 58,000 lazy import statements, and the build produced **49,123 server chunks** weighing about **500 MB**, with peak memory hitting **7 GB**.

Suddenly the 8GB experiment made sense. The problem was never provisioning. We were handing the build a module graph 58,000 entries deep. 7 GB of usage on an 8 GB machine means constant memory pressure, and the moment the build peaked past the limit, the kernel OOM-killed the container. With, of course, nothing useful in the logs.

The frustrating part? These files are _data_. A JSON spec doesn't need a sourcemap. A markdown example doesn't need to be a chunk. These files just needed to be read off a disk.

## Fix one: stop importing data as code

The fix was to treat data like data. Resolve where the specs package lives, then read the files with `fs`:

```ts
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const specsRoot = dirname(
    createRequire(import.meta.url).resolve('@appwrite.io/specs/package.json')
);

export async function getApi(version: string, platform: string): Promise<OpenAPIV3.Document> {
    // ...
    const specPath = join(specsRoot, 'specs', version, filename);
    const raw = await readFile(specPath, 'utf8');
    // ...
}
```

Because the package is now needed at runtime instead of build time, I also moved it from `devDependencies` to `dependencies` so it survives a production install. The results:

|                          | Before   | After   |
| ------------------------ | -------- | ------- |
| Server chunks            | 49,123   | 3,194   |
| Peak build RSS           | 7.0 GB   | 5.6 GB  |
| Build wall time          | 3m 12s   | 1m 53s  |
| CI run (GitHub Actions)  | ~7m 30s  | ~4m     |

The build now finished in under two minutes without going anywhere near the memory ceiling. The win showed up on GitHub too, where the Actions run on every PR dropped from around seven and a half minutes to about four. I deployed to my local Sites setup, the build passed, the deployment activated, and I felt like a genius for about four minutes.

## The site that built, deployed, and refused to start

The deployment went live and the site was just dead. Not a single route responded.

I knew this about Appwrite Sites but had never thought about it seriously. Before packaging your deployment, Sites prunes `node_modules` and ships only what your build output actually needs. For nearly every site, that's a pure win: smaller deployments and faster cold starts. For us, it broke everything. My first fix made the server read the specs out of `node_modules` at runtime instead of bundling them into the build, so the pruning step threw away the exact files the server needed.

And remember that `createRequire(...).resolve(...)` at the top of `specs.ts`? It runs when the module loads. With the package gone, it throws, and the whole server crashes on boot. It wasn't even a 404 on the references pages. The whole server refused to start because some documentation data was missing.

This applies to more than our website. The filesystem your build sees is not the filesystem your runtime gets, so if your server reads files out of `node_modules` at runtime, check that the data actually ships with your build output.

So fix two: copy the data into the build output ourselves.

```js
// scripts/build.js
async function main() {
    await build();

    const require = createRequire(import.meta.url);
    const specsRoot = dirname(require.resolve('@appwrite.io/specs/package.json'));
    const target = resolve(projectRoot, 'build/_specs_data');

    await mkdir(target, { recursive: true });
    await cp(resolve(specsRoot, 'specs'), resolve(target, 'specs'), { recursive: true });
    await cp(resolve(specsRoot, 'examples'), resolve(target, 'examples'), { recursive: true });
}
```

The runtime code then tries `node_modules` first (local dev, Docker) and falls back to `_specs_data/` next to the server bundle (Sites).

Not everyone loved this. A colleague reviewing the change put it well: post-build scripts are always a bit scary, and couldn't we just keep a real import somewhere so the pruning step traces the package and keeps it? It's a fair instinct, and I tried it. It doesn't work. `@appwrite.io/specs` is a data-only package: its package.json has no `main` and no `exports`, just the `specs/` and `examples/` directories. `import * as specs from '@appwrite.io/specs'` has nothing to resolve to, so the build itself fails with "Cannot find module" before any tracer gets a say. The remaining options were hundreds of explicit deep imports like `import x from '@appwrite.io/specs/specs/foo.json'`, or globs again, which is the exact problem we had just deleted. So the boring copy step it is.

## The happy ending

The marketing website now deploys on Appwrite Sites, which means every PR to `appwrite/website` gets a preview deployment. Engineers reviewing documentation click a link instead of cloning a repo, switching branches, and running a dev server.

The investigation also produced feedback for our own product. The original failure mode, a build silently dying at the memory ceiling with nothing in the logs, is exactly the kind of thing that made this bug survive for so long. Dogfooding is useful only if the dog reports back, so I passed that to the engineering team.

And that's my whole point about DevRel being technical. I didn't fix this because it was my job. I fixed it because I had the access and, finally, the patience to stop working around a broken thing and go find out why it was broken. And because, honestly, I was pissed off. The build went from 3m 12s to 1m 53s and deploys where we always said it should. And I never have to review documentation through a GitHub diff again.
