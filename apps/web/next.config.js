/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@forge/ui", "@forge/core", "@forge/database"],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig