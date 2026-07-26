import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";
import type { Expense, Loan, Investment, Salary } from "@/entities/account/model/types";

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation<ApiEnvelope<Expense>, Partial<Expense>>({
      query: (body) => ({ url: "/expense/create", method: "POST", body }),
      invalidatesTags: ["Expense", "Dashboard"],
    }),
    createInvestment: builder.mutation<ApiEnvelope<Investment>, Partial<Investment>>({
      query: (body) => ({ url: "/investment/create", method: "POST", body }),
      invalidatesTags: ["Investment", "Dashboard"],
    }),
    createLoan: builder.mutation<ApiEnvelope<Loan>, Partial<Loan>>({
      query: (body) => ({ url: "/loan/create", method: "POST", body }),
      invalidatesTags: ["Loan"],
    }),
    getLoan: builder.query<ApiEnvelope<Loan>, string>({
      query: (employee_id) => `/loan/check/${employee_id}`,
      providesTags: ["Loan"],
    }),
    payInstallment: builder.mutation<ApiEnvelope<Loan>, { id: string; amount: number }>({
      query: ({ id, ...body }) => ({
        url: `/installment/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Loan"],
    }),
    createSalary: builder.mutation<ApiEnvelope<Salary>, Partial<Salary>>({
      query: (body) => ({ url: "/salary/create", method: "POST", body }),
      invalidatesTags: ["Salary", "Dashboard"],
    }),
    updateBalance: builder.mutation<ApiEnvelope<null>, { amount: number; type: string }>({
      query: (body) => ({ url: "/balance/update", method: "POST", body }),
      invalidatesTags: ["Dashboard"],
    }),
    getFinancialReport: builder.query<ApiEnvelope<Record<string, unknown>>, void>({
      query: () => "/report",
    }),
    getSalaryReport: builder.query<ApiEnvelope<Salary[]>, void>({
      query: () => "/salary/report",
      providesTags: ["Salary"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useCreateInvestmentMutation,
  useCreateLoanMutation,
  useGetLoanQuery,
  usePayInstallmentMutation,
  useCreateSalaryMutation,
  useUpdateBalanceMutation,
  useGetFinancialReportQuery,
  useGetSalaryReportQuery,
} = accountApi;
