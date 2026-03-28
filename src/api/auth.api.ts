import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "../types/api.types";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
} from "../types/auth.types";

// Login user
export async function login(
  data: LoginRequest,
): Promise<ApiResponse<LoginResponse>> {
  const response = await axiosInstance.post("/Auth/login", data);
  return response.data;
}

// Refresh access token
export async function refreshToken(
  data: RefreshTokenRequest,
): Promise<ApiResponse<LoginResponse>> {
  const response = await axiosInstance.post("/Auth/refresh", data);
  return response.data;
}

// Revoke refresh token (logout from Backend)
export async function revokeToken(
  data: RefreshTokenRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post("/Auth/revoke", data);
  return response.data;
}
