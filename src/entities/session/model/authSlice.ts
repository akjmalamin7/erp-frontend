import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthState, User } from "@/entities/session/model/types";

const TOKEN_COOKIE = "azm_token";
const USER_COOKIE = "azm_user";

const readUser = (): User | null => {
  const raw = Cookies.get(USER_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  token: Cookies.get(TOKEN_COOKIE) ?? null,
  user: readUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    credentialsSet: (
      state,
      action: PayloadAction<{ token: string; user: User }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set(TOKEN_COOKIE, action.payload.token, { expires: 1 });
      Cookies.set(USER_COOKIE, JSON.stringify(action.payload.user), {
        expires: 1,
      });
    },
    profileUpdated: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      Cookies.set(USER_COOKIE, JSON.stringify(action.payload), { expires: 1 });
    },
    loggedOut: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(USER_COOKIE);
    },
  },
});

export const { credentialsSet, profileUpdated, loggedOut } = authSlice.actions;
export default authSlice.reducer;
