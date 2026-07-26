import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "accent" | "ghost" | "outline" | "danger" | "close";
  children?: ReactNode;
  loading?: boolean;
}

const buttonSizes = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-base",
  xl: "h-11 px-6 text-base",
};

const buttonVariants = {
  primary: "btn-primary",
  accent: "btn-accent",
  danger: "btn-danger",
  ghost: "btn-ghost",
  outline: "btn-outline",
  close: "btn-close px-[8px]!",
};

const Button = ({
  size = "sm",
  variant = "accent",
  children,
  loading = false,
  className = "",
  disabled,
  type = "button",
  ...props
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        lg:cursor-pointer
        inline-flex items-center justify-center gap-2
        ${buttonSizes[size]}
        ${buttonVariants[variant]}
        disabled:pointer-events-none disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
};

export default Button;
