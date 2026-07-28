import { useUpdatePasswordMutation } from "@/features/password-update/api/passwordUpdateApi";
import {
  passwordUpdateSchema,
  type PasswordUpdateFormValues,
} from "@/features/password-update/model/schema";
import Button from "@/shared/ui/button/Button";
import ControllPassword from "@/shared/ui/password/ui/ControllPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function PasswordUpdateForm() {
  const [updatePassword, { isLoading: changing }] = useUpdatePasswordMutation();

  const form = useForm<PasswordUpdateFormValues>({
    resolver: yupResolver(passwordUpdateSchema),
    defaultValues: { old_password: "", new_password: "" },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form;
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
    <div className="card space-y-4 p-5">
      <FormProvider {...form}>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-ink-900">Change password</h3>

          <ControllPassword
            label="Current Password"
            name="old_password"
            control={control}
          />
          <ControllPassword
            label="New Password"
            name="new_password"
            control={control}
          />
        </div>
      </FormProvider>
      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={changing || !isDirty}
        variant="accent"
        className="w-full"
      >
        {changing ? "Updating..." : " Update password"}
      </Button>
    </div>
  );
}
