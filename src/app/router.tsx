import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/widgets/auth-layout/ui/AuthLayout";
import DashboardLayout from "@/widgets/dashboard-layout/ui/DashboardLayout";
import RequireAuth from "@/app/routes/RequireAuth";
import RequireRole from "@/app/routes/RequireRole";
import RequireMenu from "@/app/routes/RequireMenu";

import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import ProductsList from "@/pages/products/ProductsList";
import CategoriesBrandsPage from "@/pages/categories/CategoriesBrandsPage";
import CustomersPage from "@/pages/customers/CustomersPage";
import SuppliersPage from "@/pages/suppliers/SuppliersPage";
import OrdersPage from "@/pages/orders/OrdersPage";
import InvoicesPage from "@/pages/orders/InvoicesPage";
import LowStockPage from "@/pages/lowstock/LowStockPage";
import AccountsPage from "@/pages/accounts/AccountsPage";
import ReportsPage from "@/pages/accounts/ReportsPage";
import StaffPage from "@/pages/staff/StaffPage";
import SmsSettingsPage from "@/pages/sms/SmsSettingsPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import Forbidden from "@/pages/misc/Forbidden";
import NotFound from "@/pages/misc/NotFound";

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
            children: [
              { index: true, element: <Dashboard />, handle: { title: "Dashboard" } },
            ],
          },
          {
            element: <RequireMenu menu="stock" />,
            children: [
              { path: "products", element: <ProductsList />, handle: { title: "Products" } },
              { path: "low-stock", element: <LowStockPage />, handle: { title: "Low stock" } },
              {
                element: <RequireRole roles={["super_admin", "admin"]} />,
                children: [
                  { path: "suppliers", element: <SuppliersPage />, handle: { title: "Suppliers" } },
                ],
              },
            ],
          },
          {
            element: <RequireMenu menu="category" />,
            children: [
              { path: "categories", element: <CategoriesBrandsPage />, handle: { title: "Categories & Brands" } },
            ],
          },
          {
            element: <RequireMenu menu="customers" />,
            children: [
              { path: "customers", element: <CustomersPage />, handle: { title: "Customers" } },
            ],
          },
          {
            element: <RequireMenu menu="sale" />,
            children: [
              { path: "orders", element: <OrdersPage />, handle: { title: "Orders" } },
            ],
          },
          {
            element: <RequireMenu menu="invoice" />,
            children: [
              { path: "invoices", element: <InvoicesPage />, handle: { title: "Invoices" } },
            ],
          },
          {
            element: <RequireMenu menu="sales_report" />,
            children: [
              { path: "reports", element: <ReportsPage />, handle: { title: "Sales report" } },
              {
                element: <RequireRole roles={["super_admin", "admin"]} />,
                children: [
                  { path: "accounts", element: <AccountsPage />, handle: { title: "Accounts" } },
                ],
              },
            ],
          },
          {
            element: <RequireRole roles={["super_admin", "admin"]} />,
            children: [
              { path: "staff", element: <StaffPage />, handle: { title: "Staff" } },
              { path: "sms", element: <SmsSettingsPage />, handle: { title: "SMS settings" } },
            ],
          },
          {
            element: <RequireMenu menu="profile" />,
            children: [
              { path: "profile", element: <ProfilePage />, handle: { title: "My profile" } },
            ],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
