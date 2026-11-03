import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/thinking",
        destination: "/notes",
        permanent: true,
      },
      {
        source: "/crew",
        destination: "/team",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
