import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getExpiringSoon } from "@/api/reports.api";
import type { ExpiringSoonReportResponse } from "@/types/report.types";
import useFetch from "@/hooks/useFetch";

function ExpiringSoonList() {
  const { data, isLoading, error } =
    useFetch<ExpiringSoonReportResponse>(getExpiringSoon);

  // Loading State
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-5 w-40 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="h-3 w-24 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-6 w-12 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Error State
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>اشتراكات ستنتهي قريباً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get badge variant based on days remaining
  const getBadgeVariant = (days: number) => {
    if (days <= 1) return "destructive"; // أحمر — خطر
    if (days <= 3) return "secondary"; // رمادي — تحذير
    return "outline"; // بدون لون — عادي
  };

  // Success State
  return (
    <Card>
      <CardHeader>
        <CardTitle>اشتراكات ستنتهي قريباً</CardTitle>
        <p className="text-sm text-muted-foreground">
          خلال 7 أيام: {data?.expiringSoon} | خلال 3 أيام:{" "}
          <span className="text-destructive font-medium">
            {data?.expiringIn3Days}
          </span>
        </p>
      </CardHeader>
      <CardContent>
        {data?.subscriptions.length === 0 ? (
          // Empty State
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              لا توجد اشتراكات ستنتهي قريباً ✅
            </p>
          </div>
        ) : (
          // List
          <div className="space-y-3">
            {data?.subscriptions.map((subscription) => (
              <div
                key={subscription.subscriptionId}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
              >
                {/* Subscriber Info */}
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">
                    {subscription.subscriberName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {subscription.planName} — {subscription.subscriberPhone}
                  </p>
                </div>

                {/* Days Remaining Badge */}
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={getBadgeVariant(subscription.daysRemaining)}>
                    {subscription.daysRemaining === 0
                      ? "اليوم!"
                      : `${subscription.daysRemaining} يوم`}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {subscription.price.toLocaleString()} د.ع
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ExpiringSoonList;
