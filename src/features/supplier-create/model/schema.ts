import * as yup from "yup";

export interface CreateSupplierFormValues {
  name: string;
  company_name: string;
  phone: string;
  email?: string;
  address?: string;
}

export const createSupplierSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  company_name: yup
    .string()
    .trim()
    .required("Company / contact name is required"),
  phone: yup.string().trim().required("Phone is required"),
  email: yup.string().trim().email("Enter a valid email").optional(),
  address: yup.string().trim().optional(),
});
export type createSupplierSchemaType = yup.InferType<
  typeof createSupplierSchema
>;
