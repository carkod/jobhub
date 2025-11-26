/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Preserve the existing behavior of serving from root
  basePath: '',
}

module.exports = nextConfig
