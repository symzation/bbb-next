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
  rewrites: () => {
    return [
      {
        source: '/become-a-writer',
        destination: '/author', // Maps /not-authorized to /notAuthorized
      },
      {
        source: '/author-write',
        destination: '/compose', // Maps /not-authorized to /notAuthorized
      },
    ]
  }
}

export default nextConfig;
