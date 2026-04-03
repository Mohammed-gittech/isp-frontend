import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/slices/authSlice";
import { revokeToken } from "@/api/auth.api";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (storedRefreshToken) {
        await revokeToken({ refreshToken: storedRefreshToken });
      }
    } catch {
      console.error("Failed to revoke token");
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  return { handleLogout };
}
