import { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Select, { SelectOption } from "../select/Select";

interface IControllSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: SelectOption[];
  label?: string | ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const ControllSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  label,
  placeholder,
  disabled,
}: IControllSelectProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          label={label}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          error={{
            status: !!fieldState.error,
            message: fieldState.error?.message as string,
          }}
        />
      )}
    />
  );
};

export default ControllSelect;
