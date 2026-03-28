import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  TenantResponse,
  CreateTenantRequest,
  UpdateTenantRequest,
  TenantSubscriptionResponse,
  RenewTenantSubscriptionRequest,
  ConfirmTenantPaymentRequest,
  CurrentSubscribersCountResponse,
} from "../types/tenant.types";

// Register Tenant
export async function registerTenant(
  data: CreateTenantRequest,
): Promise<ApiResponse<TenantResponse>> {
  const response = await axiosInstance.post("/Tenants/register", data);

  return response.data;
}

// Get All Tenants
export async function getAllTenants(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<TenantResponse>> {
  const response = await axiosInstance.get("/Tenants", {
    params: { page, pageSize },
  });

  return response.data;
}

// Get Tenant By Id
export async function getTenantById(
  id: number,
): Promise<ApiResponse<TenantResponse>> {
  const response = await axiosInstance.get(`/Tenants/${id}`);

  return response.data;
}

// Update Tenant
export async function updateTenant(
  id: number,
  data: UpdateTenantRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.put(`/Tenants/${id}`, data);

  return response.data;
}

// Deactivate Tenant
export async function deactivateTenant(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Tenants/${id}/deactivate`);

  return response.data;
}

// Activate Tenant
export async function activateTenant(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Tenants/${id}/activate`);

  return response.data;
}

// Get Subscribers Count For Tenant
export async function getSubscribersCount(
  id: number,
): Promise<ApiResponse<CurrentSubscribersCountResponse>> {
  const response = await axiosInstance.get(`/Tenants/${id}/subscribers-count`);

  return response.data;
}

// Renew Tenant
export async function renewTenant(
  id: number,
  data: RenewTenantSubscriptionRequest,
): Promise<ApiResponse<TenantSubscriptionResponse>> {
  const response = await axiosInstance.post(
    `/Tenants/${id}/renew-request`,
    data,
  );

  return response.data;
}

// Confirm Payment For SuperAdmin Only
export async function confirmPayment(
  id: number,
  data: ConfirmTenantPaymentRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(
    `/Tenants/${id}/confirm-payment`,
    data,
  );

  return response.data;
}

// Get Pending Renewals For SuperAdmin Only
export async function getPendingRenewals(): Promise<
  ApiResponse<TenantSubscriptionResponse[]>
> {
  const response = await axiosInstance.get("/Tenants/pending-renewals");

  return response.data;
}
