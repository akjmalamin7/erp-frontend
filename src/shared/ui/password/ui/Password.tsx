import { Eye, EyeOff } from "lucide-react";
import React, { ReactNode, useState } from "react";

interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: { status: boolean; message: string };
}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ name, label, placeholder, error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="w-full">
        {label && <label className="label block mb-1">{label}</label>}

        <div className="relative">
          <input
            {...props}
            ref={ref}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className={`input pr-10 ${className}`}
          />

          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gray-700 transition-colors lg:cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={2} />
            ) : (
              <Eye size={18} strokeWidth={2} />
            )}
          </button>
        </div>

        {error?.status && (
          <p className="text-xs text-red-600 mt-1">{error.message}</p>
        )}
      </div>
    );
  },
);

Password.displayName = "Password";

export default Password;
