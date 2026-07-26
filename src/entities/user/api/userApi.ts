import { api } from "@/shared/api/base";
import type { ApiEnvelope, ListEnvelope } from "@/shared/types";
import type { User } from "@/entities/session/model/types";
import type { Profile } from "@/entities/user/model/types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiEnvelope<Profile>, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    getAllProfiles: builder.query<ListEnvelope<User>, void>({
      query: () => "/profile/all",
      providesTags: ["StaffList"],
    }),
    updateProfile: builder.mutation<ApiEnvelope<User>, Partial<User>>({
      query: (body) => ({ url: "/profile/update", method: "PATCH", body }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAllProfilesQuery,
  useUpdateProfileMutation,
} = userApi;
