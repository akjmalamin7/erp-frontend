import { Control, FieldValues, Path } from "react-hook-form";

import { ControllSelect } from "@/shared/ui/controll-select";
import { ShieldCheck } from "lucide-react";

interface SelectRoleProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const roleOptions = [
  { name: "Super Admin", value: "super_admin" },
  { name: "Admin", value: "admin" },
  { name: "Employee", value: "employee" },
];

const SelectRole = <T extends FieldValues>({
  control,
  name,
  label = "Select User Role",
  disabled = false,
}: SelectRoleProps<T>) => {
  return (
    <div className="w-full">
      <ControllSelect
        name={name}
        label={label}
        control={control}
        options={[{ name: "--SELECT ROLE--", value: "" }, ...roleOptions]}
        disabled={disabled}
      />

      <p className="mt-1.5 text-[10px] text-slate-500 flex items-center gap-1 px-1">
        <ShieldCheck size={12} className="text-brass-500" />
        Roles define the level of system access and permissions.
      </p>
    </div>
  );
};
export default SelectRole;
