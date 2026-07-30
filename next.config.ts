import type { NextConfig } from "next";

const categoryRedirects = [
  "diplomacy",
  "foreign-policy",
  "economy",
  "security",
  "climate",
  "opinion",
  "analysis",
  "explainers",
  "intelligence",
  "nepal-world",
].map((slug) => ({
  source: `/${slug}`,
  destination: `/category/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Vercel Blob public URLs for CMS media uploads
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Common news CDN hosts used by Autopilot RSS image enclosures
      { protocol: "https", hostname: "ichef.bbci.co.uk" },
      { protocol: "https", hostname: "media.guim.co.uk" },
      { protocol: "https", hostname: "www.aljazeera.com" },
      { protocol: "https", hostname: "cdn.aljazeera.net" },
      { protocol: "https", hostname: "npr-brightspot.s3.amazonaws.com" },
      { protocol: "https", hostname: "media.npr.org" },
      { protocol: "https", hostname: "news.un.org" },
    ],
  },
  async redirects() {
    return [
      { source: "/news", destination: "/category/diplomacy", permanent: true },
      { source: "/research", destination: "/category/intelligence", permanent: true },
      { source: "/world", destination: "/category/analysis", permanent: true },
      { source: "/regions", destination: "/countries", permanent: true },
      { source: "/author", destination: "/authors", permanent: true },
      { source: "/ambassador", destination: "/ambassadors", permanent: true },
      { source: "/embassy", destination: "/embassies", permanent: true },
      { source: "/organization", destination: "/organizations", permanent: true },
      { source: "/country", destination: "/countries", permanent: true },
      ...categoryRedirects,
    ];
  },
};

export default nextConfig;
