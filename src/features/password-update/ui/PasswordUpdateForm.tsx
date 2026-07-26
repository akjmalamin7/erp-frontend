import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useUpdatePasswordMutation } from "@/features/password-update/api/passwordUpdateApi";
import {
  passwordUpdateSchema,
  type PasswordUpdateFormValues,
} from "@/features/password-update/model/schema";

export default function PasswordUpdateForm() {
  const [updatePassword, { isLoading: changing }] = useUpdatePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordUpdateFormValues>({
    resolver: yupResolver(passwordUpdateSchema),
    defaultValues: { old_password: "", new_password: "" },
  });

  const onSubmit = async (values: PasswordUpdateFormValues) => {
    try {
      await updatePassword(values).unwrap();
      toast.success("Password updated");
      reset();
    } catch {
      toast.error("Couldn't update password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-5" noValidate>
      <h3 className="text-sm font-bold text-ink-900">Change password</h3>
      <div>
        <label className="label">Current password</label>
        <input type="password" className="input" {...register("old_password")} />
        {errors.old_password && <p className="mt-1 text-xs text-red-600">{errors.old_password.message}</p>}
      </div>
      <div>
        <label className="label">New password</label>
        <input type="password" className="input" {...register("new_password")} />
        {errors.new_password && <p className="mt-1 text-xs text-red-600">{errors.new_password.message}</p>}
      </div>
      <button type="submit" disabled={changing} className="btn-accent w-full">Update password</button>
    </form>
  );
}
