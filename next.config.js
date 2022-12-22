/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    images: {
        domains: ["maps.googleapis.com"],
    },
};

module.exports = nextConfig;
