import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useCreateExpenseMutation } from "@/entities/account";
import { expenseSchema, type ExpenseFormValues } from "@/features/account-entry-create/model/schema";

export default function ExpenseForm() {
  const [createExpense, { isLoading: saving }] = useCreateExpenseMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: yupResolver(expenseSchema),
    defaultValues: { title: "", amount: 0, category: "", note: "" },
  });

  const onSubmit = async (values: ExpenseFormValues) => {
    try {
      await createExpense(values).unwrap();
      toast.success("Expense recorded");
      reset();
    } catch {
      toast.error("Couldn't record expense");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Title</label>
        <input className="input" {...register("title")} />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Amount</label>
          <input type="number" step="any" className="input" {...register("amount")} />
          {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>}
        </div>
        <div>
          <label className="label">Category</label>
          <input className="input" {...register("category")} />
        </div>
      </div>
      <div>
        <label className="label">Note (optional)</label>
        <textarea className="input" rows={2} {...register("note")} />
      </div>
      <button type="submit" disabled={saving} className="btn-accent w-full">Record expense</button>
    </form>
  );
}
