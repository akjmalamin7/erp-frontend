import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
        <Compass size={26} />
      </div>
      <h1 className="font-display text-xl font-bold text-ink-900">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary mt-2">Back to dashboard</Link>
    </div>
  );
}
