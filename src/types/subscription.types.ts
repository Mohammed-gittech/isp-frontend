// Subscription status matching Backend SubscriptionStatus enum
export type SubscriptionStatus = "Active" | "Expiring" | "Expired";

// Subscription response - matches SubscriptionDto in Backend
export interface SubscriptionResponse {
  id: number;
  subscriberId: number;
  subscriberName: string;
  planId: number;
  planName: string;
  speed: number;
  price: number;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  daysRemaining: number;
  autoRenew: boolean;
  notes: string | null;
  createdAt: string;
}

// Create subscription request - matches CreateSubscriptionDto in Backend
export interface CreateSubscriptionRequest {
  subscriberId: number;
  planId: number;
  startDate: string;
  autoRenew: boolean;
  notes?: string;
}

// Renew subscription request - matches RenewSubscriptionDto in Backend
export interface RenewSubscriptionRequest {
  subscriptionId: number;
  newPlanId?: number; // null = نفس الباقة
  autoRenew: boolean;
  notes?: string;
}
