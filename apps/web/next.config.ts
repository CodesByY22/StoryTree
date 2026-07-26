import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import "./lib/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "storytree",
  project: "storytree-web",
  silent: !process.env.CI,
  widenClientFileUpload: true
});
