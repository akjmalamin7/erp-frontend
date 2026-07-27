import { ReactNode } from "react";

export interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioGroupProps {
  label?: string | ReactNode;
  name: string;
  options: RadioOption[];
  value?: string | number;
  onChange?: (value: string) => void;
  error?: { status?: boolean; message?: string };
  disabled?: boolean;
}

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  disabled,
}: RadioGroupProps) => {
  return (
    <div className="w-full">
      {label && <label className="label mb-1">{label}</label>}

      <div className="flex gap-4 items-center mt-1">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={disabled}
              onChange={(e) => onChange?.(e.target.value)}
              className="radio radio-primary radio-sm"
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
      </div>

      {error?.status && (
        <p className="text-xs text-red-600 mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default RadioGroup;
