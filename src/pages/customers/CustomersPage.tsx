import type { Customer } from "@/entities/customer";
import { useGetAllCustomersQuery } from "@/entities/customer";
import CreateCustomerForm from "@/features/customer-create/ui/CreateCustomerForm";
import { EmptyState, ErrorState, Loader, PageHeader } from "@/shared/ui";
import Button from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input";
import Table, { Column } from "@/shared/ui/table/Table";
import { Edit2, Search } from "lucide-react";
import { useState } from "react";

export default function CustomersPage() {
  const { data, isLoading, isError } = useGetAllCustomersQuery();
  const [query, setQuery] = useState("");

  const customers = (data?.data ?? []).filter((c: Customer) =>
    `${c.name} ${c.phone}`.toLowerCase().includes(query.toLowerCase()),
  );

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
          className={`badge ${
            due > 0 ? "bg-red-100 text-red-700" : "bg-sea-500/10 text-sea-600"
          }`}
        >
          ৳ {(due ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (_, row) => (
        <div className="flex justify-end">
          <CreateCustomerForm
            mode="edit"
            initialData={row}
            trigger={
              <Button variant="close">
                <Edit2 size={16} />
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Track buyers, contact details, and outstanding balances."
        actions={<CreateCustomerForm />}
      />

      <div className="mb-4 relative w-full max-w-xs">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
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
        <Table columns={columns} data={customers} />
      )}
    </div>
  );
}
