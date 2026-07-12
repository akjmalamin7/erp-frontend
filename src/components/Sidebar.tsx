import { NavLink } from "react-router-dom";
import { Boxes, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { mobileSidebarClosed } from "@/app/uiSlice";
import { navItems } from "@/routes/navConfig";

export default function Sidebar() {
  const user = useAppSelector((s) => s.auth.user);
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.mobileSidebarOpen);
  const dispatch = useAppDispatch();

  if (!user) return null;

  const visibleItems = navItems.filter((item) => {
    if (item.roles && !item.roles.includes(user.role)) return false;
    if (user.role !== "employee") return true;
    return user.allowedMenus?.includes(item.menu);
  });

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-950/50 lg:hidden"
          onClick={() => dispatch(mobileSidebarClosed())}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-ink-900 text-slate-300 transition-all duration-200 lg:sticky lg:top-0 lg:h-screen
        ${collapsed ? "lg:w-[76px]" : "lg:w-[248px]"}
        ${mobileOpen ? "w-[248px] translate-x-0" : "w-[248px] -translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brass-500 text-ink-950">
              <Boxes size={18} strokeWidth={2.5} />
            </div>
            {!collapsed && (
              <div className="truncate">
                <p className="font-display text-sm font-bold text-white">AZM ERP</p>
                <p className="text-[11px] text-slate-400">Admin Console</p>
              </div>
            )}
          </div>
          <button
            className="text-slate-400 hover:text-white lg:hidden"
            onClick={() => dispatch(mobileSidebarClosed())}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {visibleItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => dispatch(mobileSidebarClosed())}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={18} strokeWidth={2} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {!collapsed && (
          <div className="border-t border-white/10 p-4">
            <p className="text-[11px] text-slate-500">
              Signed in as <span className="text-slate-300">{user.role.replace("_", " ")}</span>
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
