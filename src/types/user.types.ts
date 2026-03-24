// User roles
import type { UserRole } from "./auth.types";

// User response - matches UserDto in Backend
export interface UserResponse {
  id: number;
  tenantId: number | null;
  tenantName: string | null;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}
// Create user request - matches CreateUserDto in Backend
export interface CreateUserRequest {
  tenantId?: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

// Update user request - matches UpdateUserDto in Backend
export interface UpdateUserRequest {
  username?: string;
  email?: string;
  isActive?: boolean;
}

// Reset password request - matches ResetPasswordDto in Backend
export interface ResetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

// Change password request - matches ChangePasswordDto in Backend
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Assign Role request - matches AssignRoleDto in Backend
export interface AssignRoleRequest {
  role: UserRole;
}
