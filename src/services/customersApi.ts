import { api } from "@/services/api";
import type { ApiEnvelope, ListEnvelope, Customer } from "@/types";

export const customersApi = api.injectEndpoints({
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
} = customersApi;
