import React, { ReactNode } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string | ReactNode;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ name, label, onChange, placeholder, ...props }, ref) => {
    const { type, value, className } =
      props as React.InputHTMLAttributes<HTMLInputElement>;
    return (
      <div>
        <input
          type={type}
          ref={ref}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  },
);

export default Input;
