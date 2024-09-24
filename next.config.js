/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/yt",
        destination: "https://youtube.com/AtharvaDeosthale",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://x.com/athudeosthale",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "https://blog.atharva.codes",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
