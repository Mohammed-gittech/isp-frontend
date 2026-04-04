import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlanPopularity } from "@/api/reports.api";
import type { PlanPopularityReportResponse } from "@/types/report.types";
import useFetch from "@/hooks/useFetch";

function PlanPopularityChart() {
  const { data, isLoading, error } =
    useFetch<PlanPopularityReportResponse>(getPlanPopularity);

  // Format data for Recharts
  const chartData =
    data?.plans.map((item) => ({
      planName: item.planName,
      subscribersCount: item.subscribersCount,
      percentage: item.percentage,
      monthlyRevenue: item.monthlyRevenue,
    })) ?? [];

  // Loading State
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  // Error State
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>شعبية الخطط</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Success State
  return (
    <Card>
      <CardHeader>
        <CardTitle>شعبية الخطط</CardTitle>
        <p className="text-sm text-muted-foreground">
          إجمالي المشتركين: {data?.totalSubscribers} | إيرادات شهرية:{" "}
          {data?.totalMonthlyRevenue.toLocaleString()} د.ع
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="planName" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => {
                const labels: Record<string, string> = {
                  subscribersCount: "عدد المشتركين",
                  monthlyRevenue: "الإيرادات الشهرية",
                };
                return [
                  Number(value).toLocaleString(),
                  labels[String(name)] ?? name,
                ];
              }}
            />
            {/* Subscribers Count Bar */}
            <Bar
              dataKey="subscribersCount"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PlanPopularityChart;
