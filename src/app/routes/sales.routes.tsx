import OrdersPage from "@/pages/orders/OrdersPage";

export const salesRoutes = [
  {
    path: "orders",
    element: <OrdersPage />,
    handle: { title: "Orders" },
  },
];
