import * as yup from "yup";
export const categorySchema = yup.object({
  name: yup.string().required("Please enter category name"),
  description: yup.string().optional(),
});
export type categorySchemaType = yup.InferType<typeof categorySchema>;
