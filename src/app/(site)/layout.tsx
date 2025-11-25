import { AuthRedirect } from "@/components/guards/auth-redirect";
import { Footer } from "@/components/layouts/footer";
import { SiteNavbar } from "@/components/layouts/header/site-navbar";

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
      <div className="flex min-h-screen flex-col">
        <SiteNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthRedirect>
  );
}
