import { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import TextArea from "./Textarea";

interface IProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string | ReactNode;
  placeholder?: string;
  className?: string;
  rows?: number;
}

const ControllTextArea = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  rows = 4,
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextArea
          {...field}
          label={label}
          placeholder={placeholder}
          rows={rows}
          className={className}
          error={{
            status: !!fieldState.error,
            message: fieldState.error?.message,
          }}
        />
      )}
    />
  );
};

export default ControllTextArea;
