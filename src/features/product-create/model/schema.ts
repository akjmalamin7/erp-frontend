import * as yup from "yup";

export interface ProductFormValues {
  name: string;
  sku?: string;
  code: string;
  category?: string;
  brand?: string;
  price: number;
  discount_price?: number;
  cost: number;
  quantity: number;
  low_stock_threshold: number;
  description?: string;
  supplier?: string;
  image?: string;
  unit?: string;
  status: "active" | "inactive";
}

export const productSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    code: yup.string().required("Code is required"),
    price: yup.number().required().min(0),
    cost: yup.number().required().min(0),
    quantity: yup.number().required().min(0),
    low_stock_threshold: yup.number().required().min(0),
    discount_price: yup
      .number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .default(0),
    status: yup.string().oneOf(["active", "inactive"]).default("active"),

    description: yup.string().optional(),
    sku: yup.string().optional(),
    category: yup.string().optional(),
    brand: yup.string().optional(),
    unit: yup.string().optional(),
    image: yup.string().optional(),
  })
  .required();
