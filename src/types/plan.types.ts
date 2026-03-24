// Plan response - matches PlanDto in Backend
export interface PlanResponse {
  id: number;
  name: string;
  speed: number;
  price: number;
  durationDays: number;
  description: string | null;
  isActive: boolean;
  activeSubscriptionsCount: number;
}
// Create plan request body - matches CreatePlanDto in Backend
export interface CreatePlanRequest {
  name: string;
  speed: number;
  price: number;
  durationDays: number;
  description?: string;
}

// Update plan request body - matches UpdatePlanDto in Backend
export interface UpdatePlanRequest {
  name?: string;
  speed?: number;
  price?: number;
  durationDays?: number;
  description?: string;
  isActive?: boolean;
}
