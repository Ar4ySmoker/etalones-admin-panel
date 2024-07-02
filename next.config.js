// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//     ],
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//       },
//     ],
//   },
//   async middleware() {
//     return [
//       {
//         source: "/((?!api|_next|static|public|favicon.ico).*)",
//         destination: "/api/auth/middleware",
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  experimental: {
    disableMiddlewareWarnings: true,
  },
  async middleware() {
    return [
      {
        source: "/((?!api|_next|static|public|favicon.ico).*)",
        destination: "/api/auth/middleware",
      },
    ];
  },
};

module.exports = nextConfig;
