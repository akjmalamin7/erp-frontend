import { ControllSelect } from "@/shared/ui/controll-select";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectBloodGroupProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const bloodGroupOptions = [
  { name: "--BLOOD GROUP--", value: "" },
  { name: "A+", value: "A+" },
  { name: "A-", value: "A-" },
  { name: "B+", value: "B+" },
  { name: "B-", value: "B-" },
  { name: "AB+", value: "AB+" },
  { name: "AB-", value: "AB-" },
  { name: "O+", value: "O+" },
  { name: "O-", value: "O-" },
];

const SelectBloodGroup = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Blood Group",
}: SelectBloodGroupProps<TFieldValues>) => {
  return (
    <ControllSelect
      name={name}
      label={label}
      options={bloodGroupOptions}
      control={control}
    />
  );
};
export default SelectBloodGroup;
