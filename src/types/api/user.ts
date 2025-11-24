export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  lastEmailSentAt: null;
  isActive: boolean;
  profilePictureUrl: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};
