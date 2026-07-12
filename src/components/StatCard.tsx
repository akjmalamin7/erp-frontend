import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: "brass" | "sea" | "ink" | "red";
  hint?: string;
}

const accentMap = {
  brass: "bg-brass-100 text-brass-700",
  sea: "bg-sea-500/10 text-sea-600",
  ink: "bg-ink-900/5 text-ink-900",
  red: "bg-red-100 text-red-600",
};

export default function StatCard({ label, value, icon: Icon, accent = "ink", hint }: StatCardProps) {
  return (
    <div className="card flex items-start justify-between p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-2 font-mono text-2xl font-semibold text-ink-900">{value}</p>
        {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      </div>
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accentMap[accent]}`}>
        <Icon size={20} strokeWidth={2.2} />
      </div>
    </div>
  );
}
