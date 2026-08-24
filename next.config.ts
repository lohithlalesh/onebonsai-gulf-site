import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  ...(isGitHubPages
    ? {
      output: "export",
      basePath: "/onebonsai-gulf-site",
      trailingSlash: true,
      typescript: {
        tsconfigPath: "tsconfig.pages.json",
      },
    }
    : {}),
};

export default nextConfig;
