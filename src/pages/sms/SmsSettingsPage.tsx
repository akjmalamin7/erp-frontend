import { PageHeader } from "@/shared/ui";
import SmsSettingsForm from "@/features/sms-settings-edit/ui/SmsSettingsForm";
import SendTestSmsForm from "@/features/sms-send-test/ui/SendTestSmsForm";

export default function SmsSettingsPage() {
  return (
    <div>
      <PageHeader title="SMS settings" description="Connect your SMS gateway for order and payment notifications." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SmsSettingsForm />
        <SendTestSmsForm />
      </div>
    </div>
  );
}
