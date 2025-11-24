import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * The `robots` function is used for robots.txt metadata used by search engines
 * @returns The metadata object
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: siteConfig.robots.allow,
        disallow: siteConfig.robots.disallow,
      },
    ],
    sitemap: `${siteConfig.site.url}/sitemap.xml`,
  };
}
