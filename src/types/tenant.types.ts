import type { PaymentMethod } from "./payment.types";

// Tenant Plan Types - Matches TenantPlan Enum in Backend
export type TenantPlan = "Free" | "Basic" | "Pro";

// Tenant Plan Types as number for sending to Backend
export type TenantPlanCode = 0 | 1 | 2;

// Tenant Subscription Status Types - Matches TenantSubscriptionStatus Enum in Backend
export type TenantSubscriptionStatus =
  | "Pending"
  | "Active"
  | "Expired"
  | "Suspended";

// Tenant response - matches TenantDto in Backend
export interface TenantResponse {
  id: number;
  name: string;
  subdomain: string | null;
  contactEmail: string;
  contactPhone: string | null;

  address: string | null;
  city: string | null;
  country: string | null;

  subscriptionPlan: TenantPlan;
  maxSubscribers: number;
  currentSubscribers: number;
  isActive: boolean;
  createdAt: string;
  expiryDate: string | null;
  hasTelegramBot: boolean;
}

// Tenant Subscription response - matches TenantSubscriptionDto in Backend
export interface TenantSubscriptionResponse {
  id: number;
  tenantId: number;
  plan: TenantPlan;
  price: number;
  startDate: string;
  endDate: string;
  status: TenantSubscriptionStatus;
  paymentMethod: PaymentMethod | null;
  lastPaymentDate: string | null;
  daysRemaining: number;
  isActive: boolean;
}

// Create Tenant request - matches CreateTenantDto in Backend
export interface CreateTenantRequest {
  name: string;
  contactEmail: string;
  contactPhone?: string;

  address?: string;
  city?: string;
  country?: string;

  durationMonths: number;

  subscriptionPlan: TenantPlanCode;
  telegramBotToken?: string;

  adminUsername: string;
  adminEmail: string;
  adminPassword: string;
}

// Update Tenant request - matches UpdateTenantDto in Backend
export interface UpdateTenantRequest {
  name?: string;
  contactEmail?: string;
  contactPhone?: string;
  telegramBotToken?: string;

  address?: string;
  city?: string;
  country?: string;
}

// Renew Tenant Subscription request - matches RenewTenantSubscriptionDto in Backend
export interface RenewTenantSubscriptionRequest {
  plan: TenantPlanCode;
  durationMonths: number; // المدة بالأشهر
}

// Confirm Tenant Payment request - matches ConfirmTenantPaymentDto in Backend
export interface ConfirmTenantPaymentRequest {
  subscriptionId: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  notes?: string;
}

// Current Subscribers Count response
export interface CurrentSubscribersCountResponse {
  tenantId: number;
  tenantName: string;
  currentSubscribers: number;
  maxSubscribers: number;
  canAddMore: boolean;
  remaining: number;
}
