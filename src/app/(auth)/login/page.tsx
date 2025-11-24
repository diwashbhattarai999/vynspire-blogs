import Link from "next/link";

import { routes } from "@/constants/routes";
import LoginForm from "./_components/login-form";

/**
 * The `LoginPage` component is the login page component
 * @returns The login page component
 */
export default function LoginPage() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary hover:underline"
            href={routes.AUTH.REGISTER}
          >
            Sign up for free
          </Link>
          .
        </p>
      </div>

      <LoginForm />

      {/* Footer */}
      <div className="text-muted-foreground mx-auto mt-10 max-w-sm text-center text-xs">
        By signing up or logging in, you agree to our{" "}
        <Link
          className="text-secondary-foreground hover:text-foreground"
          href="#"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="text-secondary-foreground hover:text-foreground"
          href="#"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </>
  );
}
