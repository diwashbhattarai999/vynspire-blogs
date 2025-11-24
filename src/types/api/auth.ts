import type { User } from "./user";

export type LoginResponse = {
  user: User;
  emailVerificationRequired: boolean;
};

export type RegisterResponse = {
  user: User;
  emailVerificationRequired: boolean;
};

export type ForgotPasswordResponse = null;
