/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: process.env.GITHUB_PAGES === "true" ? "/sarcastiq" : "",
};

export default nextConfig;
