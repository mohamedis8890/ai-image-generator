/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "links.papareact.com",
      "aiimagegeneratormob6a3b9.blob.core.windows.net",
    ],
  },
};

module.exports = nextConfig;
