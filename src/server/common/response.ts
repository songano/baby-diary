import { ApiError, ApiResponse, ResponseMeta } from '../types/api-response';

export function successResponse<T>(data: T, meta?: Partial<ResponseMeta>): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
}

export function errorResponse(code: string, message: string, details?: Record<string, unknown>) {
  const error: ApiError = { code, message };

  if (details) error.details = details;
  if (process.env.NODE_ENV === 'development' && details?.stack) {
    error.stack = details.stack as string;
  }

  return {
    success: false,
    error,
    meta: { timestamp: new Date().toISOString() },
  };
}
