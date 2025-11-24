/* eslint-disable no-console */
// ============================================================
// API Client with Axios Interceptors
// - Handles request authentication, error handling, and retries
// ============================================================

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { env } from '@/env/client';
import type { ApiResponse } from '@/types/api-response';

import queryClient from './query-client';

/**
 * Function to create an Axios instance for a specific API.
 * @param {string} baseUrl - The base URL of the API.
 * @param {string} apiKey - The API key for authentication.
 * @returns {AxiosInstance} - Configured Axios instance.
 */
const createApiClient = (baseUrl: string, apiKey?: string): AxiosInstance => {
  const apiClient: AxiosInstance = axios.create({
    baseURL: `${baseUrl}/api/v0`, // Base URL for the API
    timeout: 10000, // 10 seconds timeout
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  // Request Interceptor
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (apiKey) config.headers.set('x-api-key', apiKey);

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response Interceptor
  apiClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => response,
    async error => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized errors
      if (
        error.response?.status === 401 &&
        error.response?.data?.error?.code === 'AUTH_TOKEN_NOT_FOUND' &&
        !originalRequest._retry
      ) {
        try {
          // Attempt to refresh the token
          await apiClient.get('/auth/refresh');

          // Retry the original request
          if (originalRequest)
            return await apiClient(originalRequest as InternalAxiosRequestConfig);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);

          // Clear the query cache if token refresh fails
          queryClient.clear();
        }
      }

      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
  );

  return apiClient;
};

// Create Axios instances for each API
export const api = createApiClient(env.NEXT_PUBLIC_API_URL);
