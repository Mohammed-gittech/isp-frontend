import {
  Users,
  ChartNoAxesCombined,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard } from "@/api/reports.api";
import type { DashboardSummaryReportResponse } from "@/types/report.types";
import useFetch from "@/hooks/useFetch";

function StatsCards() {
  // Fetch dashboard data using our custom hook
  const { data, isLoading, error } =
    useFetch<DashboardSummaryReportResponse>(getDashboard);

  // Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
        {error}
      </div>
    );
  }

  // Success State
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Subscribers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            إجمالي المشتركين
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.totalActiveSubscribers}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-600">
              +{data?.newSubscribersThisMonth}
            </span>{" "}
            مشترك جديد هذا الشهر
          </p>
        </CardContent>
      </Card>

      {/* Growth Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">معدل النمو</CardTitle>
          <ChartNoAxesCombined className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.growthRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            معدل النمو الحالي
          </p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            الإيرادات الشهرية
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.totalRevenue.toLocaleString()} د.ع
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            غير مدفوع: {data?.unpaidAmount.toLocaleString()} د.ع
          </p>
        </CardContent>
      </Card>

      {/* Expiring Soon */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">ستنتهي قريباً</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.expiringIn3Days}</div>
          <p className="text-xs text-muted-foreground mt-1">
            خلال 3 أيام القادمة
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsCards;
