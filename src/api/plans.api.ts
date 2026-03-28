import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  PlanResponse,
  CreatePlanRequest,
  UpdatePlanRequest,
} from "../types/plan.types";

// Get all plans with pagination
export async function getPlans(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<PlanResponse>> {
  const response = await axiosInstance.get("/Plans", {
    params: { page, pageSize },
  });

  return response.data;
}

// Get active plans
export async function getActivePlans(): Promise<ApiResponse<PlanResponse[]>> {
  const response = await axiosInstance.get("/Plans/active");

  return response.data;
}

// Get plan by id
export async function getPlanById(
  id: number,
): Promise<ApiResponse<PlanResponse>> {
  const response = await axiosInstance.get(`/Plans/${id}`);

  return response.data;
}

// Create Plan
export async function createPlan(
  data: CreatePlanRequest,
): Promise<ApiResponse<PlanResponse>> {
  const response = await axiosInstance.post("/Plans", data);

  return response.data;
}

// Update plan
export async function updatePlan(
  id: number,
  data: UpdatePlanRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.put(`/Plans/${id}`, data);

  return response.data;
}

// Delete plan
export async function deletePlan(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Plans/${id}`);

  return response.data;
}

// Restore plan
export async function restorePlan(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Plans/${id}/restore`);

  return response.data;
}

// Get Deleted plans
export async function getDeletedPlans(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<PlanResponse>> {
  const response = await axiosInstance.get("/Plans/deleted", {
    params: { page, pageSize },
  });

  return response.data;
}

// Permanent Delete plan
export async function permanentDeletePlan(
  id: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Plans/${id}/permanent`);

  return response.data;
}

// Deactivate plan
export async function deactivatePlan(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Plans/${id}/deactivate`);

  return response.data;
}

// Activate plan
export async function activatePlan(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Plans/${id}/activate`);

  return response.data;
}
