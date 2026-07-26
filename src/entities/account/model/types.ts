export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category?: string;
  note?: string;
  createdAt?: string;
}

export interface Loan {
  _id: string;
  employee_id: string;
  amount: number;
  paid_amount?: number;
  status?: string;
  createdAt?: string;
}

export interface Investment {
  _id: string;
  investor_name: string;
  amount: number;
  note?: string;
  createdAt?: string;
}

export interface Salary {
  _id: string;
  employee_id: string;
  amount: number;
  month: string;
  status?: string;
  createdAt?: string;
}
