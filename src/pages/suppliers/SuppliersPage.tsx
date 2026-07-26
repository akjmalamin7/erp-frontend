import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader, Modal, EmptyState } from "@/shared/ui";
import type { Supplier } from "@/entities/supplier";
import CreateSupplierForm from "@/features/supplier-create/ui/CreateSupplierForm";

export default function SuppliersPage() {
  const [open, setOpen] = useState(false);
  // The backend does not currently expose GET /suppliers/all, so newly
  // created suppliers are tracked locally for this session's list view.
  const [localList, setLocalList] = useState<Supplier[]>([]);

  return (
    <div>
      <PageHeader
        title="Suppliers"
        description="Vendors you purchase stock from."
        actions={
          <button className="btn-accent" onClick={() => setOpen(true)}>
            <Plus size={16} /> New supplier
          </button>
        }
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

      <Modal open={open} onClose={() => setOpen(false)} title="New supplier">
        <CreateSupplierForm
          onCreated={(supplier) => {
            setLocalList((prev) => [supplier, ...prev]);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
