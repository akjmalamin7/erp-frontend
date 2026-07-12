import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-red-100 text-red-600">
        <ShieldAlert size={26} />
      </div>
      <h1 className="font-display text-xl font-bold text-ink-900">Access restricted</h1>
      <p className="max-w-sm text-sm text-slate-500">
        Your account role doesn&apos;t have permission to view this page. Contact
        your admin if you think this is a mistake.
      </p>
      <Link to="/" className="btn-primary mt-2">Back to dashboard</Link>
    </div>
  );
}
