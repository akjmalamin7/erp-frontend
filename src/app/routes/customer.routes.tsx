import CustomersPage from "@/pages/customers/CustomersPage";

export const customerRoutes = [
  {
    path: "customers",
    element: <CustomersPage />,
    handle: { title: "Customers" },
  },
];
