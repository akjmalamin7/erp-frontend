import { api } from "@/services/api";
import type { ApiEnvelope, ListEnvelope, Profile, User } from "@/types";

export const usersApi = api.injectEndpoints({
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
} = usersApi;
