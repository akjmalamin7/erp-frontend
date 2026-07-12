export type Role = "super_admin" | "admin" | "employee";

export type MenuKey =
  | "dashboard"
  | "category"
  | "customers"
  | "stock"
  | "mail_atleast"
  | "staff"
  | "sale"
  | "invoice"
  | "sales_report"
  | "profile";

export interface User {
  user: any;
  _id: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  employee_id: string;
  must_change_password: boolean;
  allowedMenus: MenuKey[];
  createdAt?: string;
}
export interface Profile {
  _id: string;
  designation: string;
  bio: string;
  photo: string;
  dob: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface ApiEnvelope<T> {
  status: "success" | "failed";
  message?: string;
  data: T;
}
export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  user: User;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface ListEnvelope<T> {
  status: "success" | "failed";
  message?: string;
  data: T[];
  total?: number;
  page?: number;
  pages?: number;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface Brand {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  sku?: string;
  category?: string | Category;
  brand?: string | Brand;
  price: number;
  cost_price?: number;
  quantity: number;
  unit?: string;
  status?: "active" | "inactive";
  image?: string;
  createdAt?: string;
}

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  due_balance?: number;
  createdAt?: string;
}

export interface Supplier {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt?: string;
}

export interface OrderItem {
  product: string | Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  order_number?: string;
  customer?: string | Customer;
  items: OrderItem[];
  total_amount: number;
  paid_amount: number;
  due_amount?: number;
  status: "pending" | "completed" | "canceled";
  payment_status: "paid" | "partial" | "unpaid";
  createdAt?: string;
}

export interface LowStockAlert {
  _id: string;
  product: string | Product;
  current_quantity: number;
  threshold: number;
  is_read: boolean;
  createdAt?: string;
}

export interface DashboardStats {
  today_sales: number;
  monthly_sales: number;
  yearly_sales: number;
  today_orders: number;
  low_stock: number;
}

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

export interface SmsIntegration {
  provider?: string;
  api_key?: string;
  sender_id?: string;
  enabled: boolean;
}
