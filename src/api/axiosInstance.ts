import axios from "axios";
import { store } from "../store";
import { logout, setAccessToken } from "../store/slices/authSlice";

// Base URL for all API requests
const BASE_URL = "http://localhost:5029/api";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - runs before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken; // Get access token from Redux store

    // If token exists, add it to the request header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor - runs after every response
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // ✅ Request succeeded - return response as is
  },
  async (error) => {
    // Save the original failed request to retry later
    const originalRequest = error.config;

    // If 401 (Token expired) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Mark request as retried to avoid infinite loop
      originalRequest._retry = true;

      try {
        // Get refresh token from localStorage
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // No refresh token - force logout
          store.dispatch(logout());
          return Promise.reject(error);
        }

        // Send refresh token to Backend
        const response = await axios.post(`${BASE_URL}/Auth/refresh`, {
          refreshToken,
        });

        // Extract new access token
        const newAccessToken = response.data.data.token;

        // Save new access token in Redux
        store.dispatch(setAccessToken(newAccessToken));

        // Retry original request with new token
        originalRequest.header.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token expired - force logout
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
