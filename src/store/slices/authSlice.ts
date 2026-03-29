import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, LoginResponse } from "../../types/auth.types";

// Shape of the auth state in Redux
interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  accessTokenExpiresAt: string | null;
  isAuthenticated: boolean;
}

// Initial state when the app first loads
const initialState: AuthState = {
  user: null,
  accessToken: null,
  accessTokenExpiresAt: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action 1: Login — saves all user data after successful login
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.user = {
        id: action.payload.userId,
        username: action.payload.username,
        tenantId: action.payload.tenantId,
        tenantName: action.payload.tenantName,
        email: action.payload.email,
        role: action.payload.role,
      };
      state.accessToken = action.payload.token;
      state.accessTokenExpiresAt = action.payload.accessTokenExpiresAt;
      state.isAuthenticated = true;

      // Save refreshToken in localStorage (persists after browser close)
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },

    // Action 2: Logout — clears everything
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.accessTokenExpiresAt = null;
      state.isAuthenticated = false;

      // Remove refreshToken from localStorage
      localStorage.removeItem("refreshToken");
    },

    // Action 3: SetAccessToken — updates token after refresh
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

// Export actions — to use with dispatch
export const { login, logout, setAccessToken } = authSlice.actions;

// Export reducer — to use in the Store
export default authSlice.reducer;
