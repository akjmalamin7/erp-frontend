import * as yup from "yup";

export interface CreateSupplierFormValues {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export const createSupplierSchema: yup.ObjectSchema<CreateSupplierFormValues> = yup
  .object({
    name: yup.string().trim().required("Company / contact name is required"),
    phone: yup.string().trim().required("Phone is required"),
    email: yup.string().trim().email("Enter a valid email").optional(),
    address: yup.string().trim().optional(),
  })
  .required();
