import { Checkbox } from "@/shared/ui/checkbox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CheckMenusProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
}

const menuOptions = [
  "dashboard",
  "category",
  "customers",
  "stock",
  "mail_atleast",
  "staff",
  "sale",
  "invoice",
  "sales_report",
  "profile",
] as const;

const menuLabels: Record<string, string> = {
  dashboard: "Dashboard Overview",
  category: "Product Categories",
  customers: "Customer Records",
  stock: "Inventory/Stock Management",
  mail_atleast: "SMS & Notifications",
  staff: "Staff Management",
  sale: "Sales & Orders",
  invoice: "Invoice Management",
  sales_report: "Reports & Analytics",
  profile: "Profile & Security",
};

const CheckMenus = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Assign Menu Permissions",
}: CheckMenusProps<TFieldValues>) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { value = [], onChange }, fieldState }) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
            {menuOptions.map((menu) => {
              const isChecked = (value as string[])?.includes(menu);
              const handleToggle = (checked: boolean) => {
                if (checked) {
                  onChange([...value, menu]);
                } else {
                  onChange(value.filter((v: string) => v !== menu));
                }
              };

              return (
                <Checkbox
                  key={menu}
                  label={menuLabels[menu] || menu}
                  checked={isChecked}
                  onChange={(e) => handleToggle(e.target.checked)}
                  className="p-2 transition-colors"
                />
              );
            })}

            {fieldState.error && (
              <p className="col-span-full text-xs text-red-500 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default CheckMenus;
