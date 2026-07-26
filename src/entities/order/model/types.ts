import type { Product } from "@/entities/product/model/types";
import type { Customer } from "@/entities/customer/model/types";

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
