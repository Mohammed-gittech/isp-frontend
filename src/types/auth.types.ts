// User roles matching Backend roles
export type UserRole = "SuperAdmin" | "TenantAdmin" | "Employee";

// Login request body - matches LoginRequestDto in Backend
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response - matches LoginResponseDto in Backend
// Backend returns user info + tokens together
export interface LoginResponse {
  token: string;
  refreshToken: string;
  accessTokenExpiresAt: string; // DateTime comes as string in JSON
  userId: number;
  username: string;
  email: string;
  role: UserRole;
  tenantId: number | null; // int? in Backend = number | null
  tenantName: string | null; // string? in Backend = string | null
}

// Refresh token request - matches RefreshTokenRequestDto in Backend
export interface RefreshTokenRequest {
  refreshToken: string;
}

// User info stored in Redux after login
export interface AuthUser {
  id: number;
  tenantId: number | null;
  username: string;
  email: string;
  role: UserRole;
  tenantName: string | null;
}
