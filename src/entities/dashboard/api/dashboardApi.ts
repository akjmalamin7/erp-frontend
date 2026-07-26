import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";
import type { DashboardStats } from "@/entities/dashboard/model/types";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<ApiEnvelope<DashboardStats>, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
