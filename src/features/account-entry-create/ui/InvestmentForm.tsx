import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useCreateInvestmentMutation } from "@/entities/account";
import { investmentSchema, type InvestmentFormValues } from "@/features/account-entry-create/model/schema";

export default function InvestmentForm() {
  const [createInvestment, { isLoading: saving }] = useCreateInvestmentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvestmentFormValues>({
    resolver: yupResolver(investmentSchema),
    defaultValues: { investor_name: "", amount: 0, note: "" },
  });

  const onSubmit = async (values: InvestmentFormValues) => {
    try {
      await createInvestment(values).unwrap();
      toast.success("Investment recorded");
      reset();
    } catch {
      toast.error("Couldn't record investment");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Investor name</label>
        <input className="input" {...register("investor_name")} />
        {errors.investor_name && <p className="mt-1 text-xs text-red-600">{errors.investor_name.message}</p>}
      </div>
      <div>
        <label className="label">Amount</label>
        <input type="number" step="any" className="input" {...register("amount")} />
        {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>}
      </div>
      <div>
        <label className="label">Note (optional)</label>
        <textarea className="input" rows={2} {...register("note")} />
      </div>
      <button type="submit" disabled={saving} className="btn-accent w-full">Record investment</button>
    </form>
  );
}
