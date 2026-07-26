import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";
import type { Supplier } from "@/entities/supplier/model/types";

export const supplierApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation<ApiEnvelope<Supplier>, Partial<Supplier>>({
      query: (body) => ({ url: "/suppliers/create", method: "POST", body }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const { useCreateSupplierMutation } = supplierApi;
