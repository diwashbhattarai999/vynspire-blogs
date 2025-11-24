"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { routes } from "@/constants/routes";
import { useAuth } from "@/contexts/auth-context";
import { Spinner } from "../ui/spinner";

interface AuthRedirectProps {
  children: React.ReactNode;
}

/**
 * AuthRedirect component - redirects authenticated users away from auth pages
 */
export function AuthRedirect({ children }: AuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(routes.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-primary size-5" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
