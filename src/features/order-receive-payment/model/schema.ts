import * as yup from "yup";

export interface ReceivePaymentFormValues {
  amount: number;
}

export const receivePaymentSchema: yup.ObjectSchema<ReceivePaymentFormValues> = yup
  .object({
    amount: yup
      .number()
      .typeError("Enter a valid amount")
      .required("Amount is required")
      .moreThan(0, "Amount must be greater than 0"),
  })
  .required();
