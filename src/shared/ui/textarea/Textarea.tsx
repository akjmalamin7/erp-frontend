import React, { ReactNode } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | ReactNode;
  error?: { status?: boolean; message?: string };
  className?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, name, error, placeholder, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label" htmlFor={name}>
            {label}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          className="input h-24 w-full p-2 bg-transparent rounded-md outline-none focus:border-blue-500"
          {...props}
        />
        {error?.status && (
          <p className="text-xs text-red-600 mt-1">{error.message}</p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
