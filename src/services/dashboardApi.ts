import { api } from "@/services/api";
import type { ApiEnvelope, DashboardStats } from "@/types";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<ApiEnvelope<DashboardStats>, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
