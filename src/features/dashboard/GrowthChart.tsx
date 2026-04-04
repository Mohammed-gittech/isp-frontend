import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGrowthReport } from "@/api/reports.api";
import type { GrowthReportResponse } from "@/types/report.types";
import useFetch from "@/hooks/useFetch";

function GrowthChart() {
  const { data, isLoading, error } =
    useFetch<GrowthReportResponse>(getGrowthReport);

  // Format data for Recharts
  const chartData =
    data?.monthlyTrend.map((item) => ({
      month: item.month,
      newCount: item.newCount,
      churnedCount: item.churnedCount,
      netGrowth: item.netGrowth,
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
          <CardTitle>نمو المشتركين</CardTitle>
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
        <CardTitle>نمو المشتركين</CardTitle>
        <p className="text-sm text-muted-foreground">
          إجمالي النشطين: {data?.totalActiveSubscribers} | معدل النمو:{" "}
          {data?.growthRate.toFixed(1)}%
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => {
                const labels: Record<string, string> = {
                  newCount: "مشتركون جدد",
                  churnedCount: "مشتركون ملغيون",
                  netGrowth: "صافي النمو",
                };
                return [Number(value), labels[String(name)] ?? name];
              }}
            />
            <Legend
              formatter={(value) => {
                const labels: Record<string, string> = {
                  newCount: "مشتركون جدد",
                  churnedCount: "مشتركون ملغيون",
                  netGrowth: "صافي النمو",
                };
                return labels[value] ?? value;
              }}
            />
            {/* New Subscribers */}
            <Line
              type="monotone"
              dataKey="newCount"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
            />
            {/* Churned Subscribers */}
            <Line
              type="monotone"
              dataKey="churnedCount"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", r: 4 }}
              activeDot={{ r: 6 }}
            />
            {/* Net Growth */}
            <Line
              type="monotone"
              dataKey="netGrowth"
              stroke="#2563EB"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#2563EB", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default GrowthChart;
