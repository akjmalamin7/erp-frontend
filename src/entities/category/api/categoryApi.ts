import { api } from "@/shared/api/base";
import type { ApiEnvelope, ListEnvelope } from "@/shared/types";
import type { Category } from "@/entities/category/model/types";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ListEnvelope<Category>, void>({
      query: () => "/categories/all",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<ApiEnvelope<Category>, { name: string; description?: string }>({
      query: (body) => ({ url: "/categories/create", method: "POST", body }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } = categoryApi;
