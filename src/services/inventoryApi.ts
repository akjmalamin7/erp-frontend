import { api } from "@/services/api";
import type {
  ApiEnvelope,
  ListEnvelope,
  Product,
  Category,
  Brand,
  Supplier,
  LowStockAlert,
} from "@/types";

export const inventoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ---- products ----
    getAllProducts: builder.query<ListEnvelope<Product>, void>({
      query: () => "/products/all",
      providesTags: ["Product"],
    }),
    getProduct: builder.query<ApiEnvelope<Product>, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<ApiEnvelope<Product>, Partial<Product>>({
      query: (body) => ({ url: "/products/create", method: "POST", body }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      ApiEnvelope<Product>,
      { id: string; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: `/products/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // ---- categories ----
    getAllCategories: builder.query<ListEnvelope<Category>, void>({
      query: () => "/categories/all",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<ApiEnvelope<Category>, { name: string; description?: string }>({
      query: (body) => ({ url: "/categories/create", method: "POST", body }),
      invalidatesTags: ["Category"],
    }),

    // ---- brands ----
    getAllBrands: builder.query<ListEnvelope<Brand>, void>({
      query: () => "/brands/all",
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation<ApiEnvelope<Brand>, { name: string; description?: string }>({
      query: (body) => ({ url: "/brands/create", method: "POST", body }),
      invalidatesTags: ["Brand"],
    }),

    // ---- suppliers ----
    createSupplier: builder.mutation<ApiEnvelope<Supplier>, Partial<Supplier>>({
      query: (body) => ({ url: "/suppliers/create", method: "POST", body }),
      invalidatesTags: ["Supplier"],
    }),

    // ---- low stock ----
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

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useCreateSupplierMutation,
  useGetLowStockQuery,
  useUpdateLowStockMutation,
} = inventoryApi;
