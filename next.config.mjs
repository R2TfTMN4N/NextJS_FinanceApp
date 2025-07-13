/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  // Disable route announcer to remove loading messages
  reactStrictMode: true,
};

export default nextConfig;
