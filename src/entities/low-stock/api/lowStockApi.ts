import { api } from "@/shared/api/base";
import type { ApiEnvelope, ListEnvelope } from "@/shared/types";
import type { LowStockAlert } from "@/entities/low-stock/model/types";

export const lowStockApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLowStock: builder.query<ListEnvelope<LowStockAlert>, void>({
      query: () => "/low-stock",
      providesTags: ["LowStock"],
    }),
    updateLowStock: builder.mutation<ApiEnvelope<LowStockAlert>, { id: string; is_read: boolean }>({
      query: ({ id, ...body }) => ({
        url: `/low-stock/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LowStock"],
    }),
  }),
});

export const { useGetLowStockQuery, useUpdateLowStockMutation } = lowStockApi;
