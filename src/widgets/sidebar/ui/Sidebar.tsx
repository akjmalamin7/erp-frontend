import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { mobileSidebarClosed } from "@/app/uiSlice";
import { navItems } from "@/widgets/sidebar/config/navConfig";
import { Boxes, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const user = useAppSelector((s) => s.auth.user);
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.mobileSidebarOpen);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  if (!user) return null;

  // বর্তমান পেজ অনুযায়ী প্যারেন্ট মেনু অটো ওপেন রাখা
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((child) => location.pathname === child.path)) {
        if (!openMenus.includes(item.label)) {
          setOpenMenus((prev) => [...prev, item.label]);
        }
      }
    });
  }, [location.pathname]);

  // মেইন ক্লিক হ্যান্ডলার (রুট চেঞ্জ + টগল)
  const handleItemClick = (label: string, hasChildren: boolean) => {
    if (hasChildren && !collapsed) {
      setOpenMenus((prev) =>
        prev.includes(label)
          ? prev.filter((i) => i !== label)
          : [...prev, label],
      );
    }
    dispatch(mobileSidebarClosed());
  };

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
        ${collapsed ? "lg:w-19" : "lg:w-62"}
        ${mobileOpen ? "w-62 translate-x-0" : "w-62 -translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brass-500 text-ink-950">
              <Boxes size={18} strokeWidth={2.5} />
            </div>
            {!collapsed && (
              <p className="font-display text-sm font-bold text-white uppercase">
                AZM ERP
              </p>
            )}
          </div>
          <button
            className="lg:hidden"
            onClick={() => dispatch(mobileSidebarClosed())}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {visibleItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openMenus.includes(item.label);

              return (
                <li key={item.path}>
                  {/* মেইন লিংক (Route Change + Toggle Action) */}
                  <NavLink
                    to={item.path}
                    onClick={() => handleItemClick(item.label, !!hasChildren)}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} strokeWidth={2} />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>

                    {/* অ্যারো আইকন */}
                    {hasChildren && !collapsed && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </NavLink>

                  {/* চাইল্ড মেনু রেন্ডারিং */}
                  {!collapsed && hasChildren && isOpen && (
                    <ul className="mt-1 ml-4 border-l border-white/10 pl-2 space-y-1">
                      {item.children!.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            onClick={() => dispatch(mobileSidebarClosed())}
                            className={({ isActive }) =>
                              `flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                                isActive
                                  ? "text-white bg-white/5"
                                  : "text-slate-500 hover:text-white"
                              }`
                            }
                          >
                            <child.icon size={14} strokeWidth={2} />
                            <span>{child.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
