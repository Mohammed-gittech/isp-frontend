import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { login, logout } from "@/store/slices/authSlice";
import { refreshToken } from "@/api/auth.api";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Run once when app opens
    const initializeAuth = async () => {
      try {
        // Check if refreshToken exists in localStorage
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (!storedRefreshToken) {
          // No refreshToken → user is not logged in
          dispatch(logout());
          return;
        }

        // Send refreshToken to Backend → get new token
        const response = await refreshToken({
          refreshToken: storedRefreshToken,
        });

        if (!response.data) {
          // refresh failed → logout
          dispatch(logout());
          return;
        }

        // Success → save user data in Redux
        dispatch(login(response.data));
      } catch {
        // refresh failed → logout
        dispatch(logout());
      } finally {
        // Always mark as initialized — success or fail
        setIsInitialized(true);
      }
    };
    initializeAuth();
  }, [dispatch]);

  if (!isInitialized) {
    // Show loading screen while checking token
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className=" flex flex-col items-center gap-4">
          <div className="loading-spinner" />
          <p className="text-sm text-muted-foreground">...جاري التحميل</p>
        </div>
      </div>
    );
  }
  // Initialization done → show the app
  return <>{children}</>;
}

export default AuthInitializer;
