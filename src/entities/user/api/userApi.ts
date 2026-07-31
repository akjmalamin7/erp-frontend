import type {
  ResetPasswordRequest,
  User,
} from "@/entities/session/model/types";
import type { Profile } from "@/entities/user/model/types";
import { api } from "@/shared/api/base";
import type { ApiEnvelope, ListEnvelope } from "@/shared/types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiEnvelope<Profile>, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    getAllProfiles: builder.query<ListEnvelope<Profile>, void>({
      query: () => "/profile/all",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<ApiEnvelope<Profile>, Partial<User>>({
      query: (body) => ({ url: "/profile/update", method: "PATCH", body }),
      invalidatesTags: ["Profile"],
    }),

    resetUserPassword: builder.mutation<
      ApiEnvelope<null>,
      ResetPasswordRequest
    >({
      query: ({ id, body }) => ({
        url: `/users/reset-password/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAllProfilesQuery,
  useUpdateProfileMutation,
  useResetUserPasswordMutation,
} = userApi;
