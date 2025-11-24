import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { routes } from "@/constants/routes";
import { useAuth } from "@/contexts/auth-context";
import { loginUser } from "@/lib/api/auth";
import { handleApiError } from "@/utils/handle-api-error";

export const useLogin = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();

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

      // Save user to auth context and localStorage
      if (data?.data?.user) {
        login(data.data.user);
        router.push(routes.DASHBOARD);
      }
    },
    onError: (error: unknown) => {
      const message = handleApiError(error, "Login failed. Please try again.");
      setErrorMessage(message);
      setMessage(null);
    },
  });

  return { mutation, message, errorMessage };
};
