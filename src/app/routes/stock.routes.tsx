import Brands from "@/pages/brands";
import CategoriesPage from "@/pages/categories";
import LowStockPage from "@/pages/lowstock/LowStockPage";
import ProductsList from "@/pages/products/ProductsList";
import Suppliers from "@/pages/suppliers/Suppliers";
import RequireRole from "./RequireRole";

export const stockRoutes = [
  {
    path: "products",
    element: <ProductsList />,
    handle: { title: "Products" },
  },
  {
    path: "low-stock",
    element: <LowStockPage />,
    handle: { title: "Low stock" },
  },
  {
    path: "/products/brands",
    element: <Brands />,
    handle: { title: "Brands" },
  },
  {
    path: "/products/category",
    element: <CategoriesPage />,
    handle: { title: "Categories & Brands" },
  },
  {
    element: <RequireRole roles={["super_admin", "admin"]} />,
    children: [
      {
        path: "/products/suppliers",
        element: <Suppliers />,
        handle: { title: "Suppliers" },
      },
    ],
  },
];
