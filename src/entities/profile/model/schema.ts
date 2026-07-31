import * as yup from "yup";
export const profileSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  designation: yup.string().required("Designation is required"),
  address: yup.string().required("Address is required"),
  blood_group: yup.string().default(""),
  nid: yup.number().default(0),
  bio: yup.string().optional(),
  dob: yup.string().optional(),
  photo: yup.string().optional(),
  // allowedMenus: yup.array().of(yup.string()).default([]),
});
export type ProfileSchemaType = yup.InferType<typeof profileSchema>;
