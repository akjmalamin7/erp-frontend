import type { ChangeEvent, ReactNode } from "react";

export interface SelectOption {
  name: string;
  value: string | number;
}

export interface SelectProps {
  label?: string | ReactNode;
  name?: string;
  value?: string | number;
  options: SelectOption[];
  error?: { status?: boolean; message?: string };
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  name,
  value,
  options = [],
  error,
  placeholder = "Choose One",
  disabled,
  onChange,
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="input"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="bg-gray-900 text-white"
          >
            {option.name}
          </option>
        ))}
      </select>
      {error?.status && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default Select;
