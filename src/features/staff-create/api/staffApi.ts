import type { User } from "@/entities/session/model/types";
import { api } from "@/shared/api/base";
import type { ApiEnvelope } from "@/shared/types";

interface CreateUserRequest {
  email: string;
  password: string;
  role?: "admin" | "employee";
  allowedMenus?: string[];
}

export const staffCreateApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useCreateSuperAdminMutation,
  useCreateAdminMutation,
  useCreateEmployeeMutation,
} = staffCreateApi;
