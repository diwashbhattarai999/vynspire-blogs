import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { forgotPassword } from "@/lib/api/auth";
import { handleApiError } from "@/utils/handle-api-error";

export const useForgotPassword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onMutate: () => {
      setMessage(null);
      setErrorMessage(null);
    },
    onSuccess: (data) => {
      setMessage(
        data?.message ||
          "Password reset link has been sent to your email. Please check your inbox.",
      );
      setErrorMessage(null);
    },
    onError: (error: unknown) => {
      const message = handleApiError(
        error,
        "Failed to send password reset email. Please try again.",
      );
      setErrorMessage(message);
      setMessage(null);
    },
  });

  return { mutation, message, errorMessage };
};
