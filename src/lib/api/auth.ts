import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues,
} from "@/schemas/auth";
import type {
  ForgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
} from "@/types/api/auth";

import type { ApiSuccessResponse } from "@/types/api-response";

import {
  clearSession,
  createResetToken,
  createUser,
  findUserByEmail,
  getResetToken,
  getSession,
  removeResetToken,
  saveSession,
  updateUserPassword,
  verifyUserEmail,
} from "../mock-storage";

/**
 * Delay utility to simulate API latency
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock API: Login user
 */
export async function loginUser(
  data: LoginFormValues,
): Promise<ApiSuccessResponse<LoginResponse>> {
  await delay(1000); // Simulate 1 second API delay

  const user = findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.password !== data.password) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("Account is deactivated");
  }

  // Auto-verify email for mock users (since it's localStorage-based)
  if (!user.isEmailVerified) {
    verifyUserEmail(user.email);
    user.isEmailVerified = true;
  }

  // Create session
  const sessionToken = crypto.randomUUID();
  saveSession({
    userId: user.id,
    token: sessionToken,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;

  return {
    success: true,
    message: "Login successful",
    status: 200,
    data: {
      user: userWithoutPassword,
      emailVerificationRequired: false,
    },
  };
}

/**
 * Mock API: Register user
 */
export async function registerUser(
  data: RegisterFormValues,
): Promise<ApiSuccessResponse<RegisterResponse>> {
  await delay(1000); // Simulate 1 second API delay

  // Check if user already exists
  const existingUser = findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Create new user
  const newUser = createUser({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });

  // Create session
  const sessionToken = crypto.randomUUID();
  saveSession({
    userId: newUser.id,
    token: sessionToken,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;

  return {
    success: true,
    message: "Registration successful",
    status: 200,
    data: {
      user: userWithoutPassword,
      emailVerificationRequired: false,
    },
  };
}

/**
 * Mock API: Forgot password
 */
export async function forgotPassword(
  data: ForgotPasswordFormValues,
): Promise<ApiSuccessResponse<ForgotPasswordResponse>> {
  await delay(1000); // Simulate 1 second API delay

  const user = findUserByEmail(data.email);

  // Create reset token (even if user doesn't exist for security)
  const token = createResetToken(data.email);

  if (!user) {
    // Don't reveal if user exists for security
    return {
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
      status: 200,
      data: null,
    };
  }

  console.log(
    `[MOCK] Password reset token for ${data.email}: ${token}\nYou can use this token in the reset password page.`,
  );

  return {
    success: true,
    message:
      "If an account exists with this email, a password reset link has been sent.",
    status: 200,
    data: null,
  };
}

/**
 * Mock API: Reset password
 */
export async function resetPassword(
  data: ResetPasswordFormValues & { token: string },
): Promise<ApiSuccessResponse<null>> {
  await delay(1000); // Simulate 1 second API delay

  // Validate token
  const resetToken = getResetToken(data.token);
  if (!resetToken) {
    throw new Error("Invalid or expired reset token");
  }

  // Find user
  const user = findUserByEmail(resetToken.email);
  if (!user) {
    throw new Error("User not found");
  }

  // Update password
  const updated = updateUserPassword(resetToken.email, data.password);
  if (!updated) {
    throw new Error("Failed to update password");
  }

  // Remove used token
  removeResetToken(data.token);

  return {
    success: true,
    message: "Password has been reset successfully. You can now login.",
    status: 200,
    data: null,
  };
}

/**
 * Get current user from session
 */
export function getCurrentUser() {
  const session = getSession();
  if (!session) {
    return null;
  }

  // Import here to avoid circular dependency
  const { findUserById } = require("../mock-storage");
  const user = findUserById(session.userId);
  if (!user) {
    clearSession();
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Logout function
 */
export function logout() {
  clearSession();
  return { success: true };
}
