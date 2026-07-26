import { api } from "@/shared/api/base";
import type { ApiEnvelope, ListEnvelope } from "@/shared/types";
import type { Brand } from "@/entities/brand/model/types";

export const brandApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query<ListEnvelope<Brand>, void>({
      query: () => "/brands/all",
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation<ApiEnvelope<Brand>, { name: string; description?: string }>({
      query: (body) => ({ url: "/brands/create", method: "POST", body }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const { useGetAllBrandsQuery, useCreateBrandMutation } = brandApi;
