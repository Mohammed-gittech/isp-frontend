export type AlertStatus = "New" | "Reviewed" | "Resolved" | "Ignored";

// Security Alert response - matches SecurityAlertDto in Backend
export interface SecurityAlertResponse {
  id: number;
  alertType: string;
  message: string;
  ipAddress: string | null;
  username: string | null;
  occurrenceCount: number;
  severity: string;
  status: AlertStatus;
  telegramSent: boolean;
  createdAt: string;
  reviewedAt: string | null;
  reviewNotes: string | null;
}

// Review Alert request - matches ReviewAlertDto in Backend
export interface ReviewAlert {
  notes?: string;
}
