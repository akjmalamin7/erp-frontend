export interface Customer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  due_balance?: number;
  createdAt?: string;
}
