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
        source: "/github",
        destination: "https://github.com/atharvadeosthale",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/atharvadeosthale",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://instagram.com/atharvadeosthale",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "https://blog.atharva.codes",
        permanent: true,
      },
      {
        source: "/examples",
        destination: "https://examples.atharva.codes",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
