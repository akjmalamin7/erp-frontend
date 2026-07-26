import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";
import type { SmsIntegration } from "@/entities/sms/model/types";

export const smsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSmsIntegration: builder.query<ApiEnvelope<SmsIntegration>, void>({
      query: () => "/sms/get-integration",
      providesTags: ["Sms"],
    }),
    updateSmsIntegration: builder.mutation<ApiEnvelope<SmsIntegration>, Partial<SmsIntegration>>({
      query: (body) => ({
        url: "/sms/update-integration",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Sms"],
    }),
    sendSms: builder.mutation<ApiEnvelope<null>, { to: string; message: string }>({
      query: (body) => ({ url: "/sms/send", method: "POST", body }),
    }),
  }),
});

export const {
  useGetSmsIntegrationQuery,
  useUpdateSmsIntegrationMutation,
  useSendSmsMutation,
} = smsApi;
