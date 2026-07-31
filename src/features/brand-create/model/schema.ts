import * as yup from "yup";
export const brandSchema = yup.object({
  name: yup.string().required("Please enter category name"),
  description: yup.string().optional(),
});
export type brandSchemaType = yup.InferType<typeof brandSchema>;
