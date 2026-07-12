import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Boxes,
  Tags,
  Users,
  ShoppingCart,
  Receipt,
  Truck,
  AlertTriangle,
  UserCog,
  Wallet,
  MessageSquareText,
  UserRound,
} from "lucide-react";
import type { MenuKey, Role } from "@/types";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  menu: MenuKey;
  /** Roles allowed regardless of allowedMenus (super_admin/admin always full access). */
  roles?: Role[];
}

export const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard, menu: "dashboard" },
  { label: "Products", path: "/products", icon: Boxes, menu: "stock" },
  { label: "Categories & Brands", path: "/categories", icon: Tags, menu: "category" },
  { label: "Customers", path: "/customers", icon: Users, menu: "customers" },
  { label: "Suppliers", path: "/suppliers", icon: Truck, menu: "stock", roles: ["super_admin", "admin"] },
  { label: "Orders / POS", path: "/orders", icon: ShoppingCart, menu: "sale" },
  { label: "Low Stock", path: "/low-stock", icon: AlertTriangle, menu: "stock" },
  { label: "Invoices", path: "/invoices", icon: Receipt, menu: "invoice" },
  { label: "Sales Report", path: "/reports", icon: Wallet, menu: "sales_report" },
  { label: "Accounts", path: "/accounts", icon: Wallet, menu: "sales_report", roles: ["super_admin", "admin"] },
  { label: "Staff", path: "/staff", icon: UserCog, menu: "staff", roles: ["super_admin", "admin"] },
  { label: "SMS Settings", path: "/sms", icon: MessageSquareText, menu: "mail_atleast", roles: ["super_admin", "admin"] },
  { label: "Profile", path: "/profile", icon: UserRound, menu: "profile" },
];
