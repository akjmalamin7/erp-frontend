import type { LucideIcon } from "lucide-react";
import { Inbox, AlertCircle } from "lucide-react";

export function EmptyState({
  title = "Nothing here yet",
  description,
  icon: Icon = Inbox,
}: {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
        <Icon size={22} />
      </div>
      <p className="text-sm font-semibold text-ink-800">{title}</p>
      {description && <p className="max-w-sm text-xs text-slate-500">{description}</p>}
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-12 text-center">
      <AlertCircle size={22} className="text-red-500" />
      <p className="text-sm font-semibold text-red-700">Couldn&apos;t load this data</p>
      <p className="max-w-sm text-xs text-red-500">
        {message ?? "Check that the AZM-ERP backend is running and reachable."}
      </p>
    </div>
  );
}
