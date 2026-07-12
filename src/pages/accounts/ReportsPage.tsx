import { useGetDashboardQuery } from "@/services/dashboardApi";
import { useGetSalaryReportQuery } from "@/services/accountsApi";
import PageHeader from "@/components/PageHeader";
import Loader from "@/components/Loader";
import { ErrorState, EmptyState } from "@/components/States";
import SalesPieChart from "@/components/charts/SalesPieChart";

export default function ReportsPage() {
  const { data: dashboard, isLoading, isError } = useGetDashboardQuery();
  const { data: salaryReport } = useGetSalaryReportQuery();

  if (isLoading) return <Loader />;
  if (isError || !dashboard) return <ErrorState />;

  const stats = dashboard.data;
  const salaryTotal = (salaryReport?.data ?? []).reduce((sum, s) => sum + (s.amount ?? 0), 0);

  const breakdown = [
    { name: "Today's sales", value: stats.today_sales },
    { name: "This month (excl. today)", value: Math.max(stats.monthly_sales - stats.today_sales, 0) },
    { name: "Payroll this period", value: salaryTotal },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <PageHeader title="Sales report" description="A snapshot of revenue and payroll for the current period." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900">Revenue vs. payroll</h3>
          <p className="text-xs text-slate-500">Where money moved this period</p>
          <div className="mt-3">
            {breakdown.length > 0 ? (
              <SalesPieChart data={breakdown} valuePrefix="৳ " />
            ) : (
              <EmptyState title="No activity recorded yet" />
            )}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900">Key figures</h3>
          <dl className="mt-3 divide-y divide-slate-100 text-sm">
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Yearly sales</dt>
              <dd className="font-mono font-semibold">৳ {stats.yearly_sales.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Monthly sales</dt>
              <dd className="font-mono font-semibold">৳ {stats.monthly_sales.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Today's sales</dt>
              <dd className="font-mono font-semibold">৳ {stats.today_sales.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Payroll processed</dt>
              <dd className="font-mono font-semibold">৳ {salaryTotal.toLocaleString()}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
