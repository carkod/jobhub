/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiBase = process.env.API_SERVER_URL ?? "http://localhost:8080";
    return [
      { source: "/api/:path*", destination: `${apiBase}/api/:path*` },
      { source: "/pdf/:path*", destination: `${apiBase}/pdf/:path*` },
    ];
  },
};

export default nextConfig;
