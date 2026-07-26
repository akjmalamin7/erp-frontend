import type { Category } from "@/entities/category/model/types";
import type { Brand } from "@/entities/brand/model/types";

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
