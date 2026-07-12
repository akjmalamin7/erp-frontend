import { Outlet } from "react-router-dom";
import { Boxes } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-900 p-12 text-white lg:flex">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-sea-500/20 blur-3xl" />
        <div className="relative flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-brass-500 text-ink-950">
            <Boxes size={20} strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-bold">AZM ERP</span>
        </div>
        <div className="relative max-w-md">
          <p className="font-display text-3xl font-bold leading-tight">
            One ledger. Every warehouse, till, and payroll run — in sync.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Inventory, sales, accounts, and staff performance in a single
            console, with access tuned to every role from cashier to owner.
          </p>
        </div>
        <p className="relative text-xs text-slate-500">
          &copy; {new Date().getFullYear()} AZM Group. All rights reserved.
        </p>
      </div>
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <Outlet />
      </div>
    </div>
  );
}
