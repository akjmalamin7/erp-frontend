import { useState } from "react";
import { PageHeader } from "@/shared/ui";
import ExpenseForm from "@/features/account-entry-create/ui/ExpenseForm";
import InvestmentForm from "@/features/account-entry-create/ui/InvestmentForm";
import LoanForm from "@/features/account-entry-create/ui/LoanForm";
import SalaryForm from "@/features/account-entry-create/ui/SalaryForm";

type Tab = "expense" | "investment" | "loan" | "salary";

const tabs: { key: Tab; label: string }[] = [
  { key: "expense", label: "Expense" },
  { key: "investment", label: "Investment" },
  { key: "loan", label: "Loan" },
  { key: "salary", label: "Salary" },
];

export default function AccountsPage() {
  const [tab, setTab] = useState<Tab>("expense");

  return (
    <div>
      <PageHeader title="Accounts" description="Record expenses, investments, loans, and payroll." />

      <div className="mb-5 flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.key ? "bg-white text-ink-900 shadow-sm" : "text-slate-500 hover:text-ink-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card max-w-lg p-5">
        {tab === "expense" && <ExpenseForm />}
        {tab === "investment" && <InvestmentForm />}
        {tab === "loan" && <LoanForm />}
        {tab === "salary" && <SalaryForm />}
      </div>
    </div>
  );
}
