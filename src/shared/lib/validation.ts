import * as yup from "yup";

export interface NameDescriptionFormValues {
  name: string;
  description?: string;
}

export const nameDescriptionSchema: yup.ObjectSchema<NameDescriptionFormValues> = yup
  .object({
    name: yup.string().trim().required("Name is required"),
    description: yup.string().trim().optional(),
  })
  .required();
