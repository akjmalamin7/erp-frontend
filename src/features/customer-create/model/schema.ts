import * as yup from "yup";

export interface CreateCustomerFormValues {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export const createCustomerSchema: yup.ObjectSchema<CreateCustomerFormValues> = yup
  .object({
    name: yup.string().trim().required("Full name is required"),
    phone: yup.string().trim().required("Phone is required"),
    email: yup.string().trim().email("Enter a valid email").optional(),
    address: yup.string().trim().optional(),
  })
  .required();
