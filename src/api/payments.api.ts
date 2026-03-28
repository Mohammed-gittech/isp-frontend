import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  PaymentResponse,
  PaymentListResponse,
  CreateCashPaymentRequest,
  CreatePaymentResponse,
  RefundPaymentRequest,
  PaymentStatsResponse,
  PaymentStatus,
  PaymentMethod,
} from "../types/payment.types";

// Create Cash Payment
export async function createCashPayment(
  data: CreateCashPaymentRequest,
): Promise<ApiResponse<CreatePaymentResponse>> {
  const response = await axiosInstance.post("/Payments/cash", data);

  return response.data;
}

// Get Payment By Id
export async function getPaymentById(
  id: number,
): Promise<ApiResponse<PaymentResponse>> {
  const response = await axiosInstance.get(`/Payments/${id}`);

  return response.data;
}

// Get Subscriber Payments
export async function getSubscriberPayments(
  subscriberId: number,
): Promise<ApiResponse<PaymentResponse[]>> {
  const response = await axiosInstance.get(
    `/Payments/subscriber/${subscriberId}`,
  );

  return response.data;
}

// Get Payments
export async function getPayments(
  page: number = 1,
  pageSize: number = 10,
  status?: PaymentStatus,
  paymentMethod?: PaymentMethod,
): Promise<PaginatedResponse<PaymentListResponse>> {
  const response = await axiosInstance.get("/Payments", {
    params: { page, pageSize, status, paymentMethod },
  });

  return response.data;
}

// Get Payment Stats
export async function getPaymentStats(
  fromDate?: string,
  toDate?: string,
): Promise<ApiResponse<PaymentStatsResponse>> {
  const response = await axiosInstance.get("/Payments/stats", {
    params: { fromDate, toDate },
  });

  return response.data;
}

// Refund Payment
export async function refundPayment(
  id: number,
  data: RefundPaymentRequest,
): Promise<ApiResponse<PaymentResponse>> {
  const response = await axiosInstance.post(`/Payments/${id}/refund`, data);

  return response.data;
}
