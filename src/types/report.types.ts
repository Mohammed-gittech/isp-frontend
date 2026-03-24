// ===== Revenue Report =====

// Monthly Revenue - matches MonthlyRevenueDto in Backend
export interface MonthlyRevenue {
  month: string; //"2026-01"
  amount: number; //15000
  invoicesCount: number; //50
}

// Plan Revenue - matches PlanRevenueDto in Backend
export interface PlanRevenue {
  planName: string; // "100 Mbps"
  revenue: number; // 27000.25
  subscribersCount: number; // 100
  percentage: number; //60%
}

// Revenue Report response = matches RevenueReportDto in Backend
export interface RevenueReportResponse {
  totalRevenue: number; // Total income
  paidInvoicesCount: number; // Number of paid invoices
  unpaidInvoicesCount: number; // Number of unpaid invoices
  unpaidAmount: number; // The total unpaid amount

  monthlyRevenues: MonthlyRevenue[]; // Monthly revenue details
  revenueByPlan: PlanRevenue[]; // Revenue details by plan
}

// ===== Growth Report =====

// Monthly Growth  - matches MonthlyGrowthDto in Backend
export interface MonthlyGrowth {
  month: string; // "2026-1" Example: "2026-01"
  activeCount: number; // Number of active subscribers at the end of this month
  newCount: number; // Number of new subscribers in this month
  churnedCount: number; // Number of churned subscribers in this month
  netGrowth: number; // Net growth in this month
}

// Growth Report response - matches GrowthReportDto in Backend
export interface GrowthReportResponse {
  totalActiveSubscribers: number; // Total number of active subscribers currently
  totalAllSubscribers: number; // Total number of all subscribers (active + inactive)
  newSubscribers: number; // Number of new subscribers in the specified period
  churnedSubscribers: number; // Number of subscribers who cancelled
  netGrowth: number; // Net growth (Net Growth)
  growthRate: number; // Growth rate in percentage
  churnRate: number; // Churn rate in percentage
  monthlyTrend: MonthlyGrowth[]; // Number of subscribers month by month
}

// ===== Plan Popularity Report =====

// Plan Popularity - matches PlanPopularityDto in Backend
export interface PlanPopularity {
  planId: number; // Plan ID
  planName: string; // Plan name
  speed: number; // Speed in Mbps
  price: number; // Monthly price
  subscribersCount: number; // Number of subscribers in this plan
  percentage: number; // Percentage of total subscribers
  rank: number; // Rank (1 = most popular)
  monthlyRevenue: number; // Monthly revenue from this plan
  annualRevenue: number; // Annual revenue expected
}

// Plan Popularity Report response - matches PlanPopularityReportDto in Backend
export interface PlanPopularityReportResponse {
  totalSubscribers: number; // Total number of active subscribers
  totalPlans: number; // Total number of plans available (with subscribers)
  totalMonthlyRevenue: number; // Total monthly revenue from all plans
  totalAnnualRevenue: number; // Total annual revenue expected

  plans: PlanPopularity[]; // List of plans with their statistics
}

// ===== Expiring Soon Report =====

// Expiring Subscription - matches ExpiringSubscriptionDto in Backend
export interface ExpiringSubscription {
  subscriptionId: number; // Subscription ID
  subscriberName: string; // Subscriber name
  subscriberPhone: string; // Subscriber phone
  planName: string; // Plan name
  price: number; // Monthly price
  endDate: string; // Subscription end date
  daysRemaining: number; // Days remaining until expiration
  status: string; // Subscription status
  priority: string; // Subscription priority
}

// Expiring Soon Report response - matches ExpiringSoonReportDto in Backend
export interface ExpiringSoonReportResponse {
  expiringSoon: number; // Total number of subscriptions expiring soon (within 7 days)
  expiringIn1Day: number; // Number of subscriptions expiring in 1 day
  expiringIn3Days: number; // Number of subscriptions expiring in 3 days
  expiringIn7Days: number; // Number of subscriptions expiring in 7 days

  alreadyExpired: number; // Number of subscriptions that have already expired
  potentialRevenueLoss: number; // Potential revenue loss (monthly)

  subscriptions: ExpiringSubscription[]; // List of subscriptions expiring soon
}

// ===== Dashboard Summary Report =====

// Dashboard Summary response - matches DashboardSummaryDto in Backend
export interface DashboardSummaryReportResponse {
  // 1. Revenue Metrics
  totalRevenue: number; // Total income (current month or specified period)
  unpaidInvoices: number; // Number of unpaid invoices
  unpaidAmount: number; // The total unpaid amount

  // 2. Subscribers Metrics
  totalActiveSubscribers: number; // Total number of active subscribers
  newSubscribersThisMonth: number; // Number of new subscribers this month
  growthRate: number; // Growth rate in percentage

  // 3. Expiring Metrics
  expiringSoon: number; // Number of subscriptions that expired within 7 days
  expiringIn3Days: number; // Number of subscriptions that expired in 3 days
  potentialLoss: number; // Potential financial loss (monthly)

  // 4. Top Plan
  topPlanName: string; // Most popular plan name
  topPlanSubscribers: number; // Number of subscribers to the most popular plan
  topPlanPercentage: number; // Percentage of subscribers to the most popular plan
  topPlanRevenue: number; // Monthly revenue from the most popular plan
}
