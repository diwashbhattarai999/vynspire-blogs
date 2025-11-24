import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * The `metadata` object is used to provide metadata to the client
 * @returns The metadata object
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: siteConfig.seo.title,
  description: siteConfig.site.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.company.name }],
  creator: siteConfig.company.name,
  publisher: siteConfig.company.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.site.locale,
    url: "/",
    siteName: siteConfig.site.name,
    title: siteConfig.site.name,
    description: siteConfig.site.description,
    images: [
      {
        url: siteConfig.assets.logo.url,
        width: siteConfig.assets.logo.width,
        height: siteConfig.assets.logo.height,
        alt: siteConfig.assets.logo.alt,
      },
    ],
  },
  twitter: {
    card: siteConfig.social.twitter.cardType,
    title: siteConfig.site.name,
    description: siteConfig.site.description,
    images: [siteConfig.assets.logo.url],
    creator: siteConfig.social.twitter.handle,
  },
  icons: {
    icon: [
      { url: siteConfig.assets.icons.favicon },
      { url: siteConfig.assets.icons.svg, type: "image/svg+xml" },
    ],
    apple: [{ url: siteConfig.assets.icons.apple }],
  },
  alternates: {
    canonical: "/",
  },
  category: siteConfig.site.category,
};

/**
 * The `RootLayout` component is the root layout component for the application
 * @param children - The children components to be rendered
 * @returns The root layout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
