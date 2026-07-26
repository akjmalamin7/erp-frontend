import { useAppSelector } from "@/app/hooks";
import { Loader, Modal, PageHeader, EmptyState, ErrorState } from "@/shared/ui";
import { useGetAllProfilesQuery } from "@/entities/user";
import { Plus } from "lucide-react";
import { useState } from "react";
import StaffCreateForm from "@/features/staff-create/ui/StaffCreateForm";

const roleBadge: Record<string, string> = {
  super_admin: "bg-ink-900/10 text-ink-900",
  admin: "bg-brass-100 text-brass-700",
  employee: "bg-sea-500/10 text-sea-600",
};

export default function StaffPage() {
  const currentUser = useAppSelector((s) => s.auth.user);
  const { data, isLoading, isError } = useGetAllProfilesQuery();

  const [open, setOpen] = useState(false);

  const staff = data?.data ?? [];
  const canCreateAdmin = currentUser?.role === "super_admin";

  return (
    <div>
      <PageHeader
        title="Staff"
        description="Manage admin and employee access to the console."
        actions={
          <button className="btn-accent" onClick={() => setOpen(true)}>
            <Plus size={16} /> New account
          </button>
        }
      />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorState />
      ) : staff.length === 0 ? (
        <EmptyState title="No staff accounts yet" />
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-shell">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Menus</th>
              </tr>
            </thead>
            <tbody>
              {staff?.map((s) => (
                <tr key={s._id}>
                  <td className="font-mono text-xs text-slate-500">{s.user.employee_id}</td>
                  <td className="font-medium text-ink-900">{s.user.email}</td>
                  <td><span className={`badge capitalize ${roleBadge[s.user.role]}`}>{s.user.role?.replace("_", " ")}</span></td>
                  <td>
                    <span className={`badge ${s.user.status === "active" ? "bg-sea-500/10 text-sea-600" : "bg-slate-100 text-slate-500"}`}>
                      {s.user.status}
                    </span>
                  </td>
                  <td className="text-xs text-slate-500">
                    {s.user.role === "employee" ? (s.user.allowedMenus?.join(", ") || "—") : "All"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New staff account">
        <StaffCreateForm
          canCreateAdmin={canCreateAdmin}
          onDone={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}
