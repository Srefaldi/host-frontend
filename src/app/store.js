import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; // Path relatif ke authSlice.js

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
