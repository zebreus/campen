/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repository.split("/")[1] || "campen";
const isUserPage = repoName.endsWith(".github.io");

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath: isGithubActions && !isUserPage ? `/${repoName}` : "",
  assetPrefix: isGithubActions && !isUserPage ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
