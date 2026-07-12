import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  useCreateExpenseMutation,
  useCreateInvestmentMutation,
  useCreateLoanMutation,
  useCreateSalaryMutation,
} from "@/services/accountsApi";
import PageHeader from "@/components/PageHeader";

type Tab = "expense" | "investment" | "loan" | "salary";

const tabs: { key: Tab; label: string }[] = [
  { key: "expense", label: "Expense" },
  { key: "investment", label: "Investment" },
  { key: "loan", label: "Loan" },
  { key: "salary", label: "Salary" },
];

export default function AccountsPage() {
  const [tab, setTab] = useState<Tab>("expense");
  const [createExpense, { isLoading: savingExpense }] = useCreateExpenseMutation();
  const [createInvestment, { isLoading: savingInvestment }] = useCreateInvestmentMutation();
  const [createLoan, { isLoading: savingLoan }] = useCreateLoanMutation();
  const [createSalary, { isLoading: savingSalary }] = useCreateSalaryMutation();

  const [expenseForm, setExpenseForm] = useState({ title: "", amount: "", category: "", note: "" });
  const [investmentForm, setInvestmentForm] = useState({ investor_name: "", amount: "", note: "" });
  const [loanForm, setLoanForm] = useState({ employee_id: "", amount: "" });
  const [salaryForm, setSalaryForm] = useState({ employee_id: "", amount: "", month: "" });

  const submitExpense = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createExpense({ ...expenseForm, amount: Number(expenseForm.amount) }).unwrap();
      toast.success("Expense recorded");
      setExpenseForm({ title: "", amount: "", category: "", note: "" });
    } catch {
      toast.error("Couldn't record expense");
    }
  };

  const submitInvestment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createInvestment({ ...investmentForm, amount: Number(investmentForm.amount) }).unwrap();
      toast.success("Investment recorded");
      setInvestmentForm({ investor_name: "", amount: "", note: "" });
    } catch {
      toast.error("Couldn't record investment");
    }
  };

  const submitLoan = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createLoan({ ...loanForm, amount: Number(loanForm.amount) }).unwrap();
      toast.success("Loan recorded");
      setLoanForm({ employee_id: "", amount: "" });
    } catch {
      toast.error("Couldn't record loan");
    }
  };

  const submitSalary = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createSalary({ ...salaryForm, amount: Number(salaryForm.amount) }).unwrap();
      toast.success("Salary recorded");
      setSalaryForm({ employee_id: "", amount: "", month: "" });
    } catch {
      toast.error("Couldn't record salary");
    }
  };

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
        {tab === "expense" && (
          <form onSubmit={submitExpense} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input required className="input" value={expenseForm.title} onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Amount</label>
                <input required type="number" className="input" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} />
              </div>
              <div>
                <label className="label">Category</label>
                <input className="input" value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="label">Note (optional)</label>
              <textarea className="input" rows={2} value={expenseForm.note} onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })} />
            </div>
            <button type="submit" disabled={savingExpense} className="btn-accent w-full">Record expense</button>
          </form>
        )}

        {tab === "investment" && (
          <form onSubmit={submitInvestment} className="space-y-4">
            <div>
              <label className="label">Investor name</label>
              <input required className="input" value={investmentForm.investor_name} onChange={(e) => setInvestmentForm({ ...investmentForm, investor_name: e.target.value })} />
            </div>
            <div>
              <label className="label">Amount</label>
              <input required type="number" className="input" value={investmentForm.amount} onChange={(e) => setInvestmentForm({ ...investmentForm, amount: e.target.value })} />
            </div>
            <div>
              <label className="label">Note (optional)</label>
              <textarea className="input" rows={2} value={investmentForm.note} onChange={(e) => setInvestmentForm({ ...investmentForm, note: e.target.value })} />
            </div>
            <button type="submit" disabled={savingInvestment} className="btn-accent w-full">Record investment</button>
          </form>
        )}

        {tab === "loan" && (
          <form onSubmit={submitLoan} className="space-y-4">
            <div>
              <label className="label">Employee ID</label>
              <input required className="input" value={loanForm.employee_id} onChange={(e) => setLoanForm({ ...loanForm, employee_id: e.target.value })} />
            </div>
            <div>
              <label className="label">Amount</label>
              <input required type="number" className="input" value={loanForm.amount} onChange={(e) => setLoanForm({ ...loanForm, amount: e.target.value })} />
            </div>
            <button type="submit" disabled={savingLoan} className="btn-accent w-full">Record loan</button>
          </form>
        )}

        {tab === "salary" && (
          <form onSubmit={submitSalary} className="space-y-4">
            <div>
              <label className="label">Employee ID</label>
              <input required className="input" value={salaryForm.employee_id} onChange={(e) => setSalaryForm({ ...salaryForm, employee_id: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Amount</label>
                <input required type="number" className="input" value={salaryForm.amount} onChange={(e) => setSalaryForm({ ...salaryForm, amount: e.target.value })} />
              </div>
              <div>
                <label className="label">Month</label>
                <input required type="month" className="input" value={salaryForm.month} onChange={(e) => setSalaryForm({ ...salaryForm, month: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={savingSalary} className="btn-accent w-full">Process salary</button>
          </form>
        )}
      </div>
    </div>
  );
}
