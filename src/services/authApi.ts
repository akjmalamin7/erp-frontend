import { api } from "@/services/api";
import type { ApiEnvelope, LoginPayload, LoginResponse, User } from "@/types";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponseData {
  token: string;
  user: User;
}

interface CreateUserRequest {
  email: string;
  password: string;
  employee_id: string;
  role?: "admin" | "employee";
  allowedMenus?: string[];
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),
    createSuperAdmin: builder.mutation<ApiEnvelope<User>, CreateUserRequest>({
      query: (body) => ({ url: "/super-admin/create", method: "POST", body }),
    }),
    createAdmin: builder.mutation<ApiEnvelope<User>, CreateUserRequest>({
      query: (body) => ({ url: "/admin/create", method: "POST", body }),
      invalidatesTags: ["StaffList"],
    }),
    createEmployee: builder.mutation<ApiEnvelope<User>, CreateUserRequest>({
      query: (body) => ({ url: "/employee/create", method: "POST", body }),
      invalidatesTags: ["StaffList"],
    }),
    updatePassword: builder.mutation<
      ApiEnvelope<null>,
      { old_password: string; new_password: string }
    >({
      query: (body) => ({
        url: "/users/update-password",
        method: "PATCH",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ApiEnvelope<null>,
      { id: string; new_password: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/users/reset-password/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateSuperAdminMutation,
  useCreateAdminMutation,
  useCreateEmployeeMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
} = authApi;
