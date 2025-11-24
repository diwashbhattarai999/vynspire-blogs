import { ProtectedRoute } from "@/components/guards/protected-route";

/**
 * The `ProtectedLayout` component is the layout component for the protected pages
 * @param children - The children components to be rendered
 * @returns The protected layout component
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <main>{children}</main>
    </ProtectedRoute>
  );
}
