import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://stimulusgroups.org";

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/partners`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/scope`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${base}/donate`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  return staticPages;
}
