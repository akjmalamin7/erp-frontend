import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, PanelLeft, LogOut, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { sidebarToggled, mobileSidebarToggled } from "@/app/uiSlice";
import { loggedOut } from "@/entities/session";

export default function Topbar({ title }: { title: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(loggedOut());
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-ink-700 hover:bg-slate-100 lg:hidden"
          onClick={() => dispatch(mobileSidebarToggled())}
        >
          <Menu size={20} />
        </button>
        <button
          className="hidden rounded-lg p-2 text-ink-700 hover:bg-slate-100 lg:inline-flex"
          onClick={() => dispatch(sidebarToggled())}
        >
          <PanelLeft size={18} />
        </button>
        <h1 className="text-lg font-bold text-ink-900">{title}</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100"
        >
          <div className="grid h-8 w-8 place-items-center rounded-full bg-ink-900 text-xs font-bold text-white">
            {user?.email?.slice(0, 2).toUpperCase() ?? "AZ"}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-ink-900">{user?.email}</p>
            <p className="text-xs capitalize text-slate-500">
              {user?.role.replace("_", " ")}
            </p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-panel">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="block w-full px-4 py-2.5 text-left text-sm text-ink-700 hover:bg-slate-50"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={15} /> Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
