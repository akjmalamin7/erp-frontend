import { api } from "@/shared/api/base";
import type { LoginPayload, LoginResponse } from "@/entities/session/model/types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
