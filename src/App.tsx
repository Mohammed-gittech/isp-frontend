import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import PublicRoute from "./components/shared/PublicRoute";
import ProtectedRoute from "./components/shared/ProtectedRout";

function App() {
  return (
    <Routes>
      {/* Public Routes — only for non-authenticated users */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Routes — only for authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<div>Dashboard — قريباً</div>}
        ></Route>
      </Route>

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
