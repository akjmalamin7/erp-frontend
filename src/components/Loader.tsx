import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
      <Loader2 className="animate-spin" size={26} />
      <p className="text-sm">{label}</p>
    </div>
  );
}
