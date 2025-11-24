"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/shared/form-input";
import { FormError, FormSuccess } from "@/components/shared/form-message";
import {
  FacebookAuthButton,
  GoogleAuthButton,
} from "@/components/shared/oauth-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/constants/routes";
import { useLogin } from "@/hooks/api/auth/use-login";
import { type LoginFormValues, loginSchema } from "@/schemas/auth";

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutation: { mutate: login, isPending },
    message,
    errorMessage,
  } = useLogin();

  const onSubmit = (data: LoginFormValues) => login(data);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            form={form}
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <FormInput
            withToggle
            form={form}
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="text-right">
            <Link
              className="text-muted-foreground hover:text-foreground text-sm"
              href={routes.AUTH.FORGOT_PASSWORD}
            >
              Forgot password?
            </Link>
          </div>

          {message && <FormSuccess message={message} />}
          {errorMessage && <FormError message={errorMessage} />}

          {/* Submit Button */}
          <Button
            className="w-full"
            isPending={isPending}
            pendingText="Signing in..."
            type="submit"
          >
            Sign in with credentials
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-6">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">or</span>
        <Separator className="flex-1" />
      </div>

      {/* Google Login Button */}
      <GoogleAuthButton />

      {/* Facebook Login Button */}
      <FacebookAuthButton />
    </div>
  );
}
