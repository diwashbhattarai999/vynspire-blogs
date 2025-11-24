import Link from "next/link";

import { routes } from "@/constants/routes";
import ForgotPasswordForm from "./_components/forgot-password-form";

/**
 * The `ForgotPasswordPage` component is the forgot password page component
 * @returns The forgot password page component
 */
export default function ForgotPasswordPage() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Forgot your password?</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Enter your email address below and we&apos;ll send you a link to reset
          your password.
        </p>
      </div>

      <ForgotPasswordForm />

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link className="text-primary hover:underline" href={routes.AUTH.LOGIN}>
          Sign in
        </Link>
        .
      </p>

      <p className="text-muted-foreground mx-auto mt-10 max-w-sm text-center text-xs">
        Lost in the sauce? Don’t worry — we’ve got your back.{" "}
        <Link className="text-primary hover:underline" href={routes.SUPPORT}>
          Reach out to our friendly support team
        </Link>{" "}
        and we’ll get things sorted in no time.
      </p>
    </>
  );
}
