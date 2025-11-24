import type { User } from "./user";

export type LoginResponse = {
  user: User;
  emailVerificationRequired: boolean;
};
