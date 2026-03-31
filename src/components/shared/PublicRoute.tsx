import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppDispatch";

function PublicRoute() {
  // Check if user is authenticated from Redux
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Already logged in → redirect to dashboard
  if (isAuthenticated) return <Navigate to={"/dashboard"} replace />;

  // Not logged in → show the page (Login)
  return <Outlet />;
}

export default PublicRoute;
