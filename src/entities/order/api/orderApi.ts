import { api } from "@/shared/api/base";
import type { ApiEnvelope, ListEnvelope } from "@/shared/types";
import type { Order } from "@/entities/order/model/types";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<ListEnvelope<Order>, void>({
      query: () => "/orders/all",
      providesTags: ["Order"],
    }),
    getOrder: builder.query<ApiEnvelope<Order>, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Order", id }],
    }),
    createOrder: builder.mutation<ApiEnvelope<Order>, Partial<Order>>({
      query: (body) => ({ url: "/orders/create", method: "POST", body }),
      invalidatesTags: ["Order", "Dashboard"],
    }),
    cancelOrder: builder.mutation<ApiEnvelope<Order>, string>({
      query: (id) => `/orders/cancel/${id}`,
      invalidatesTags: ["Order", "Dashboard"],
    }),
    receiveOrderPayment: builder.mutation<
      ApiEnvelope<Order>,
      { order_id: string; amount: number }
    >({
      query: (body) => ({ url: "/orders/payment", method: "POST", body }),
      invalidatesTags: ["Order", "Dashboard"],
    }),
    getInvoice: builder.query<ApiEnvelope<Order>, string>({
      query: (id) => `/invoice/${id}`,
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useReceiveOrderPaymentMutation,
  useGetInvoiceQuery,
} = orderApi;
