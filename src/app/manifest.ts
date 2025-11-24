import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * The `manifest` function is used for Progessive Web App (PWA) metadata
 * @returns The metadata object
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.site.name,
    short_name: siteConfig.site.shortName,
    description: siteConfig.site.description,
    start_url: "/",
    display: siteConfig.pwa.display,
    background_color: siteConfig.pwa.backgroundColor,
    theme_color: siteConfig.pwa.themeColor,
    icons: [...siteConfig.assets.manifest.icons],
  };
}
