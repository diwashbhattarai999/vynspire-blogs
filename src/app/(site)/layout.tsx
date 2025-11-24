import { AuthRedirect } from "@/components/guards/auth-redirect";

/**
 * The `SiteLayout` component is the layout component for the site
 * @param children - The children components to be rendered
 * @returns The site layout component
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthRedirect>
      <main>{children}</main>
    </AuthRedirect>
  );
}
