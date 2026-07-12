import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useGetSmsIntegrationQuery, useUpdateSmsIntegrationMutation, useSendSmsMutation } from "@/services/smsApi";
import PageHeader from "@/components/PageHeader";
import Loader from "@/components/Loader";

export default function SmsSettingsPage() {
  const { data, isLoading } = useGetSmsIntegrationQuery();
  const [updateIntegration, { isLoading: saving }] = useUpdateSmsIntegrationMutation();
  const [sendSms, { isLoading: sending }] = useSendSmsMutation();

  const [form, setForm] = useState({ provider: "", api_key: "", sender_id: "", enabled: false });
  const [testForm, setTestForm] = useState({ to: "", message: "" });

  useEffect(() => {
    if (data?.data) {
      setForm({
        provider: data.data.provider ?? "",
        api_key: data.data.api_key ?? "",
        sender_id: data.data.sender_id ?? "",
        enabled: data.data.enabled ?? false,
      });
    }
  }, [data]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateIntegration(form).unwrap();
      toast.success("SMS settings saved");
    } catch {
      toast.error("Couldn't save SMS settings");
    }
  };

  const handleSendTest = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendSms(testForm).unwrap();
      toast.success("Test SMS sent");
      setTestForm({ to: "", message: "" });
    } catch {
      toast.error("Couldn't send SMS");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader title="SMS settings" description="Connect your SMS gateway for order and payment notifications." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <form onSubmit={handleSave} className="card space-y-4 p-5">
          <h3 className="text-sm font-bold text-ink-900">Gateway configuration</h3>
          <div>
            <label className="label">Provider</label>
            <input className="input" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} />
          </div>
          <div>
            <label className="label">API key</label>
            <input className="input" value={form.api_key} onChange={(e) => setForm({ ...form, api_key: e.target.value })} />
          </div>
          <div>
            <label className="label">Sender ID</label>
            <input className="input" value={form.sender_id} onChange={(e) => setForm({ ...form, sender_id: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300"
            />
            Enable SMS notifications
          </label>
          <button type="submit" disabled={saving} className="btn-accent w-full">Save settings</button>
        </form>

        <form onSubmit={handleSendTest} className="card space-y-4 p-5">
          <h3 className="text-sm font-bold text-ink-900">Send a test message</h3>
          <div>
            <label className="label">Phone number</label>
            <input required className="input" value={testForm.to} onChange={(e) => setTestForm({ ...testForm, to: e.target.value })} />
          </div>
          <div>
            <label className="label">Message</label>
            <textarea required className="input" rows={4} value={testForm.message} onChange={(e) => setTestForm({ ...testForm, message: e.target.value })} />
          </div>
          <button type="submit" disabled={sending} className="btn-primary w-full">Send test SMS</button>
        </form>
      </div>
    </div>
  );
}
