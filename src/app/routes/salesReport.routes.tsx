import AccountsPage from "@/pages/accounts/AccountsPage";
import ReportsPage from "@/pages/accounts/ReportsPage";
import RequireRole from "./RequireRole";

export const salesReportRoutes = [
  {
    path: "reports",
    element: <ReportsPage />,
    handle: { title: "Sales report" },
  },
  {
    element: <RequireRole roles={["super_admin", "admin"]} />,
    children: [
      {
        path: "accounts",
        element: <AccountsPage />,
        handle: { title: "Accounts" },
      },
    ],
  },
];
