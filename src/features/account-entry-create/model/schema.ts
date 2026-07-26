import * as yup from "yup";

export interface ExpenseFormValues {
  title: string;
  amount: number;
  category?: string;
  note?: string;
}
export const expenseSchema: yup.ObjectSchema<ExpenseFormValues> = yup
  .object({
    title: yup.string().trim().required("Title is required"),
    amount: yup.number().typeError("Enter a valid amount").required("Amount is required").moreThan(0, "Amount must be greater than 0"),
    category: yup.string().trim().optional(),
    note: yup.string().trim().optional(),
  })
  .required();

export interface InvestmentFormValues {
  investor_name: string;
  amount: number;
  note?: string;
}
export const investmentSchema: yup.ObjectSchema<InvestmentFormValues> = yup
  .object({
    investor_name: yup.string().trim().required("Investor name is required"),
    amount: yup.number().typeError("Enter a valid amount").required("Amount is required").moreThan(0, "Amount must be greater than 0"),
    note: yup.string().trim().optional(),
  })
  .required();

export interface LoanFormValues {
  employee_id: string;
  amount: number;
}
export const loanSchema: yup.ObjectSchema<LoanFormValues> = yup
  .object({
    employee_id: yup.string().trim().required("Employee ID is required"),
    amount: yup.number().typeError("Enter a valid amount").required("Amount is required").moreThan(0, "Amount must be greater than 0"),
  })
  .required();

export interface SalaryFormValues {
  employee_id: string;
  amount: number;
  month: string;
}
export const salarySchema: yup.ObjectSchema<SalaryFormValues> = yup
  .object({
    employee_id: yup.string().trim().required("Employee ID is required"),
    amount: yup.number().typeError("Enter a valid amount").required("Amount is required").moreThan(0, "Amount must be greater than 0"),
    month: yup.string().trim().required("Month is required"),
  })
  .required();
