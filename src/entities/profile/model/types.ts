export interface IUser {
  _id: string;
  email: string;
  role: "super_admin" | "admin" | "manager" | "employee" | string;
  status: "active" | "inactive" | string;
  employee_id: string;
  allowedMenus: string[];
}

export interface IProfile {
  _id: string;
  designation: string;
  bio: string;
  photo: string;
  dob: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export type MenuKey =
  | "dashboard"
  | "customers"
  | "stock"
  | "sale"
  | "invoice"
  | "profile"
  | "staff"
  | "sales_report";

export const ALL_MENUS: Array<{ label: string; value: MenuKey }> = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Customers", value: "customers" },
  { label: "Stock/Products", value: "stock" },
  { label: "Sales/POS", value: "sale" },
  { label: "Invoices", value: "invoice" },
  { label: "Profile", value: "profile" },
  { label: "Staff", value: "staff" },
  { label: "Reports", value: "sales_report" },
];
