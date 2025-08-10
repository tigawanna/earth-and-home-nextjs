// import "dotenv/config";
// import { clientEnvs } from "@/lib/client-env"
import "@/lib/envs/next-envs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_R2_PUBLIC_ORIGIN || "",
      },
    ],
  },
};

export default nextConfig;
