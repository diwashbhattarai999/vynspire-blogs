"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRegister } from "@/hooks/api/auth/use-register";
import { type RegisterFormValues, registerSchema } from "@/schemas/auth";

export default function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutation: { mutate: register, isPending },
    message,
    errorMessage,
  } = useRegister();

  const onSubmit = (data: RegisterFormValues) => register(data);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              form={form}
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              type="text"
            />

            <FormInput
              form={form}
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              type="text"
            />
          </div>

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

          <FormInput
            withToggle
            form={form}
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
          />

          {message && <FormSuccess message={message} />}
          {errorMessage && <FormError message={errorMessage} />}

          {/* Submit Button */}
          <Button
            className="w-full"
            isPending={isPending}
            pendingText="Creating account..."
            type="submit"
          >
            Create account
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-6">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">or</span>
        <Separator className="flex-1" />
      </div>

      {/* Google Register Button */}
      <GoogleAuthButton />

      {/* Facebook Register Button */}
      <FacebookAuthButton />
    </div>
  );
}
