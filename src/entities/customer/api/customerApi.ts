import { api } from "@/shared/api/base";
import type { ApiEnvelope, ListEnvelope } from "@/shared/types";
import type { Customer } from "@/entities/customer/model/types";

export const customerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query<ListEnvelope<Customer>, void>({
      query: () => "/customers/all",
      providesTags: ["Customer"],
    }),
    getCustomer: builder.query<ApiEnvelope<Customer>, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Customer", id }],
    }),
    createCustomer: builder.mutation<ApiEnvelope<Customer>, Partial<Customer>>({
      query: (body) => ({ url: "/customers/create", method: "POST", body }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<
      ApiEnvelope<Customer>,
      { id: string; body: Partial<Customer> }
    >({
      query: ({ id, body }) => ({
        url: `/customers/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
