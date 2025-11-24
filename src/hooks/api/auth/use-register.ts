import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { registerUser } from "@/lib/api/auth";
import { handleApiError } from "@/utils/handle-api-error";

export const useRegister = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      setMessage(null);
      setErrorMessage(null);
    },
    onSuccess: (data) => {
      if (data?.data?.emailVerificationRequired) {
        setMessage(
          "Registration successful! Please check your email for verification link.",
        );
        setErrorMessage(null);
        return;
      }

      window.location.reload();
    },
    onError: (error: unknown) => {
      const message = handleApiError(
        error,
        "Registration failed. Please try again.",
      );
      setErrorMessage(message);
      setMessage(null);
    },
  });

  return { mutation, message, errorMessage };
};
