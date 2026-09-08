import type { NextConfig } from "next";

const rawBasePath = process.env.BASE_PATH;
const basePath =
  rawBasePath !== undefined
    ? rawBasePath.replace(/\/$/, "")
    : process.env.GITHUB_ACTIONS
      ? "/omarchy-ethiopia"
      : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath && basePath.length > 0 ? basePath : undefined,
};

export default nextConfig;
