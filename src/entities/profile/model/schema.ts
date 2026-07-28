import * as yup from "yup";
export const profileSchema = yup.object({
  designation: yup.string().required("Designation is required"),
  bio: yup.string().optional(),
  dob: yup.string().optional(),
  photo: yup.string().optional(),
  allowedMenus: yup.array().of(yup.string()).default([]),
});
export type ProfileSchemaType = yup.InferType<typeof profileSchema>;
