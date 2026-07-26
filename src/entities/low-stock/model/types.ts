import type { Product } from "@/entities/product/model/types";

export interface LowStockAlert {
  _id: string;
  product: string | Product;
  current_quantity: number;
  threshold: number;
  is_read: boolean;
  createdAt?: string;
}
