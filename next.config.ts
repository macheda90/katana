import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        // Vercel Blob public URLs: https://<bucket>.public.blob.vercel-storage.com/<key>
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};


export default nextConfig;
