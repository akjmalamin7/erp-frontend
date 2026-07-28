import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Password from "./Password";

interface IProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
}

const ControllPassword = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Password
          {...field}
          label={label}
          placeholder={placeholder}
          error={{
            status: !!fieldState.error,
            message: fieldState.error?.message as string,
          }}
        />
      )}
    />
  );
};

export default ControllPassword;
