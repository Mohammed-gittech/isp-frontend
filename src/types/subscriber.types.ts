import type { SubscriptionResponse } from "./subscription.types";

// Subscriber status matching Backend SubscriberStatus enum
export type SubscriberStatus = "Active" | "Inactive" | "Suspended";

// Subscriber status as number for sending to Backend
export type SubscriberStatusCode = 0 | 1 | 2;

// Full subscriber response data - matches SubscriberDto in Backend
export interface SubscriberResponse {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string | null;
  address: string | null;
  telegramUsername: string | null;
  hasTelegram: boolean;
  nationalId: string | null;
  registrationDate: string; // DateTime → string in JSON
  status: SubscriberStatus; // comes as "Active" | "Inactive" | "Suspended"
  notes: string | null;
  currentSubscription: SubscriptionResponse | null;
}

// Create subscriber request - matches CreateSubscriberDto in Backend
export interface CreateSubscriberRequest {
  fullName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  telegramUsername?: string;
  nationalId?: string;
  notes?: string;
}

// Update subscriber request - matches UpdateSubscriberDto in Backend
export interface UpdateSubscriberRequest {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  telegramUsername?: string;
  nationalId?: string;
  status?: SubscriberStatusCode; // sent as number (0,1,2)
  notes?: string;
}

// Link Telegram request - matches LinkTelegramDto in Backend
export interface LinkTelegramRequest {
  chatId: string;
}
