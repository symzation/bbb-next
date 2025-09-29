import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',

      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',

      },
    ]
  },
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
