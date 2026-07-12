import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import { EmptyState, ErrorState } from "@/components/States";
import {
  useCreateProductMutation,
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/services/inventoryApi";
import type { Product } from "@/types";
import { Pencil, Plus, Search } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
// DynamicTable ইমপোর্ট করুন
import Table, { Column } from "@/shared/ui/table/Table";

const emptyForm = {
  name: "",
  sku: "",
  price: "",
  cost_price: "",
  quantity: "",
  unit: "pcs",
  category: "",
  brand: "",
};

export default function ProductsList() {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const products = data?.data ?? [];
  const filtered = useMemo(
    () =>
      products.filter((p) =>
        `${p.name} ${p.sku ?? ""}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [products, query],
  );

  // টেবিল কলাম কনফিগারেশন
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
          className={`badge ${qty <= 5 ? "bg-red-100 text-red-700" : "bg-sea-500/10 text-sea-600"
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
          className="btn-ghost !px-2 !py-1.5"
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
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      sku: p.sku ?? "",
      price: String(p.price ?? ""),
      cost_price: String(p.cost_price ?? ""),
      quantity: String(p.quantity ?? ""),
      unit: p.unit ?? "pcs",
      category: typeof p.category === "string" ? p.category : p.category?._id ?? "",
      brand: typeof p.brand === "string" ? p.brand : p.brand?._id ?? "",
    });
    setOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      name: form.name,
      sku: form.sku || undefined,
      price: Number(form.price),
      cost_price: form.cost_price ? Number(form.cost_price) : undefined,
      quantity: Number(form.quantity),
      unit: form.unit,
      category: form.category || undefined,
      brand: form.brand || undefined,
    };
    try {
      if (editing) {
        await updateProduct({ id: editing._id, body }).unwrap();
        toast.success("Product updated");
      } else {
        await createProduct(body).unwrap();
        toast.success("Product created");
      }
      setOpen(false);
    } catch {
      toast.error("Couldn't save the product");
    }
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
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
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
        <EmptyState title="No products found" description="Create your first product to get started." />
      ) : (
        /* এখানে নতুন DynamicTable ব্যবহার করা হয়েছে */
        <Table
          columns={columns}
          data={filtered}
        />
      )}

      {/* Modal code remains same */}
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit product" : "New product"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... existing form fields ... */}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-outline" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" disabled={creating || updating} className="btn-accent">
              {editing ? "Save changes" : "Create product"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}