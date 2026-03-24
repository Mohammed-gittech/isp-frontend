// Standard API response wrapper for all Backend endpoints
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// Paginated response for list endpoints
export interface PaginatedData<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// Combines both wrappers for paginated endpoints
export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>;
