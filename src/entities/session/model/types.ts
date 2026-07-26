import type { MenuKey, Role } from "@/shared/types";

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

export interface AuthState {
  token: string | null;
  user: User | null;
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
