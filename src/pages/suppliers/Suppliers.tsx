import type { Supplier } from "@/entities/supplier";
import { CreateSupplierForm } from "@/features/supplier-create";
import { EmptyState, PageHeader } from "@/shared/ui";
import { Container } from "@/shared/ui/container";
import { useState } from "react";

const Suppliers = () => {
  const [localList, setLocalList] = useState<Supplier[]>([]);

  return (
    <Container>
      <PageHeader
        title="Suppliers"
        description="Vendors you purchase stock from."
        actions={<CreateSupplierForm />}
      />

      {localList.length === 0 ? (
        <EmptyState
          title="No suppliers added this session"
          description="Newly added suppliers will appear here. Use the button above to add one."
        />
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-shell">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {localList.map((s) => (
                <tr key={s._id}>
                  <td className="font-medium text-ink-900">{s.name}</td>
                  <td className="font-mono text-slate-600">{s.phone}</td>
                  <td className="text-slate-500">{s.email ?? "—"}</td>
                  <td className="text-slate-500">{s.address ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};
export default Suppliers;
