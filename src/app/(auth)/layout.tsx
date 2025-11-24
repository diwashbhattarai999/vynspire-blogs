import { AuthRedirect } from "@/components/guards/auth-redirect";
import { BackgroundGlow } from "@/components/shared/background-glow";
import { GoBack } from "@/components/shared/go-back";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

/**
 * The `AuthLayout` component is a layout component that wraps all of the pages
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthRedirect>
      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <header className="container mx-auto flex items-center justify-between p-4">
          <GoBack label="Back to Vynspire Blog" />
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <Logo />
              </div>

              <div className="space-y-8">{children}</div>
            </div>
          </div>
        </main>

        <BackgroundGlow />
      </div>
    </AuthRedirect>
  );
}
