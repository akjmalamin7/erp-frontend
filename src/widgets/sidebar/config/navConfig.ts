import type { MenuKey, Role } from "@/shared/types";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Boxes,
  LayoutDashboard,
  MessageSquareText,
  Receipt,
  ShoppingCart,
  Tags,
  Truck,
  UserCog,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  menu: MenuKey;
  /** Roles allowed regardless of allowedMenus (super_admin/admin always full access). */
  roles?: Role[];
  children?: {
    label: string;
    path: string;
    icon: LucideIcon;
    menu: MenuKey;
    /** Roles allowed regardless of allowedMenus (super_admin/admin always full access). */
    roles?: Role[];
  }[];
}

export const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard, menu: "dashboard" },
  {
    label: "Products",
    path: "/products",
    icon: Boxes,
    menu: "stock",
    children: [
      {
        label: "Category",
        path: "/products/category",
        icon: UserCog,
        menu: "stock",
      },
      {
        label: "Brand",
        path: "/products/brand",
        icon: UserCog,
        menu: "stock",
      },
      {
        label: "Inventory",
        path: "/products/inventory",
        icon: UserCog,
        menu: "stock",
      },
    ],
  },
  {
    label: "Categories & Brands",
    path: "/categories",
    icon: Tags,
    menu: "category",
  },
  { label: "Customers", path: "/customers", icon: Users, menu: "customers" },
  {
    label: "Suppliers",
    path: "/suppliers",
    icon: Truck,
    menu: "stock",
    roles: ["super_admin", "admin"],
  },
  { label: "Orders / POS", path: "/orders", icon: ShoppingCart, menu: "sale" },
  {
    label: "Low Stock",
    path: "/low-stock",
    icon: AlertTriangle,
    menu: "stock",
  },
  { label: "Invoices", path: "/invoices", icon: Receipt, menu: "invoice" },
  {
    label: "Sales Report",
    path: "/reports",
    icon: Wallet,
    menu: "sales_report",
  },
  {
    label: "Accounts",
    path: "/accounts",
    icon: Wallet,
    menu: "sales_report",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Staff",
    path: "/staff",
    icon: UserCog,
    menu: "staff",
    roles: ["super_admin", "admin"],
  },
  {
    label: "SMS Settings",
    path: "/sms",
    icon: MessageSquareText,
    menu: "mail_atleast",
    roles: ["super_admin", "admin"],
  },
  {
    label: "Profile",
    path: "/profile",
    icon: UserRound,
    menu: "profile",
    children: [
      {
        label: "Update Password",
        path: "/profile/update-password",
        icon: UserCog,
        menu: "profile",
      },
      {
        label: "Reset Password",
        path: "/profile/reset-password",
        icon: UserCog,
        menu: "profile",
      },
    ],
  },
];
