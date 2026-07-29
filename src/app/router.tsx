import { createBrowserRouter, Navigate } from "react-router-dom";

import RequireAuth from "@/app/routes/RequireAuth";
import RequireMenu from "@/app/routes/RequireMenu";
import RequireRole from "@/app/routes/RequireRole";
import AuthLayout from "@/widgets/auth-layout/ui/AuthLayout";
import DashboardLayout from "@/widgets/dashboard-layout/ui/DashboardLayout";

import Login from "@/pages/auth/Login";
import Forbidden from "@/pages/misc/Forbidden";
import NotFound from "@/pages/misc/NotFound";

import {
  brandsRoutes,
  categoryRoutes,
  customerRoutes,
  dashboardRoutes,
  invoiceRoutes,
  profileRoutes,
  salesReportRoutes,
  salesRoutes,
  stockRoutes,
} from "./routes";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            element: <RequireMenu menu="dashboard" />,
            children: dashboardRoutes,
          },
          {
            element: <RequireMenu menu="stock" />,
            children: stockRoutes,
          },
          {
            element: <RequireMenu menu="category" />,
            children: categoryRoutes,
          },
          {
            element: <RequireMenu menu="brands" />,
            children: brandsRoutes,
          },
          {
            element: <RequireMenu menu="customers" />,
            children: customerRoutes,
          },
          {
            element: <RequireMenu menu="sale" />,
            children: salesRoutes,
          },
          {
            element: <RequireMenu menu="invoice" />,

            children: invoiceRoutes,
          },
          {
            element: <RequireMenu menu="sales_report" />,
            children: salesReportRoutes,
          },
          {
            element: <RequireRole roles={["super_admin", "admin"]} />,
            children: stockRoutes,
          },
          {
            element: <RequireMenu menu="profile" />,
            children: profileRoutes,
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
