/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
            },
            {
                protocol: 'https',
                hostname: 'dummyjson.com',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
        ],
    }
};

export default nextConfig;
