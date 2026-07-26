import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import type { MenuKey } from "@/shared/types";
import {
  useCreateAdminMutation,
  useCreateEmployeeMutation,
} from "@/features/staff-create/api/staffApi";
import { staffCreateSchema, type StaffCreateFormValues } from "@/features/staff-create/model/schema";

const ALL_MENUS: MenuKey[] = [
  "dashboard", "category", "customers", "stock", "mail_atleast",
  "staff", "sale", "invoice", "sales_report", "profile",
];

interface StaffCreateFormProps {
  canCreateAdmin: boolean;
  onDone: () => void;
  onCancel: () => void;
}

export default function StaffCreateForm({ canCreateAdmin, onDone, onCancel }: StaffCreateFormProps) {
  const [createAdmin, { isLoading: creatingAdmin }] = useCreateAdminMutation();
  const [createEmployee, { isLoading: creatingEmployee }] = useCreateEmployeeMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StaffCreateFormValues>({
    resolver: yupResolver(staffCreateSchema),
    defaultValues: {
      role: "employee",
      employee_id: "",
      email: "",
      password: "",
      allowedMenus: ["dashboard", "profile"],
    },
  });

  const role = watch("role");
  const menus = watch("allowedMenus");

  const toggleMenu = (menu: MenuKey) => {
    const next = menus.includes(menu) ? menus.filter((m) => m !== menu) : [...menus, menu];
    setValue("allowedMenus", next, { shouldValidate: true });
  };

  const onSubmit = async (values: StaffCreateFormValues) => {
    try {
      if (values.role === "admin") {
        await createAdmin({
          email: values.email,
          password: values.password,
          employee_id: values.employee_id,
          allowedMenus: ALL_MENUS,
        }).unwrap();
      } else {
        await createEmployee({
          email: values.email,
          password: values.password,
          employee_id: values.employee_id,
          allowedMenus: values.allowedMenus,
        }).unwrap();
      }
      toast.success(`${values.role === "admin" ? "Admin" : "Employee"} account created`);
      onDone();
    } catch {
      toast.error("Couldn't create the account");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Role</label>
        <div className="flex gap-2">
          {canCreateAdmin && (
            <button
              type="button"
              onClick={() => setValue("role", "admin")}
              className={role === "admin" ? "btn-primary flex-1" : "btn-outline flex-1"}
            >
              Admin
            </button>
          )}
          <button
            type="button"
            onClick={() => setValue("role", "employee")}
            className={role === "employee" ? "btn-primary flex-1" : "btn-outline flex-1"}
          >
            Employee
          </button>
        </div>
      </div>
      <div>
        <label className="label">Employee ID</label>
        <input className="input" {...register("employee_id")} />
        {errors.employee_id && <p className="mt-1 text-xs text-red-600">{errors.employee_id.message}</p>}
      </div>
      <div>
        <label className="label">Email</label>
        <input type="email" className="input" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="label">Temporary password</label>
        <input type="text" className="input" {...register("password")} />
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
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
        <button type="button" className="btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" disabled={creatingAdmin || creatingEmployee} className="btn-accent">
          Create account
        </button>
      </div>
    </form>
  );
}
