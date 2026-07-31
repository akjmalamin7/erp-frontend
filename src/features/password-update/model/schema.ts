import * as yup from "yup";

export const passwordUpdateSchema = yup.object({
  old_password: yup.string().required("Current password is required"),
  new_password: yup
    .string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters")
    .notOneOf(
      [yup.ref("old_password")],
      "New password must differ from the current password",
    ),
});
export type PasswordUpdateSchemaType = yup.InferType<
  typeof passwordUpdateSchema
>;
