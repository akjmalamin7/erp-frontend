import { ControllSelect } from "@/shared/ui/controll-select";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectDesignationProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
}

const designationOptions = [
  { name: "CEO", value: "ceo" },
  { name: "Co-Founder", value: "co-founder" },
  { name: "Manager", value: "manager" },
  { name: "HR", value: "hr" },
  { name: "Accounts", value: "accounts" },
  { name: "Executive", value: "executive" },
  { name: "Sales Executive", value: "sales_executive" },
  { name: "Employee", value: "employee" },
];

const SelectDesignation = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Designation",
}: SelectDesignationProps<TFieldValues>) => {
  return (
    <ControllSelect
      name={name}
      label={label}
      options={designationOptions}
      control={control}
    />
  );
};
export default SelectDesignation;
