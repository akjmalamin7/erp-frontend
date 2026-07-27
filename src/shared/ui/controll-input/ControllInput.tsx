import { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "../input";
interface IProps<TFieldValues extends FieldValues> {
  placeholder?: string;
  label?: string | ReactNode;
  name: Path<TFieldValues>;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "file"
    | "hidden"
    | "checkbox";
  className?: string;
  control: Control<TFieldValues>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
const ControllInput = <TFieldValues extends FieldValues>({
  control,
  label,
  name,
  type,
  placeholder,
  className,
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Input
            {...field}
            type={type}
            value={field.value}
            label={label ?? ""}
            error={{
              status: !!fieldState.error,
              message: fieldState.error?.message as string,
            }}
            placeholder={placeholder}
            className={className}
          />
        </>
      )}
    />
  );
};

export default ControllInput;
