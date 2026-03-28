import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  SubscriptionResponse,
  CreateSubscriptionRequest,
  RenewSubscriptionRequest,
} from "../types/subscription.types";

// Get All Subscriptions with pagination
export async function getSubscriptions(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<SubscriptionResponse>> {
  const response = await axiosInstance.get("/Subscriptions", {
    params: { page, pageSize },
  });

  return response.data;
}

// Get Subscription By Id
export async function getSubscriptionById(
  id: number,
): Promise<ApiResponse<SubscriptionResponse>> {
  const response = await axiosInstance.get(`/Subscriptions/${id}`);

  return response.data;
}

// Get Current Subscription By Subscriber Id
export async function getCurrentSubscriptionBySubscriberId(
  subscriberId: number,
): Promise<ApiResponse<SubscriptionResponse>> {
  const response = await axiosInstance.get(
    `/Subscriptions/subscriber/${subscriberId}/current`,
  );

  return response.data;
}

// Get Expiring Subscription
export async function getExpiringSubscription(
  days: number = 7,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<SubscriptionResponse>> {
  const response = await axiosInstance.get("/Subscriptions/expiring", {
    params: { days, page, pageSize },
  });

  return response.data;
}

// Get Expired Subscription
export async function getExpiredSubscription(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<SubscriptionResponse>> {
  const response = await axiosInstance.get("/Subscriptions/expired", {
    params: { page, pageSize },
  });

  return response.data;
}

// Create Subscription
export async function createSubscription(
  data: CreateSubscriptionRequest,
): Promise<ApiResponse<SubscriptionResponse>> {
  const response = await axiosInstance.post("/Subscriptions", data);

  return response.data;
}

// Renew Subscription
export async function renewSubscription(
  data: RenewSubscriptionRequest,
): Promise<ApiResponse<SubscriptionResponse>> {
  const response = await axiosInstance.post("/Subscriptions/renew", data);

  return response.data;
}

// Cancel Subscription
export async function cancelSubscription(
  id: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Subscriptions/${id}/cancel`);

  return response.data;
}

// Restore Subscription
export async function restoreSubscription(
  id: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Subscriptions/${id}/restore`);

  return response.data;
}

// Get Deleted Subscription
export async function getDeletedSubscription(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<SubscriptionResponse>> {
  const response = await axiosInstance.get("/Subscriptions/deleted", {
    params: { page, pageSize },
  });

  return response.data;
}

// Permanent Delete Subscription
export async function permanentDeleteSubscription(
  id: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Subscriptions/${id}/permanent`);

  return response.data;
}
