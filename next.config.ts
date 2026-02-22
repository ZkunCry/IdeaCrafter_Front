import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  skipTrailingSlashRedirect: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "shadcn-ui"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.assets.so",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
