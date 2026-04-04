import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import PublicRoute from "./components/shared/PublicRoute";
import ProtectedRoute from "./components/shared/ProtectedRout";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./features/dashboard/DashboardPage";

function App() {
  return (
    <Routes>
      {/* Public Routes — only for non-authenticated users */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Routes — only for authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/subscribers"
            element={<div className="p-4">Subscribers — قريباً</div>}
          />
          <Route
            path="/plans"
            element={<div className="p-4">Plans — قريباً</div>}
          />
        </Route>
      </Route>

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
