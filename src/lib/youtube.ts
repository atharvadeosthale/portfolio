const CHANNEL_ID = "UC3UrEDB27fL3vbnt-tiMgoQ";
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const REVALIDATE = 60 * 60 * 6;

export const CHANNEL_URL = "https://www.youtube.com/@AtharvaDeosthale";

export interface Video {
  id: string;
  title: string;
  published: Date;
}

function decode(s: string) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// youtube.com/shorts/<id> answers 200 for a Short and redirects for a regular video
async function isShort(id: string) {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${id}`, {
      method: "HEAD",
      redirect: "manual",
      next: { revalidate: REVALIDATE },
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

// Latest full-length uploads from the channel's public RSS feed. Returns []
// if YouTube can't be reached, so the page still renders.
export async function getLatestVideos(limit = 3): Promise<Video[]> {
  try {
    const res = await fetch(FEED, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const xml = await res.text();

    const entries = xml
      .split("<entry>")
      .slice(1, 11)
      .map((entry) => ({
        id: entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "",
        title: decode(entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? ""),
        published: new Date(entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? 0),
      }))
      .filter((v) => v.id && v.title);

    const shorts = await Promise.all(entries.map((v) => isShort(v.id)));
    return entries.filter((_, i) => !shorts[i]).slice(0, limit);
  } catch {
    return [];
  }
}
