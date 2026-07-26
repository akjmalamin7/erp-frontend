import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";

export const passwordResetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<
      ApiEnvelope<null>,
      { id: string; new_password: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/users/reset-password/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = passwordResetApi;
