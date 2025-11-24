import type { LoginFormValues, RegisterFormValues } from "@/schemas/auth";
import type { LoginResponse, RegisterResponse } from "@/types/api/auth";

import type { ApiSuccessResponse } from "@/types/api-response";

import { api } from "../api-client";

export const loginUser = async (
  data: LoginFormValues,
): Promise<ApiSuccessResponse<LoginResponse>> => {
  const response = await api.post(`/auth/login`, data);
  return response.data;
};

export const registerUser = async (
  data: RegisterFormValues,
): Promise<ApiSuccessResponse<RegisterResponse>> => {
  const response = await api.post(`/auth/register`, data);
  return response.data;
};
