// Entity Type
export type EntityType =
  | "User"
  | "Tenant"
  | "Subscriber"
  | "Plan"
  | "Subscription"
  | "Notification"
  | "AuditLog"
  | "Payment"
  | "Invoice"
  | "Report"
  | "Security-Alerts";

// Audit Log response - matches AuditLogDto in Backend
export interface AuditLogResponse {
  id: number;
  tenantId: number | null;
  tenantName: string | null;

  userId: number | null;
  username: string;

  action: string; // Create, Update, Delete
  entityType: string; // User, Subscriber
  entityId: number | null;

  oldValues: string | null;
  newValues: string | null;

  ipAddress: string;
  userAgent: string | null;

  timestamp: string;
  success: boolean;
  errorMessage: string | null;
}

// Audit Log Filter request - matches AuditLogFilterDto in Backend
export interface AuditLogFilter {
  tenantId?: number;
  userId?: number;
  action?: string; // Create, Update, Delete, Login
  entityType?: EntityType; // User, Subscriber, Plan, Subscription
  entityId?: number;
  fromDate?: string;
  toDate?: string;
  success?: boolean;
  searchTerm?: string; // search in Username or IpAddress
  pageNumber: number;
  pageSize: number;
}

// Statistics response

export interface ActionBreakdown {
  action: string;
  count: number;
}

export interface EntityBreakdown {
  entityType: string;
  count: number;
}

export interface TopUsers {
  username: string;
  operations: number;
}
export interface StatisticsResponse {
  totalLogs: number;
  successfulOperations: number;
  failedOperations: number;
  actionBreakdown: ActionBreakdown[];
  entityBreakdown: EntityBreakdown[];
  topUsers: TopUsers[];
}
