import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stimulusgroups.org",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/%D9%85%D9%86-%D9%86%D8%AD%D9%86", destination: "/about" },
      { source: "/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA", destination: "/services" },
      { source: "/%D8%B4%D8%B1%D9%83%D8%A7%D8%A4%D9%86%D8%A7", destination: "/partners" },
      { source: "/%D9%86%D8%B7%D8%A7%D9%82-%D8%A7%D9%84%D8%B9%D9%85%D9%84", destination: "/scope" },
      { source: "/%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D8%A7%D8%AA%D9%86%D8%A7", destination: "/projects" },
      { source: "/%D9%85%D8%AF%D9%88%D9%86%D8%A9", destination: "/blog" },
      { source: "/%D8%AA%D9%88%D8%A7%D8%B5%D9%84-%D9%85%D8%B9%D9%86%D8%A7", destination: "/contact" },
      { source: "/%D8%AA%D8%A8%D8%B1%D8%B9-%D9%85%D8%B9%D9%86%D8%A7", destination: "/donate" },
    ];
  },
};

export default nextConfig;
