import * as yup from "yup";

export interface SendTestSmsFormValues {
  to: string;
  message: string;
}

export const sendTestSmsSchema: yup.ObjectSchema<SendTestSmsFormValues> = yup
  .object({
    to: yup.string().trim().required("Phone number is required"),
    message: yup.string().trim().required("Message is required"),
  })
  .required();
