import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  AssignRoleRequest,
} from "../types/user.types";

// Get All Users Active
export async function getAllUsers(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
): Promise<PaginatedResponse<UserResponse>> {
  const response = await axiosInstance.get("/Users", {
    params: { page, pageSize, search },
  });

  return response.data;
}

// Get User By Id
export async function getUserById(
  id: number,
): Promise<ApiResponse<UserResponse>> {
  const response = await axiosInstance.get(`/Users/${id}`);

  return response.data;
}

// Get User By Tenant
export async function getUserByTenantId(
  tenantId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<UserResponse>> {
  const response = await axiosInstance.get(`/Users/tenant/${tenantId}`, {
    params: { page, pageSize },
  });

  return response.data;
}

// Create User
export async function createUser(
  data: CreateUserRequest,
): Promise<ApiResponse<UserResponse>> {
  const response = await axiosInstance.post("/Users", data);

  return response.data;
}

// Update User
export async function updateUser(
  id: number,
  data: UpdateUserRequest,
): Promise<ApiResponse<UserResponse>> {
  const response = await axiosInstance.put(`/Users/${id}`, data);

  return response.data;
}

// Soft Delete
export async function deleteUser(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Users/${id}`);

  return response.data;
}

// Get Deleted Users
export async function getDeletedUsers(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<UserResponse>> {
  const response = await axiosInstance.get("/Users/deleted", {
    params: { page, pageSize },
  });

  return response.data;
}

// Restore User
export async function restoreUser(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Users/${id}/restore`);

  return response.data;
}

// Permanent Delete
export async function permanentDeleteUser(
  id: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Users/${id}/permanent`);

  return response.data;
}

// Change User Password
export async function changeUserPassword(
  data: ChangePasswordRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post("/Users/change-password", data);

  return response.data;
}

// Reset User Password
export async function resetUserPassword(
  id: number,
  data: ResetPasswordRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(
    `/Users/${id}/reset-password`,
    data,
  );

  return response.data;
}

// Assign User Role
export async function assignUserRole(
  id: number,
  data: AssignRoleRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Users/${id}/assign-role`, data);

  return response.data;
}
