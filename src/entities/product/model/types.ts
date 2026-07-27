import type { Brand } from "@/entities/brand/model/types";
import type { Category } from "@/entities/category/model/types";

export interface Product {
  _id: string;
  name: string;
  sku?: string;
  code: string;
  category?: string | Category;
  brand?: string | Brand;
  price: number;
  discount_price: number;
  cost: number;
  quantity: number;
  low_stock_threshold: number;
  description?: string;
  unit?: string;
  status?: "active" | "inactive";
  image?: string;
  supplier?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}
