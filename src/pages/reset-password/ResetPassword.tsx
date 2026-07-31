import { useResetUserPasswordMutation } from "@/entities/user";
import { resetPasswordSchema } from "@/entities/user/model/schema";
import { PageHeader } from "@/shared/ui";
import Button from "@/shared/ui/button/Button";
import { Container } from "@/shared/ui/container";
import { ResetPasswordForm } from "@/widgets/profile/reset-password-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetUserPasswordMutation();
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword({
        id: data.id,
        body: { password: data.password },
      }).unwrap();

      toast.success(
        "Password reset successful. User must change it on next login.",
      );
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  });
  return (
    <Container size="sm">
      <PageHeader
        title="Reset Password"
        description="Manage your account settings and permissions"
      />
      <div className="card p-4">
        <FormProvider {...form}>
          <ResetPasswordForm />
        </FormProvider>
        <div className="mt-4">
          <Button
            size="md"
            onClick={onSubmit}
            disabled={isLoading || !isDirty || !isValid}
          >
            {isLoading ? "Resetting..." : "Reset"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
