import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useCreateSalaryMutation } from "@/entities/account";
import { salarySchema, type SalaryFormValues } from "@/features/account-entry-create/model/schema";

export default function SalaryForm() {
  const [createSalary, { isLoading: saving }] = useCreateSalaryMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SalaryFormValues>({
    resolver: yupResolver(salarySchema),
    defaultValues: { employee_id: "", amount: 0, month: "" },
  });

  const onSubmit = async (values: SalaryFormValues) => {
    try {
      await createSalary(values).unwrap();
      toast.success("Salary recorded");
      reset();
    } catch {
      toast.error("Couldn't record salary");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Employee ID</label>
        <input className="input" {...register("employee_id")} />
        {errors.employee_id && <p className="mt-1 text-xs text-red-600">{errors.employee_id.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Amount</label>
          <input type="number" step="any" className="input" {...register("amount")} />
          {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>}
        </div>
        <div>
          <label className="label">Month</label>
          <input type="month" className="input" {...register("month")} />
          {errors.month && <p className="mt-1 text-xs text-red-600">{errors.month.message}</p>}
        </div>
      </div>
      <button type="submit" disabled={saving} className="btn-accent w-full">Process salary</button>
    </form>
  );
}
