import type { Product } from "@/entities/product";
import { useGetAllProductsQuery } from "@/entities/product";
import ProductForm from "@/features/product-create/ui/ProductForm";
import { EmptyState, ErrorState, Loader, PageHeader } from "@/shared/ui";
import Table, { Column } from "@/shared/ui/table/Table";
import { Pencil, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function ProductsList() {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const products = data?.data ?? [];
  const filtered = useMemo(
    () =>
      products.filter((p) =>
        `${p.name} ${p.sku ?? ""}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [products, query],
  );

  const columns: Column<Product>[] = [
    {
      header: "Name",
      accessor: "name",
      className: "font-medium text-ink-900",
    },
    {
      header: "SKU",
      accessor: "sku",
      className: "text-slate-500",
      render: (sku) => sku ?? "—",
    },
    {
      header: "Price",
      accessor: "price",
      className: "font-mono",
      render: (price: number) => `৳ ${price?.toLocaleString()}`,
    },
    {
      header: "Quantity",
      accessor: "quantity",
      render: (qty: number, p) => (
        <span
          className={`badge ${
            qty <= 5 ? "bg-red-100 text-red-700" : "bg-sea-500/10 text-sea-600"
          }`}
        >
          {qty} {p.unit ?? "pcs"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      className: "capitalize text-slate-500",
      render: (status) => status ?? "active",
    },
    {
      header: "",
      className: "text-right",
      render: (_, p) => (
        <button
          className="btn-ghost px-2! py-1.5!"
          onClick={(e) => {
            e.stopPropagation();
            openEdit(p);
          }}
        >
          <Pencil size={14} />
        </button>
      ),
    },
  ];

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage your catalogue, pricing, and stock levels."
        actions={
          <button className="btn-accent" onClick={openCreate}>
            <Plus size={16} /> New product
          </button>
        }
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="relative w-full max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            className="input pl-9"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorState />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Create your first product to get started."
        />
      ) : (
        <Table columns={columns} data={filtered} />
      )}

      <ProductForm
        open={open}
        editing={editing}
        onDone={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
