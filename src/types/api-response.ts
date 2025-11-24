// Type for API Error Response
export type ApiErrorResponse = {
  success: false;
  status: number;
  message: string;
  error: {
    errorId: string;
    name: string;
    code?: string;
    ip?: string;
    url?: string;
    method?: string;
    timestamp: string;
    stack?: string; // Only included in development
  };
};

// Type for API Success Response
export type ApiSuccessResponse<T = unknown> = {
  success: true;
  status: number;
  message: string;
  data: T | null;
};

// Union Type for API Response
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
