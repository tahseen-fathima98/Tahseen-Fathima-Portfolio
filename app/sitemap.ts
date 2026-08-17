import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://tahseen-fathima.vercel.app").replace(/\/$/, "");
  return [
    { url: site, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site}/v1`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];
}
