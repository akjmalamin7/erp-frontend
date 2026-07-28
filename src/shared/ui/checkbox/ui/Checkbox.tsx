import React, { ReactNode } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: { status?: boolean; message?: string };
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, name, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-3 cursor-pointer group w-fit">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              id={name}
              name={name}
              ref={ref}
              className={`
                peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500
                bg-ink-800 transition-all checked:border-brass-500 checked:bg-brass-500
                focus:ring-2 focus:ring-brass-500/20 outline-none ${className}
              `}
              {...props}
            />
            {/* Custom Checkmark Icon (SVG) */}
            <svg
              className="absolute h-3.5 w-3.5 text-ink-900 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {label && (
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              {label}
            </span>
          )}
        </label>

        {error?.status && (
          <p className="text-xs text-red-600 ml-8">{error.message}</p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
