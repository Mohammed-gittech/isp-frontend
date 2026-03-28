import axiosInstance from "./axiosInstance";
import type { ApiResponse, PaginatedResponse } from "../types/api.types";
import type {
  InvoiceResponse,
  InvoiceListResponse,
  InvoicePrintResponse,
  InvoiceStatus,
} from "../types/invoice.types";

// Get Invoice By ID
export async function getInvoiceById(
  id: number,
): Promise<ApiResponse<InvoiceResponse>> {
  const response = await axiosInstance.get(`/Invoices/${id}`);

  return response.data;
}

// Get Invoice By Number
export async function getInvoiceByNumber(
  number: string,
): Promise<ApiResponse<InvoiceResponse>> {
  const response = await axiosInstance.get(`/Invoices/number/${number}`);

  return response.data;
}

// Get Subscriber Invoices
export async function getSubscriberInvoices(
  subscriberId: number,
): Promise<ApiResponse<InvoiceResponse[]>> {
  const response = await axiosInstance.get(
    `/Invoices/subscriber/${subscriberId}`,
  );

  return response.data;
}

// Get Invoices
export async function getInvoices(
  page: number = 1,
  pageSize: number = 10,
  status?: InvoiceStatus,
): Promise<PaginatedResponse<InvoiceListResponse>> {
  const response = await axiosInstance.get("/Invoices", {
    params: { page, pageSize, status },
  });

  return response.data;
}

// Get Invoice Pdf
export async function getInvoicePdf(id: number): Promise<Blob> {
  const response = await axiosInstance.get(`/Invoices/${id}/pdf`, {
    responseType: "blob",
  });

  return response.data;
}

// Get Invoice Print Data
export async function getInvoicePrintData(
  id: number,
): Promise<ApiResponse<InvoicePrintResponse>> {
  const response = await axiosInstance.get(`/Invoices/${id}/print-data`);

  return response.data;
}

// Record Print
export async function recordPrint(id: number): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post(`/Invoices/${id}/record-print`);

  return response.data;
}

// Cancel Invoice
export async function cancelInvoice(
  id: number,
  reason?: string,
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.delete(`/Invoices/${id}`, {
    params: { reason },
  });

  return response.data;
}
