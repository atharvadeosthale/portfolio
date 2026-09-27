export interface Experience {
  company: string;
  role: string;
  logo: string;
  duration: string;
  years: string;
  summary: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    company: "Appwrite",
    role: "Developer Advocate",
    logo: "/appwrite.png",
    duration: "May 2025 - Present",
    years: "2025 — Now",
    summary:
      "Currently working as a Developer Advocate for Appwrite, working on the following areas:",
    points: [
      "High quality documentation",
      "Blog posts",
      "Assistance with product launches",
      "Community engagement and support",
      "Taking the lead to bringing AI-native automation to speed up DevRel processes",
      "YouTube videos (recording, editing and publishing)",
    ],
  },
  {
    company: "MyShell.ai",
    role: "Developer Relations Engineer",
    logo: "/myshell.png",
    duration: "Apr 2024 - Jun 2024",
    years: "2024",
    summary:
      "Helped developers create their own AI workflows using Pro Config, a tool that brings various AI tools together to build a unique and useful workflow.",
    points: [
      "Maintained the documentation",
      "Created content across the YouTube channel and blog",
    ],
  },
  {
    company: "thirdweb",
    role: "Developer Relations Engineer",
    logo: "/thirdweb.jpeg",
    duration: "Oct 2022 - Aug 2023",
    years: "2022 — 2023",
    summary:
      "Helped developers build easily using thirdweb's tools, with educational content that set them up for success building on the blockchain.",
    points: [
      "Guides and documentation",
      "Weekly community office hours",
      "Gathered feedback and reported it to the team",
    ],
  },
  {
    company: "LogRocket",
    role: "Freelance Technical Content Writer",
    logo: "/logrocket.jpeg",
    duration: "Jun 2021 - Dec 2023",
    years: "2021 — 2023",
    summary:
      "Wrote articles for the LogRocket blog on very technical topics within web development, such as payments and creating basic blockchains.",
    points: [
      "Helped the blog get more attention and sales for LogRocket's main product, an error logging and tracking solution for websites and apps",
    ],
  },
];
