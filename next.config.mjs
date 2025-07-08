/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com", // ✅ add this line
    ],
  },
};

export default nextConfig;
