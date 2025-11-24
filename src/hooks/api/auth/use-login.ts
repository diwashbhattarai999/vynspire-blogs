import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { loginUser } from "@/lib/api/auth";
import { handleApiError } from "@/utils/handle-api-error";

export const useLogin = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      setMessage(null);
      setErrorMessage(null);
    },
    onSuccess: (data) => {
      if (data?.data?.emailVerificationRequired) {
        setMessage(
          "Email verification required. Please check your inbox for the verification link.",
        );
        setErrorMessage(null);
        return;
      }

      window.location.reload();
    },
    onError: (error: unknown) => {
      const message = handleApiError(error, "Login failed. Please try again.");
      setErrorMessage(message);
      setMessage(null);
    },
  });

  return { mutation, message, errorMessage };
};
