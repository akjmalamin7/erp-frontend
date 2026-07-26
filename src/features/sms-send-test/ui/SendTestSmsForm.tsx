import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useSendSmsMutation } from "@/entities/sms";
import {
  sendTestSmsSchema,
  type SendTestSmsFormValues,
} from "@/features/sms-send-test/model/schema";

export default function SendTestSmsForm() {
  const [sendSms, { isLoading: sending }] = useSendSmsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendTestSmsFormValues>({
    resolver: yupResolver(sendTestSmsSchema),
    defaultValues: { to: "", message: "" },
  });

  const onSubmit = async (values: SendTestSmsFormValues) => {
    try {
      await sendSms(values).unwrap();
      toast.success("Test SMS sent");
      reset();
    } catch {
      toast.error("Couldn't send SMS");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-5" noValidate>
      <h3 className="text-sm font-bold text-ink-900">Send a test message</h3>
      <div>
        <label className="label">Phone number</label>
        <input className="input" {...register("to")} />
        {errors.to && <p className="mt-1 text-xs text-red-600">{errors.to.message}</p>}
      </div>
      <div>
        <label className="label">Message</label>
        <textarea className="input" rows={4} {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={sending} className="btn-primary w-full">Send test SMS</button>
    </form>
  );
}
