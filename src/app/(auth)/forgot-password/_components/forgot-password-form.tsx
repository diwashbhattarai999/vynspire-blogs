"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/shared/form-input";
import { FormError, FormSuccess } from "@/components/shared/form-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForgotPassword } from "@/hooks/api/auth/use-forgot-password";
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/schemas/auth";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutation: { mutate: forgotPassword, isPending },
    message,
    errorMessage,
  } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormValues) => forgotPassword(data);

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

          {message && <FormSuccess message={message} />}
          {errorMessage && <FormError message={errorMessage} />}

          <Button
            className="w-full"
            isPending={isPending}
            pendingText="Sending instructions..."
            type="submit"
          >
            Send reset instructions
          </Button>
        </form>
      </Form>
    </div>
  );
}
