import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wifi,
  Calendar,
  CreditCard,
  FileText,
  BarChart3,
  UserCog,
  ScrollText,
  Building2,
  Shield,
  ChevronLeft,
  Search,
  Bell,
  LogOut,
  User,
  KeyRound,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useAppDispatch";
import type { UserRole } from "@/types/auth.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLogout } from "@/hooks/useLogout";

// Define the shape of each navigation item
interface NavItem {
  label: string; // الاسم العربي
  labelEn: string; // الاسم الإنجليزي
  icon: React.ReactNode; // الأيقونة
  path: string; // URL الـ
  roles: UserRole[]; // Link من يرى هذا الـ
  badge?: number; // عدد اختياري (للطلبات المعلقة)
}

const navItems: NavItem[] = [
  {
    label: "لوحة التحكم",
    labelEn: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: "/dashboard",
    roles: ["SuperAdmin", "TenantAdmin", "Employee"],
  },
  {
    label: "المشتركون",
    labelEn: "Subscribers",
    icon: <Users className="h-5 w-5" />,
    path: "/subscribers",
    roles: ["SuperAdmin", "TenantAdmin", "Employee"],
  },
  {
    label: "الخطط",
    labelEn: "Plans",
    icon: <Wifi className="h-5 w-5" />,
    path: "/plans",
    roles: ["SuperAdmin", "TenantAdmin", "Employee"],
  },
  {
    label: "الاشتراكات",
    labelEn: "Subscriptions",
    icon: <Calendar className="h-5 w-5" />,
    path: "/subscriptions",
    roles: ["SuperAdmin", "TenantAdmin", "Employee"],
  },
  {
    label: "المدفوعات",
    labelEn: "Payments",
    icon: <CreditCard className="h-5 w-5" />,
    path: "/payments",
    roles: ["SuperAdmin", "TenantAdmin", "Employee"],
  },
  {
    label: "الفواتير",
    labelEn: "Invoices",
    icon: <FileText className="h-5 w-5" />,
    path: "/invoices",
    roles: ["SuperAdmin", "TenantAdmin", "Employee"],
  },
  {
    label: "التقارير",
    labelEn: "Reports",
    icon: <BarChart3 className="h-5 w-5" />,
    path: "/reports",
    roles: ["SuperAdmin", "TenantAdmin", "Employee"],
  },
  {
    label: "المستخدمون",
    labelEn: "Users",
    icon: <UserCog className="h-5 w-5" />,
    path: "/users",
    roles: ["SuperAdmin", "TenantAdmin"],
  },
  {
    label: "سجلات العمليات",
    labelEn: "Audit Logs",
    icon: <ScrollText className="h-5 w-5" />,
    path: "/audit-logs",
    roles: ["SuperAdmin", "TenantAdmin"],
  },
  {
    label: "الوكلاء",
    labelEn: "Tenants",
    icon: <Building2 className="h-5 w-5" />,
    path: "/tenants",
    roles: ["SuperAdmin"],
    badge: 2,
  },
  {
    label: "التنبيهات الأمنية",
    labelEn: "Security Alerts",
    icon: <Shield className="h-5 w-5" />,
    path: "/security-alerts",
    roles: ["SuperAdmin"],
  },
];

function MainLayout() {
  // Get user data from Redux
  const user = useAppSelector((state) => state.auth.user);

  // Navigation hooks
  const location = useLocation();

  // Sidebar collapsed state — default: expanded
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Filter nav items based on user role
  const visibleNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role),
  );

  // Handle logout — clear Redux + localStorage + redirect
  const { handleLogout } = useLogout();

  // Get breadcrumb based on current URL
  const getBreadcrumbs = () => {
    const currentItem = navItems
      .filter((item) => location.pathname.startsWith(item.path))
      .sort((a, b) => b.path.length - a.path.length)[0];

    return currentItem
      ? [{ label: currentItem.label, path: currentItem.path }]
      : [];
  };

  // Get role label in Arabic
  const getRoleLabel = () => {
    switch (user?.role) {
      case "SuperAdmin":
        return "مدير النظام";
      case "TenantAdmin":
        return "مدير الوكيل";
      case "Employee":
        return "موظف";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-40 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
          {sidebarCollapsed ? (
            <Wifi className=" h-6 w-6 text-sidebar-foreground" />
          ) : (
            <h1 className="font-semibold text-lg text-sidebar-foreground">
              نظام إدارة ISP
            </h1>
          )}
        </div>
        {/* Navigation Links */}
        <nav className="p-2 space-y-1 overflow-auto">
          {visibleNavItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors 
                    ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
              >
                {/* Icon */}
                {item.icon}

                {/* Label + Badge — show only when expanded */}
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="h-5 min-w-5 px-1.5 text-xs bg-destructive text-destructive-foreground"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-20 left-0 right-0 p-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sidebar-foreground/70 hover:bg-red-600/20 hover:text-red-400 w-full border border-transparent hover:border-red-600/30"
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && (
              <span className="flex-1 text-sm">تسجيل الخروج</span>
            )}
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 bg-sidebar-accent rounded-lg hover:bg-sidebar-border transition-colors"
        >
          <ChevronLeft
            className={`h-4 w-4 text-sidebar-foreground transition-transform duration-300 ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? "mr-16" : "mr-64"}`}
      >
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-30">
          {/* Left Side — Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">الرئيسية</BreadcrumbLink>
              </BreadcrumbItem>
              {getBreadcrumbs().map((crumb) => (
                <React.Fragment key={crumb.path}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative w-64 hidden md:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث٫٫٫"
                className="pr-10 h-9 bg-input-background"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors outline-none cursor-pointer">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-medium">{user?.username}</div>
                  <div className="text-xs text-muted-foreground">
                    {getRoleLabel()}
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="ml-2 h-4 w-4" />
                  <span>الملف الشخصي</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <KeyRound className="ml-2 h-4 w-4" />
                  <span>تغيير كلمة المرور</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
