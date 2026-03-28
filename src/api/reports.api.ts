import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "../types/api.types";
import type {
  RevenueReportResponse,
  GrowthReportResponse,
  PlanPopularityReportResponse,
  ExpiringSoonReportResponse,
  DashboardSummaryReportResponse,
} from "../types/report.types";

// Get Revenue Report
export async function getRevenueReport(
  startDate?: string,
  endDate?: string,
): Promise<ApiResponse<RevenueReportResponse>> {
  const response = await axiosInstance.get("/Reports/revenue", {
    params: { startDate, endDate },
  });

  return response.data;
}

// Get Growth Report
export async function getGrowthReport(
  startDate?: string,
  endDate?: string,
): Promise<ApiResponse<GrowthReportResponse>> {
  const response = await axiosInstance.get("/Reports/growth", {
    params: { startDate, endDate },
  });

  return response.data;
}

// Get Plan Popularity
export async function getPlanPopularity(
  startDate?: string,
  endDate?: string,
  top?: number,
): Promise<ApiResponse<PlanPopularityReportResponse>> {
  const response = await axiosInstance.get("/Reports/plan-popularity", {
    params: { startDate, endDate, top },
  });

  return response.data;
}

// Get Expiring Soon
export async function getExpiringSoon(
  days?: number,
): Promise<ApiResponse<ExpiringSoonReportResponse>> {
  const response = await axiosInstance.get("/Reports/expiring-soon", {
    params: { days },
  });

  return response.data;
}

// Get Dashboard
export async function getDashboard(): Promise<
  ApiResponse<DashboardSummaryReportResponse>
> {
  const response = await axiosInstance.get("/Reports/dashboard");

  return response.data;
}
