import type { MenuKey, Role } from "@/shared/types";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Boxes,
  LayoutDashboard,
  MessageSquareText,
  Receipt,
  ShoppingCart,
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
        path: "/products/brands",
        icon: UserCog,
        menu: "stock",
      },
      {
        label: "Inventory",
        path: "/products/inventory",
        icon: UserCog,
        menu: "stock",
      },
      {
        label: "Suppliers",
        path: "/products/suppliers",
        icon: Truck,
        menu: "stock",
        roles: ["super_admin", "admin"],
      },
      {
        label: "Codes",
        path: "/products/codes",
        icon: Truck,
        menu: "stock",
        roles: ["super_admin", "admin"],
      },
    ],
  },

  { label: "Customers", path: "/customers", icon: Users, menu: "customers" },

  {
    label: "Orders",
    path: "/orders",
    icon: ShoppingCart,
    menu: "sale",
    children: [
      {
        label: "Carts ",
        path: "/orders/carts",
        icon: UserCog,
        menu: "sale",
      },
    ],
  },
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
    children: [
      {
        label: "Expense ",
        path: "/accounts/expense",
        icon: UserCog,
        menu: "sales_report",
      },
      {
        label: "Investment ",
        path: "/accounts/investment",
        icon: UserCog,
        menu: "sales_report",
      },
      {
        label: "Loan ",
        path: "/accounts/loan",
        icon: UserCog,
        menu: "sales_report",
      },
      {
        label: "Salary ",
        path: "/accounts/salary",
        icon: UserCog,
        menu: "sales_report",
      },
    ],
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
    roles: ["super_admin", "admin", "employee"],
    children: [
      {
        label: "Create User",
        path: "/profile/create-user",
        icon: UserCog,
        menu: "profile",
        roles: ["super_admin", "admin"],
      },
      {
        label: "All Users",
        path: "/profile/all-users",
        icon: UserCog,
        menu: "profile",
      },
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
        roles: ["super_admin", "admin"],
      },
    ],
  },
];
