import { useGetDashboardQuery } from "@/entities/dashboard";
import { useGetLowStockQuery } from "@/entities/low-stock";
import { ErrorState, Loader, PageHeader, StatCard } from "@/shared/ui";
import {
  AlertTriangle,
  CalendarClock,
  CalendarRange,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import { useAppSelector } from "@/app/hooks";
import { ImageUploader } from "@/features/image-uploader";
import RevenueAreaChart from "@/widgets/revenue-chart/ui/RevenueAreaChart";
import SalesPieChart from "@/widgets/sales-pie-chart/ui/SalesPieChart";
import { useState } from "react";

const currency = (n: number) => `৳ ${n.toLocaleString()}`;

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const user = useAppSelector((s) => s.auth.user);
  const greetingName = user?.email?.split("@")[0] ?? "there";
  const { data, isLoading, isError } = useGetDashboardQuery();
  const { data: lowStockData } = useGetLowStockQuery();

  if (isLoading) return <Loader label="Loading dashboard…" />;
  if (isError || !data) return <ErrorState />;

  const stats = data.data;

  // The single /dashboard endpoint returns snapshot totals (today / month / year),
  // not a day-by-day series, so we visualize the three horizons side by side.
  const revenueSeries = [
    { label: "Today", value: stats.today_sales },
    { label: "This month", value: stats.monthly_sales },
    { label: "This year", value: stats.yearly_sales },
  ];

  const lowStockCount = lowStockData?.data?.length ?? stats.low_stock;
  const mixData = [
    { name: "Realized (today)", value: stats.today_sales },
    {
      name: "Realized (rest of month)",
      value: Math.max(stats.monthly_sales - stats.today_sales, 0),
    },
    {
      name: "Realized (rest of year)",
      value: Math.max(stats.yearly_sales - stats.monthly_sales, 0),
    },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${greetingName}`}
        description="Here's how the business is performing right now."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today's sales"
          value={currency(stats.today_sales)}
          icon={CalendarClock}
          accent="brass"
        />
        <StatCard
          label="Monthly sales"
          value={currency(stats.monthly_sales)}
          icon={CalendarRange}
          accent="sea"
        />
        <StatCard
          label="Yearly sales"
          value={currency(stats.yearly_sales)}
          icon={Wallet}
          accent="ink"
        />
        <StatCard
          label="Today's orders"
          value={String(stats.today_orders)}
          icon={ShoppingBag}
          accent="brass"
        />
      </div>

      {lowStockCount > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle size={18} className="shrink-0" />
          <span>
            <strong>{lowStockCount}</strong> product
            {lowStockCount === 1 ? "" : "s"} running low on stock — check the
            Low Stock page to reorder in time.
          </span>
        </div>
      )}
      <div>
        <img src={url ?? ""} width={80} height={80} />
      </div>
      <ImageUploader onSelect={(value) => setUrl(value)} />

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="card p-5 xl:col-span-3">
          <h3 className="text-sm font-bold text-ink-900">Revenue by horizon</h3>
          <p className="text-xs text-slate-500">
            Today vs. this month vs. this year, paid orders only
          </p>
          <div className="mt-3">
            <RevenueAreaChart data={revenueSeries} />
          </div>
        </div>
        <div className="card p-5 xl:col-span-2">
          <h3 className="text-sm font-bold text-ink-900">Sales mix</h3>
          <p className="text-xs text-slate-500">
            Where this year&apos;s revenue was earned
          </p>
          <div className="mt-3">
            {mixData.length > 0 ? (
              <SalesPieChart data={mixData} valuePrefix="৳ " />
            ) : (
              <p className="py-16 text-center text-sm text-slate-400">
                No sales recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
