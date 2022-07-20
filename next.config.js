/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    reactStrictMode: true,
    publicRuntimeConfig: {
        // Will be available on both server and client
        BACKEND_API: process.env.BACKEND_API,
    },
};

module.exports = nextConfig;
