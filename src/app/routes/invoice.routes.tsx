import InvoicesPage from "@/pages/orders/InvoicesPage";

export const invoiceRoutes = [
  {
    path: "invoices",
    element: <InvoicesPage />,
    handle: { title: "Invoices" },
  },
];
