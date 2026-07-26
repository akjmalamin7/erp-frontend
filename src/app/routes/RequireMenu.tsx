import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import type { MenuKey } from "@/shared/types";

interface RequireMenuProps {
  menu: MenuKey;
}

/**
 * super_admin and admin always pass. employee accounts are gated by
 * their individually assigned `allowedMenus` list from the backend.
 */
export default function RequireMenu({ menu }: RequireMenuProps) {
  const user = useAppSelector((s) => s.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "employee") return <Outlet />;
  if (user.allowedMenus?.includes(menu)) return <Outlet />;
  return <Navigate to="/forbidden" replace />;
}
