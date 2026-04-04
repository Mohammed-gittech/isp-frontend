import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import GrowthChart from "./GrowthChart";
import PlanPopularityChart from "./PlanPopularityChart";
import ExpiringSoonList from "./ExpiringSoonList";

function DashboardPage() {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">لوحة التحكم</h1>
        <p className="text-sm text-muted-foreground mt-1">
          نظرة عامة على النظام والإحصائيات
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <GrowthChart />
      </div>

      {/* Plan Popularity + Expiring Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlanPopularityChart />
        <ExpiringSoonList />
      </div>
    </div>
  );
}

export default DashboardPage;
