import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRevenueReport } from "@/api/reports.api";
import type { RevenueReportResponse } from "@/types/report.types";
import useFetch from "@/hooks/useFetch";

function RevenueChart() {
  // Fetch revenue report data
  const { data, isLoading, error } =
    useFetch<RevenueReportResponse>(getRevenueReport);

  // Format data for Recharts — needs array of objects
  const chartData =
    data?.monthlyRevenues.map((item) => ({
      month: item.amount,
      amount: item.amount,
      invoicesCount: item.invoicesCount,
    })) ?? [];

  // Loading State
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardHeader>
          <div className="h-[300px] bg-muted animate-pulse rounded"></div>
        </CardHeader>
      </Card>
    );
  }

  // Error State
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>الإيرادات الشهرية</CardTitle>
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
        <CardTitle>الإيرادات الشهرية</CardTitle>
        <p className="text-sm text-muted-foreground">
          إجمالي: {data?.totalRevenue.toLocaleString()} د.ع
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString()} د.ع`,
                "الإيرادات",
              ]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563EB"
              strokeWidth={2}
              dot={{ fill: "#2563EB", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default RevenueChart;
