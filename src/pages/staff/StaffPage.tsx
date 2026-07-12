import { useAppSelector } from "@/app/hooks";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import { EmptyState, ErrorState } from "@/components/States";
import { useCreateAdminMutation, useCreateEmployeeMutation } from "@/services/authApi";
import { useGetAllProfilesQuery } from "@/services/usersApi";
import type { MenuKey } from "@/types";
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

const ALL_MENUS: MenuKey[] = [
  "dashboard", "category", "customers", "stock", "mail_atleast",
  "staff", "sale", "invoice", "sales_report", "profile",
];

const roleBadge: Record<string, string> = {
  super_admin: "bg-ink-900/10 text-ink-900",
  admin: "bg-brass-100 text-brass-700",
  employee: "bg-sea-500/10 text-sea-600",
};

export default function StaffPage() {
  const currentUser = useAppSelector((s) => s.auth.user);
  const { data, isLoading, isError } = useGetAllProfilesQuery();
  const [createAdmin, { isLoading: creatingAdmin }] = useCreateAdminMutation();
  const [createEmployee, { isLoading: creatingEmployee }] = useCreateEmployeeMutation();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<"admin" | "employee">("employee");
  const [form, setForm] = useState({ email: "", password: "", employee_id: "" });
  const [menus, setMenus] = useState<MenuKey[]>(["dashboard", "profile"]);

  const staff = data?.data ?? [];
  const canCreateAdmin = currentUser?.role === "super_admin";

  const toggleMenu = (menu: MenuKey) => {
    setMenus((prev) => (prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (role === "admin") {
        await createAdmin({ ...form, allowedMenus: ALL_MENUS }).unwrap();
      } else {
        await createEmployee({ ...form, allowedMenus: menus }).unwrap();
      }
      toast.success(`${role === "admin" ? "Admin" : "Employee"} account created`);
      setForm({ email: "", password: "", employee_id: "" });
      setOpen(false);
    } catch {
      toast.error("Couldn't create the account");
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Role</label>
            <div className="flex gap-2">
              {canCreateAdmin && (
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={role === "admin" ? "btn-primary flex-1" : "btn-outline flex-1"}
                >
                  Admin
                </button>
              )}
              <button
                type="button"
                onClick={() => setRole("employee")}
                className={role === "employee" ? "btn-primary flex-1" : "btn-outline flex-1"}
              >
                Employee
              </button>
            </div>
          </div>
          <div>
            <label className="label">Employee ID</label>
            <input required className="input" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
          </div>
          <div>
            <label className="label">Email</label>
            <input required type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label">Temporary password</label>
            <input required type="text" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>

          {role === "employee" && (
            <div>
              <label className="label">Allowed menus</label>
              <div className="flex flex-wrap gap-2">
                {ALL_MENUS.map((menu) => (
                  <button
                    key={menu}
                    type="button"
                    onClick={() => toggleMenu(menu)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${menus.includes(menu)
                      ? "border-ink-900 bg-ink-900 text-white"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    {menu.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-outline" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" disabled={creatingAdmin || creatingEmployee} className="btn-accent">
              Create account
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
