import * as yup from "yup";

export interface SmsSettingsFormValues {
  provider: string;
  api_key: string;
  sender_id: string;
  enabled: boolean;
}

export const smsSettingsSchema: yup.ObjectSchema<SmsSettingsFormValues> = yup
  .object({
    provider: yup.string().default(""),
    api_key: yup.string().default(""),
    sender_id: yup.string().default(""),
    enabled: yup.boolean().default(false).required(),
  })
  .required();
