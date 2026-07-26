import * as yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginSchema: yup.ObjectSchema<LoginFormValues> = yup
  .object({
    email: yup.string().trim().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
