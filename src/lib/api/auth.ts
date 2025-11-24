import type { LoginFormValues } from "@/schemas/auth";
import type { LoginResponse } from "@/types/api/auth";
import type { ApiSuccessResponse } from "@/types/api-response";

import { api } from "../api-client";

export const loginUser = async (
  data: LoginFormValues,
): Promise<ApiSuccessResponse<LoginResponse>> => {
  const response = await api.post(`/auth/login`, data);
  return response.data;
};
