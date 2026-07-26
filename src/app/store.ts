import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/shared/api/base";
import { authReducer } from "@/entities/session";
import uiReducer from "@/app/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
