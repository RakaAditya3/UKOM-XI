const nextConfig = {
  images: {
    domains: ["kmzmzmrdwbaaibcgqowh.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", 
      },
    ],
  },
};

export default nextConfig;
