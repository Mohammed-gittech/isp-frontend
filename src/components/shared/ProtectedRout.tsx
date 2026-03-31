import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppDispatch";

function ProtectedRoute() {
  // Check if user is authenticated from Redux
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Not logged in → redirect to login
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  // Logged in → show the page
  return <Outlet />;
}

export default ProtectedRoute;
