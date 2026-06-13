/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiBase =
      process.env.API_SERVER_URL ??
      (process.env.NODE_ENV === "development"
        ? "http://localhost:8082"
        : "http://back:8082");

    return [
      { source: "/api/:path*", destination: `${apiBase}/api/:path*` },
      { source: "/pdf/:path*", destination: `${apiBase}/pdf/:path*` },
    ];
  },
};

export default nextConfig;
