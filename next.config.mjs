/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**', // The double wildcard allows any path on that domain
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**', // The double wildcard allows any path on that domain
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**', // The double wildcard allows any path on that domain
      },
    ],
  },
};

export default nextConfig;
