import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useGetSmsIntegrationQuery, useUpdateSmsIntegrationMutation } from "@/entities/sms";
import {
  smsSettingsSchema,
  type SmsSettingsFormValues,
} from "@/features/sms-settings-edit/model/schema";

export default function SmsSettingsForm() {
  const { data, isLoading } = useGetSmsIntegrationQuery();
  const [updateIntegration, { isLoading: saving }] = useUpdateSmsIntegrationMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SmsSettingsFormValues>({
    resolver: yupResolver(smsSettingsSchema),
    defaultValues: { provider: "", api_key: "", sender_id: "", enabled: false },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        provider: data.data.provider ?? "",
        api_key: data.data.api_key ?? "",
        sender_id: data.data.sender_id ?? "",
        enabled: data.data.enabled ?? false,
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: SmsSettingsFormValues) => {
    try {
      await updateIntegration(values).unwrap();
      toast.success("SMS settings saved");
    } catch {
      toast.error("Couldn't save SMS settings");
    }
  };

  if (isLoading) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-5" noValidate>
      <h3 className="text-sm font-bold text-ink-900">Gateway configuration</h3>
      <div>
        <label className="label">Provider</label>
        <input className="input" {...register("provider")} />
      </div>
      <div>
        <label className="label">API key</label>
        <input className="input" {...register("api_key")} />
      </div>
      <div>
        <label className="label">Sender ID</label>
        <input className="input" {...register("sender_id")} />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" className="h-4 w-4 rounded border-slate-300" {...register("enabled")} />
        Enable SMS notifications
      </label>
      <button type="submit" disabled={saving} className="btn-accent w-full">Save settings</button>
    </form>
  );
}
