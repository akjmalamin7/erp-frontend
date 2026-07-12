import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateSupplierMutation } from "@/services/inventoryApi";
import PageHeader from "@/components/PageHeader";
import Modal from "@/components/Modal";
import { EmptyState } from "@/components/States";
import type { Supplier } from "@/types";

export default function SuppliersPage() {
  const [createSupplier, { isLoading: creating }] = useCreateSupplierMutation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  // The backend does not currently expose GET /suppliers/all, so newly
  // created suppliers are tracked locally for this session's list view.
  const [localList, setLocalList] = useState<Supplier[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await createSupplier(form).unwrap();
      toast.success("Supplier added");
      setLocalList((prev) => [res.data, ...prev]);
      setForm({ name: "", phone: "", email: "", address: "" });
      setOpen(false);
    } catch {
      toast.error("Couldn't add supplier");
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Company / contact name</label>
            <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input required className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="label">Email (optional)</label>
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label">Address (optional)</label>
            <textarea className="input" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-outline" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" disabled={creating} className="btn-accent">Save supplier</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
