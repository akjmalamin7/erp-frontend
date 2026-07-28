import { productUnitsOptions } from "@/shared/lib/units";
import { ControllSelect } from "@/shared/ui/controll-select";
import { Control, FieldValues, Path } from "react-hook-form";

interface UnitSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const UnitSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Unit",
  placeholder = "Select Unit",
  disabled,
}: UnitSelectProps<TFieldValues>) => {
  return (
    <ControllSelect
      control={control}
      name={name}
      label={label}
      options={productUnitsOptions}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default UnitSelect;
