import { Boxes } from "lucide-react";
import LoginForm from "@/features/auth-login/ui/LoginForm";

export default function Login() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex items-center gap-2.5 lg:hidden">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900 text-brass-400">
          <Boxes size={20} strokeWidth={2.5} />
        </div>
        <span className="font-display text-lg font-bold text-ink-900">AZM ERP</span>
      </div>

      <h1 className="font-display text-2xl font-bold text-ink-900">Sign in</h1>
      <p className="mt-1 text-sm text-slate-500">
        Enter your work email and password to access the console.
      </p>

      <LoginForm />

      <p className="mt-8 text-center text-xs text-slate-400">
        Access is provisioned by your organization&apos;s super admin. Contact
        them if you need an account or a password reset.
      </p>
    </div>
  );
}
