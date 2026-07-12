import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import type { Role } from "@/types";

interface RequireRoleProps {
  roles: Role[];
}

/**
 * Gate a route (and its children) to a set of allowed roles.
 * Renders <Outlet /> when the current user's role is permitted,
 * otherwise redirects to the shared "forbidden" page.
 */
export default function RequireRole({ roles }: RequireRoleProps) {
  const user = useAppSelector((s) => s.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }
  return <Outlet />;
}
