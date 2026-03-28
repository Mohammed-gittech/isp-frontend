import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  SubscriberResponse,
  CreateSubscriberRequest,
  UpdateSubscriberRequest,
  LinkTelegramRequest,
} from "../types/subscriber.types";

// Get all subscribers with pagination
export async function getSubscribers(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<SubscriberResponse>> {
  const response = await axiosInstance.get("/Subscribers", {
    params: { page, pageSize },
  });

  return response.data;
}

// Get subscriber by id
export async function getSubscriberById(
  id: number,
): Promise<ApiResponse<SubscriberResponse>> {
  const response = await axiosInstance.get(`/Subscribers/${id}`);

  return response.data;
}

// Search subscribers
export async function searchSubscribers(
  q: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<SubscriberResponse>> {
  const response = await axiosInstance.get("/Subscribers/search", {
    params: { q, page, pageSize },
  });

  return response.data;
}

// Create subscriber
export async function createSubscriber(
  data: CreateSubscriberRequest,
): Promise<ApiResponse<SubscriberResponse>> {
  const response = await axiosInstance.post("/Subscribers", data);

  return response.data;
}

// Update subscriber
export async function updateSubscriber(
  id: number,
  data: UpdateSubscriberRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.put(`/Subscribers/${id}`, data);

  return response.data;
}

// Delete subscriber (soft delete)
export async function deleteSubscriber(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Subscribers/${id}`);

  return response.data;
}

// Get deleted subscribers
export async function getDeletedSubscribers(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<SubscriberResponse>> {
  const response = await axiosInstance.get("/Subscribers/deleted", {
    params: { page, pageSize },
  });

  return response.data;
}

// Restore deleted subscriber
export async function restoreSubscriber(
  id: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Subscribers/${id}/restore`);

  return response.data;
}

// Permanent delete subscriber
export async function permanentDeleteSubscriber(
  id: number,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Subscribers/${id}/permanent`);

  return response.data;
}

// Link Telegram to subscriber
export async function linkTelegram(
  id: number,
  data: LinkTelegramRequest,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(
    `/Subscribers/${id}/link-telegram`,
    data,
  );

  return response.data;
}
