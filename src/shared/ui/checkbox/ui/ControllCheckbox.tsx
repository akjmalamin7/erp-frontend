import { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Checkbox from "./Checkbox";

interface IProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string | ReactNode;
  disabled?: boolean;
  className?: string;
}

const ControllCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  disabled,
  className,
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState }) => (
        <Checkbox
          {...field}
          label={label}
          disabled={disabled}
          className={className}
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          error={{
            status: !!fieldState.error,
            message: fieldState.error?.message,
          }}
        />
      )}
    />
  );
};

export default ControllCheckbox;
