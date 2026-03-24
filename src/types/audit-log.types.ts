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
  entityType?: string; // User, Subscriber, Plan, Subscription
  entityId?: number;
  fromDate?: string;
  toDate?: string;
  success?: boolean;
  searchTerm?: string; // search in Username or IpAddress
  pageNumber: number;
  pageSize: number;
}
