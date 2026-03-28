import type { InvoiceItem } from "./invoice.types";

// Payment status - matches PaymentStatus enum in Backend
export type PaymentStatus =
  | "Pending"
  | "Completed"
  | "Failed"
  | "Refunded"
  | "Cancelled";

export type PaymentStatusCode = 1 | 2 | 3 | 4 | 5;

// Payment method - matches PaymentMethod enum in Backend
export type PaymentMethod =
  | "Cash"
  | "CreditCard"
  | "BankTransfer"
  | "Wallet"
  | "ZainCash"
  | "QiCard"
  | "Other";

// Full payment response - matches PaymentDto in Backend
export interface PaymentResponse {
  id: number;
  tenantId: number;
  subscriberId: number;
  subscriberName: string;
  subscriptionId: number | null;
  invoiceId: number | null;
  invoiceNumber: string | null;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentGateway: string | null;
  transactionId: string | null;
  status: PaymentStatus;
  receivedBy: number | null;
  receivedByName: string | null;
  cashReceiptNumber: string | null;
  notes: string | null;
  paidAt: string | null;
  createdAt: string;
}

// Simplified payment for lists - matches PaymentListDto in Backend
export interface PaymentListResponse {
  id: number;
  subscriberName: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
}

// Create cash payment request - matches CreateCashPaymentDto in Backend
export interface CreateCashPaymentRequest {
  subscriberId: number;
  subscriptionId?: number;
  amount: number;
  currency: string;
  cashReceiptNumber?: string;
  notes?: string;
  generateInvoice: boolean;
  invoiceItems?: InvoiceItem[];
}

// Response after creating payment - matches CreatePaymentResponseDto in Backend
export interface CreatePaymentResponse {
  paymentId: number;
  invoiceId: number | null;
  invoiceNumber: string | null;
  amount: number;
  status: PaymentStatus;
  paidAt: string;
  invoicePdfUrl: string | null;
  subscriptionRenewed: boolean;
  newSubscriptionEndDate: string | null;
}

// Refund request - matches RefundPaymentDto in Backend
export interface RefundPaymentRequest {
  amount?: number;
  reason?: string;
}

// Payment Stats response - matches PaymentStatsDto in Backend
export interface PaymentStatsResponse {
  totalAmount: number;
  totalCount: number;
  cashAmount: number;
  cashCount: number;
  onlineAmount: number;
  onlineCount: number;
  fromDate: string;
  toDate: string;
}
