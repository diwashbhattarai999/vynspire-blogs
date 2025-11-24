import Link from "next/link";

import { routes } from "@/constants/routes";
import RegisterForm from "./_components/register-form";

/**
 * The `RegisterPage` component is the register page component
 * @returns The register page component
 */
export default function RegisterPage() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Create an account</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Already have an account?{" "}
          <Link
            className="text-primary hover:underline"
            href={routes.AUTH.LOGIN}
          >
            Sign in
          </Link>
          .
        </p>
      </div>

      <RegisterForm />

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
