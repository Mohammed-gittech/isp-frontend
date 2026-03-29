import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Type of the entire Redux State
export type RootState = ReturnType<typeof store.getState>;

// Type of the dispatch function
export type AppDispatch = typeof store.dispatch;
