import * as yup from "yup";
import type { MenuKey } from "@/shared/types";

export interface StaffCreateFormValues {
  role: "admin" | "employee";
  employee_id: string;
  email: string;
  password: string;
  allowedMenus: MenuKey[];
}

export const staffCreateSchema: yup.ObjectSchema<StaffCreateFormValues> = yup
  .object({
    role: yup.mixed<"admin" | "employee">().oneOf(["admin", "employee"]).required(),
    employee_id: yup.string().trim().required("Employee ID is required"),
    email: yup.string().trim().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Temporary password is required").min(6, "Password must be at least 6 characters"),
    allowedMenus: yup.array().of(yup.mixed<MenuKey>().required()).defined(),
  })
  .required();
