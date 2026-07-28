import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import RadioGroup, { RadioOption } from "../radio/Radio";

interface IProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: RadioOption[];
  label?: string;
  disabled?: boolean;
}

const ControllRadio = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  label,
  disabled,
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <RadioGroup
            {...field}
            label={label}
            options={options}
            disabled={disabled}
            error={{
              status: !!fieldState.error,
              message: fieldState.error?.message,
            }}
            onChange={(val) => field.onChange(val)}
          />
        </div>
      )}
    />
  );
};

export default ControllRadio;
