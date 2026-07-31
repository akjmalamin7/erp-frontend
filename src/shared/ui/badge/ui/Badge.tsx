import React from "react";

type BadgeVariant =
  | "success"
  | "completed"
  | "paid"
  | "confirmed"
  | "active"
  | "pending"
  | "partial"
  | "warning"
  | "danger"
  | "cancelled"
  | "unpaid"
  | "error"
  | "info"
  | "processing"
  | "in_progress"
  | "fulfillment"
  | "inactive";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "info",
  className = "",
}) => {
  // স্ট্যাটাস অনুযায়ী কালার কনফিগারেশন
  const variantClasses: Record<BadgeVariant, string> = {
    // Greenish (Positive)
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    paid: "bg-green-500/10 text-green-500 border-green-500/20",
    confirmed: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",

    // Yellow/Orange (Waiting/Caution)
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    partial: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",

    // Reddish (Negative/Danger)
    danger: "bg-red-500/10 text-red-500 border-red-500/20",
    cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    unpaid: "bg-red-500/10 text-red-500 border-red-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
    inactive: "bg-slate-500/10 text-slate-500 border-slate-500/20",

    // Blue/Indigo (Information/Process)
    info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    processing: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    in_progress: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    fulfillment: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-2.5 py-0.5 rounded-md
        text-[11px] font-bold uppercase tracking-wider
        border
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
