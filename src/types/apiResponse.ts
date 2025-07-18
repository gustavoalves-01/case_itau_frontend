export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  code?: string;
  details?: { 
    field: string;
    message: string;
    value?: unknown;
  }[];
  timestamp: Date;
}