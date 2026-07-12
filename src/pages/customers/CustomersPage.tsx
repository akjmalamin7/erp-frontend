import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import { EmptyState, ErrorState } from "@/components/States";
import { useCreateCustomerMutation, useGetAllCustomersQuery } from "@/services/customersApi";
import { Plus, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
// DynamicTable ইমপোর্ট করুন
import Table, { Column } from "@/shared/ui/table/Table";

// কাস্টমার টাইপ ডিফাইন (যদি types ফাইল থেকে না আসে)
interface Customer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  due_balance?: number;
  address?: string;
}

export default function CustomersPage() {
  const { data, isLoading, isError } = useGetAllCustomersQuery();
  const [createCustomer, { isLoading: creating }] = useCreateCustomerMutation();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  // কাস্টমার ডেটা ফিল্টারিং
  const customers = (data?.data ?? []).filter((c: Customer) =>
    `${c.name} ${c.phone}`.toLowerCase().includes(query.toLowerCase()),
  );

  // টেবিল কলাম কনফিগারেশন
  const columns: Column<Customer>[] = [
    {
      header: "Name",
      accessor: "name",
      className: "font-medium text-ink-900",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "font-mono text-slate-600",
    },
    {
      header: "Email",
      accessor: "email",
      className: "text-slate-500",
      render: (email) => email ?? "—",
    },
    {
      header: "Due balance",
      accessor: "due_balance",
      render: (due: number) => (
        <span
          className={`badge ${due > 0 ? "bg-red-100 text-red-700" : "bg-sea-500/10 text-sea-600"
            }`}
        >
          ৳ {(due ?? 0).toLocaleString()}
        </span>
      ),
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer(form).unwrap();
      toast.success("Customer added");
      setForm({ name: "", phone: "", email: "", address: "" });
      setOpen(false);
    } catch {
      toast.error("Couldn't add customer");
    }
  };

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Track buyers, contact details, and outstanding balances."
        actions={
          <button className="btn-accent" onClick={() => setOpen(true)}>
            <Plus size={16} /> New customer
          </button>
        }
      />

      <div className="mb-4 relative w-full max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          className="input pl-9"
          placeholder="Search customers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorState />
      ) : customers.length === 0 ? (
        <EmptyState
          title="No customers found"
          description="Add your first customer to start recording sales against them."
        />
      ) : (
        /* DynamicTable এর ব্যবহার */
        <Table
          columns={columns}
          data={customers}
        />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New customer">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full name</label>
            <input
              required
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Phone</label>
            <input
              required
              className="input"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Email (optional)</label>
            <input
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Address (optional)</label>
            <textarea
              className="input"
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-outline" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" disabled={creating} className="btn-accent">
              Save customer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}