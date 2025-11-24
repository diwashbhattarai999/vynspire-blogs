import { isAxiosError } from "axios";

/**
 * Handles API errors with a fallback message.
 *
 * @param error The error thrown in the API call
 * @param fallbackMessage Optional fallback message
 */
export function handleApiError(
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
) {
  const message: string =
    isAxiosError(error) && typeof error.response?.data?.message === "string"
      ? error.response.data.message
      : (error as Error).message || fallbackMessage;

  return message;
}
