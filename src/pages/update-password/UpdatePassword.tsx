import PasswordUpdateForm from "@/features/password-update/ui/PasswordUpdateForm";
import { PageHeader } from "@/shared/ui";
import { Container } from "@/shared/ui/container";

const UpdatePassword = () => {
  return (
    <Container size="sm">
      <div>
        <PageHeader
          title="Update Password"
          description="Your account details and security settings."
        />
        <PasswordUpdateForm />
      </div>
    </Container>
  );
};

export default UpdatePassword;
