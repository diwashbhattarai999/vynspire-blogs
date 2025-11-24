/**
 * Mock storage utility for authentication
 * Uses localStorage to simulate a backend database
 */

import type { User } from "@/types/api/user";

const STORAGE_KEYS = {
  USERS: "mock_users",
  SESSIONS: "mock_sessions",
  RESET_TOKENS: "mock_reset_tokens",
} as const;

export interface StoredUser extends User {
  password: string;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: number;
}

export interface ResetToken {
  email: string;
  token: string;
  expiresAt: number;
}

/**
 * Get all users from localStorage
 */
export function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
  return usersJson ? JSON.parse(usersJson) : [];
}

/**
 * Save users to localStorage
 */
export function saveUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

/**
 * Find user by email
 */
export function findUserByEmail(email: string): StoredUser | undefined {
  const users = getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Find user by ID
 */
export function findUserById(id: string): StoredUser | undefined {
  const users = getUsers();
  return users.find((user) => user.id === id);
}

/**
 * Create a new user
 */
export function createUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): StoredUser {
  const users = getUsers();
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email.toLowerCase(),
    password: userData.password, // In production, hash this
    isEmailVerified: true,
    lastEmailSentAt: null,
    isActive: true,
    profilePictureUrl: null,
    role: "USER",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

/**
 * Update user password
 */
export function updateUserPassword(
  email: string,
  newPassword: string,
): boolean {
  const users = getUsers();
  const userIndex = users.findIndex(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (userIndex === -1) return false;

  users[userIndex].password = newPassword; // In production, hash this
  users[userIndex].updatedAt = new Date().toISOString();
  saveUsers(users);
  return true;
}

/**
 * Verify user email (for mock system - auto-verify)
 */
export function verifyUserEmail(email: string): boolean {
  const users = getUsers();
  const userIndex = users.findIndex(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (userIndex === -1) return false;

  users[userIndex].isEmailVerified = true;
  users[userIndex].updatedAt = new Date().toISOString();
  saveUsers(users);
  return true;
}

/**
 * Get current session
 */
export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const sessionJson = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  if (!sessionJson) return null;

  const session: Session = JSON.parse(sessionJson);
  if (session.expiresAt < Date.now()) {
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    return null;
  }

  return session;
}

/**
 * Save session
 */
export function saveSession(session: Session): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(session));
}

/**
 * Clear session
 */
export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
}

/**
 * Get reset token
 */
export function getResetToken(token: string): ResetToken | null {
  if (typeof window === "undefined") return null;
  const tokensJson = localStorage.getItem(STORAGE_KEYS.RESET_TOKENS);
  if (!tokensJson) return null;

  const tokens: ResetToken[] = JSON.parse(tokensJson);
  const resetToken = tokens.find((t) => t.token === token);

  if (!resetToken || resetToken.expiresAt < Date.now()) {
    // Remove expired tokens
    const validTokens = tokens.filter((t) => t.expiresAt >= Date.now());
    localStorage.setItem(
      STORAGE_KEYS.RESET_TOKENS,
      JSON.stringify(validTokens),
    );
    return null;
  }

  return resetToken;
}

/**
 * Create reset token
 */
export function createResetToken(email: string): string {
  if (typeof window === "undefined") return "";
  const token = crypto.randomUUID();
  const tokensJson = localStorage.getItem(STORAGE_KEYS.RESET_TOKENS);
  const tokens: ResetToken[] = tokensJson ? JSON.parse(tokensJson) : [];

  // Remove existing tokens for this email
  const filteredTokens = tokens.filter((t) => t.email !== email);

  const resetToken: ResetToken = {
    email: email.toLowerCase(),
    token,
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
  };

  filteredTokens.push(resetToken);
  localStorage.setItem(
    STORAGE_KEYS.RESET_TOKENS,
    JSON.stringify(filteredTokens),
  );
  return token;
}

/**
 * Remove reset token
 */
export function removeResetToken(token: string): void {
  if (typeof window === "undefined") return;
  const tokensJson = localStorage.getItem(STORAGE_KEYS.RESET_TOKENS);
  if (!tokensJson) return;

  const tokens: ResetToken[] = JSON.parse(tokensJson);
  const filteredTokens = tokens.filter((t) => t.token !== token);
  localStorage.setItem(
    STORAGE_KEYS.RESET_TOKENS,
    JSON.stringify(filteredTokens),
  );
}
