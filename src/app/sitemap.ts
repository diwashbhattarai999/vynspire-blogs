import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * The `sitemap` function is used for sitemap.xml metadata used by search engines
 * @returns The metadata object
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.site.url}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}
