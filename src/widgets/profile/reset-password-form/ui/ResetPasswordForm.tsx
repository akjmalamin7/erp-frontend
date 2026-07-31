import { ResetPasswordSchemaType } from "@/entities/user/model/schema";
import { SelectUser } from "@/features/select-user";
import ControllPassword from "@/shared/ui/password/ui/ControllPassword";
import { useFormContext } from "react-hook-form";

const ResetPasswordForm = () => {
  const form = useFormContext<ResetPasswordSchemaType>();
  const { control } = form;
  return (
    <div className="flex flex-col gap-4">
      <SelectUser control={control as any} name="id" label="User" />
      <ControllPassword
        label="Reset Password"
        name="password"
        control={control}
      />
    </div>
  );
};

export default ResetPasswordForm;
