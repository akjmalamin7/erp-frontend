import * as yup from "yup";
const menuOptions = [
  "dashboard",
  "customers",
  "category",
  "stock",
  "sale",
  "invoice",
  "profile",
  "staff",
  "sales_report",
  "mail_atleast",
] as const;
const roleOptions = ["admin", "employee", "super_admin"] as const;

export const resetPasswordSchema = yup.object({
  id: yup.string().required("Please select a user!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters!")
    .required("Please enter your password!"),
});
export type ResetPasswordSchemaType = yup.InferType<typeof resetPasswordSchema>;

export const userCreateSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: yup
    .string()
    .oneOf(roleOptions, "Invalid role selected")
    .required("Role is required"),

  allowedMenus: yup
    .array()
    .of(yup.string().oneOf(menuOptions))
    .min(1, "Select at least one menu")
    .required("At least one menu must be allowed"),
});
export type userCreateSchemaType = yup.InferType<typeof userCreateSchema>;
