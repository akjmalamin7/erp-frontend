import Brands from "@/pages/brands";
import CategoriesBrandsPage from "@/pages/categories/CategoriesBrandsPage";
import LowStockPage from "@/pages/lowstock/LowStockPage";
import ProductsList from "@/pages/products/ProductsList";
import SuppliersPage from "@/pages/suppliers/SuppliersPage";
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
    element: <CategoriesBrandsPage />,
    handle: { title: "Categories & Brands" },
  },
  {
    element: <RequireRole roles={["super_admin", "admin"]} />,
    children: [
      {
        path: "suppliers",
        element: <SuppliersPage />,
        handle: { title: "Suppliers" },
      },
    ],
  },
];
