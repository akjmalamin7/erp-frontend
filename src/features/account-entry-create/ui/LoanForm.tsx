import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useCreateLoanMutation } from "@/entities/account";
import { loanSchema, type LoanFormValues } from "@/features/account-entry-create/model/schema";

export default function LoanForm() {
  const [createLoan, { isLoading: saving }] = useCreateLoanMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanFormValues>({
    resolver: yupResolver(loanSchema),
    defaultValues: { employee_id: "", amount: 0 },
  });

  const onSubmit = async (values: LoanFormValues) => {
    try {
      await createLoan(values).unwrap();
      toast.success("Loan recorded");
      reset();
    } catch {
      toast.error("Couldn't record loan");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Employee ID</label>
        <input className="input" {...register("employee_id")} />
        {errors.employee_id && <p className="mt-1 text-xs text-red-600">{errors.employee_id.message}</p>}
      </div>
      <div>
        <label className="label">Amount</label>
        <input type="number" step="any" className="input" {...register("amount")} />
        {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>}
      </div>
      <button type="submit" disabled={saving} className="btn-accent w-full">Record loan</button>
    </form>
  );
}
