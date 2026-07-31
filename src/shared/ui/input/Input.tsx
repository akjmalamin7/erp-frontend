import React, { ReactNode } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string | ReactNode;
  name?: string;
  type?:
    | "text"
    | "email"
    | "date"
    | "password"
    | "number"
    | "file"
    | "hidden"
    | "checkbox";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: { status: boolean; message: string };
}
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    { name, label, type = "text", onChange, placeholder, error, ...props },
    ref,
  ) => {
    const { value, className } =
      props as React.InputHTMLAttributes<HTMLInputElement>;
    return (
      <div>
        {label && <label className="label">{label}</label>}
        <input
          type={type ?? "text"}
          ref={ref}
          className={`input ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error?.status && (
          <p className="text-xs text-red-600">{error.message}</p>
        )}
      </div>
    );
  },
);

export default Input;
