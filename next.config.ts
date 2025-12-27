import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-auth"],
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
  webpack: (config, { isServer }) => {
    // Only configure this for the client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        tls: false,
        net: false,
        // path: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
