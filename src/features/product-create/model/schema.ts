import * as yup from "yup";

export interface ProductFormValues {
  name: string;
  sku?: string;
  price: number;
  cost_price?: number;
  quantity: number;
  unit: string;
  category?: string;
  brand?: string;
}

export const productSchema: yup.ObjectSchema<ProductFormValues> = yup
  .object({
    name: yup.string().trim().required("Product name is required"),
    sku: yup.string().trim().optional(),
    price: yup
      .number()
      .typeError("Enter a valid price")
      .required("Price is required")
      .min(0, "Price can't be negative"),
    cost_price: yup
      .number()
      .typeError("Enter a valid cost price")
      .min(0, "Cost price can't be negative")
      .optional(),
    quantity: yup
      .number()
      .typeError("Enter a valid quantity")
      .required("Quantity is required")
      .min(0, "Quantity can't be negative")
      .integer("Quantity must be a whole number"),
    unit: yup.string().trim().required("Unit is required"),
    category: yup.string().trim().optional(),
    brand: yup.string().trim().optional(),
  })
  .required();
