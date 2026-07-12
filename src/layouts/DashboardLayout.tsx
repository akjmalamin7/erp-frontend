import { Outlet, useMatches } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

interface RouteHandle {
  title?: string;
}

export default function DashboardLayout() {
  const matches = useMatches();
  const current = [...matches].reverse().find((m) => (m.handle as RouteHandle)?.title);
  const title = (current?.handle as RouteHandle)?.title ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar title={title} />
        <main className="flex-1 px-4 py-6 lg:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
