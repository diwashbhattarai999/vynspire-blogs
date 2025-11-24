/**
 * The `siteConfig` object is used to configure the site
 * @returns The site configuration object
 */
export const siteConfig = {
  /* Company/Organization Information */
  company: {
    name: "Vynspire Labs",
    legalName: "Vynspire Labs",
  },

  /* Site Information */
  site: {
    name: "Vynspire Blog",
    shortName: "VBlogs",
    description:
      "Vynspire Labs Blog - Insights, tutorials, and updates on technology, development, and innovation",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://blog.vynspirelabs.com",
    locale: "en_US",
    category: "technology",
  },

  /* SEO Configuration */
  seo: {
    keywords: [
      "Vynspire Labs",
      "Blog",
      "Technology",
      "Development",
      "Tutorials",
      "Programming",
      "Software Development",
      "Tech Insights",
      "Innovation",
    ] as string[],
    title: {
      default: "Vynspire Blog",
      template: "%s | Vynspire Blog",
    },
  },

  /* Social Media */
  social: {
    twitter: {
      handle: "@vynspirelabs",
      cardType: "summary_large_image" as const,
    },
  },

  /* Theme Configuration */
  theme: {
    colors: {
      light: "#ffffff",
      dark: "#000000",
    },
  },

  /* Icons and Images */
  assets: {
    logo: {
      url: "/logo.png",
      width: 1200,
      height: 630,
      alt: "Vynspire Blog",
    },
    icons: {
      favicon: "/favicon.ico",
      svg: "/icon0.svg",
      apple: "/apple-icon.png",
    },
    manifest: {
      icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png" as const,
          purpose: "maskable" as const,
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png" as const,
          purpose: "maskable" as const,
        },
      ],
    },
  },

  /* PWA Configuration */
  pwa: {
    display: "standalone" as const,
    backgroundColor: "#ffffff",
    themeColor: "#ffffff",
  },

  /* Robots Configuration */
  robots: {
    allow: ["/"] as string[],
    disallow: ["/api/", "/admin/"] as string[],
  },
} as const;
