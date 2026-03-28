import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  AuditLogResponse,
  AuditLogFilter,
  EntityType,
  StatisticsResponse,
} from "../types/audit-log.types";

// Get All Audit Logs SuperAdmin Only
export async function getAllAuditLogs(
  data: AuditLogFilter,
): Promise<PaginatedResponse<AuditLogResponse>> {
  const response = await axiosInstance.get("/AuditLogs", {
    params: data,
  });

  return response.data;
}

// Get Audit Log By Id
export async function getAuditLogById(
  id: number,
): Promise<ApiResponse<AuditLogResponse>> {
  const response = await axiosInstance.get(`/AuditLogs/${id}`);

  return response.data;
}

// Get Audit Log By Tenant Id
export async function getAuditLogByTenantId(
  tenantId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<AuditLogResponse>> {
  const response = await axiosInstance.get(`/AuditLogs/tenant/${tenantId}`, {
    params: { page, pageSize },
  });

  return response.data;
}

// Get Audit Log By User Id
export async function getAuditLogByUserId(
  userId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<AuditLogResponse>> {
  const response = await axiosInstance.get(`/AuditLogs/user/${userId}`, {
    params: { page, pageSize },
  });

  return response.data;
}

// Get Audit Log By Entity
export async function getAuditLogByEntity(
  entityType: EntityType,
  entityId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<AuditLogResponse>> {
  const response = await axiosInstance.get(
    `/AuditLogs/entity/${entityType}/${entityId}`,
    {
      params: { page, pageSize },
    },
  );

  return response.data;
}

// Search Audit Log
export async function searchAuditLog(
  data: AuditLogFilter,
): Promise<PaginatedResponse<AuditLogResponse>> {
  const response = await axiosInstance.post("AuditLogs/search", data);

  return response.data;
}

// Get Audit My Logs
export async function getMyAuditLogs(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<AuditLogResponse>> {
  const response = await axiosInstance.get("/AuditLogs/my-logs", {
    params: { page, pageSize },
  });

  return response.data;
}

// Cleanup Old Logs Most Be > 30 Days For SuperAdmin Only
export async function cleanupOldAuditLogs(
  olderThanDays: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(
    `/AuditLogs/cleanup/${olderThanDays}`,
  );

  return response.data;
}

// Get Statistics
export async function getAuditLogStatistics(
  tenantId?: number,
): Promise<ApiResponse<StatisticsResponse>> {
  const response = await axiosInstance.get("/AuditLogs/statistics", {
    params: { tenantId },
  });

  return response.data;
}
