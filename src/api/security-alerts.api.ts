import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "../types/api.types";
import type {
  SecurityAlertResponse,
  ReviewAlert,
  AlertStatus,
} from "../types/security-alert.types";

// ==== SuperAdmin Only ====

// Get Alerts
export async function getAlerts(
  status?: AlertStatus,
): Promise<ApiResponse<SecurityAlertResponse[]>> {
  const response = await axiosInstance.get("/security-alerts", {
    params: { status },
  });

  return response.data;
}

// Mark As Reviewed
export async function markAsReviewed(
  id: number,
  data?: ReviewAlert,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(
    `/security-alerts/${id}/review`,
    data,
  );

  return response.data;
}

// Mark As Resolved
export async function markAsResolved(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/security-alerts/${id}/resolve`);

  return response.data;
}

// Mark As Ignored
export async function markAsIgnored(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/security-alerts/${id}/ignore`);

  return response.data;
}

// Trigger Scan
export async function triggerScan(): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post("/security-alerts/scan");

  return response.data;
}
