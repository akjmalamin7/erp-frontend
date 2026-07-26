import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";

export const passwordUpdateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation<
      ApiEnvelope<null>,
      { old_password: string; new_password: string }
    >({
      query: (body) => ({
        url: "/users/update-password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useUpdatePasswordMutation } = passwordUpdateApi;
