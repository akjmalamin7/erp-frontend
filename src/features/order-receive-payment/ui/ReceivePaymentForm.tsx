import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useReceiveOrderPaymentMutation } from "@/entities/order";
import type { Order } from "@/entities/order";
import {
  receivePaymentSchema,
  type ReceivePaymentFormValues,
} from "@/features/order-receive-payment/model/schema";

interface ReceivePaymentFormProps {
  order: Order;
  onDone: () => void;
  onCancel: () => void;
}

export default function ReceivePaymentForm({ order, onDone, onCancel }: ReceivePaymentFormProps) {
  const [receivePayment, { isLoading: paying }] = useReceiveOrderPaymentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReceivePaymentFormValues>({
    resolver: yupResolver(receivePaymentSchema),
    defaultValues: { amount: 0 },
  });

  const onSubmit = async (values: ReceivePaymentFormValues) => {
    try {
      await receivePayment({ order_id: order._id, amount: values.amount }).unwrap();
      toast.success("Payment recorded");
      onDone();
    } catch {
      toast.error("Couldn't record payment");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="text-sm text-slate-500">
        Order total <strong className="font-mono">৳ {order.total_amount?.toLocaleString()}</strong>, already
        paid <strong className="font-mono">৳ {order.paid_amount?.toLocaleString()}</strong>.
      </p>
      <div>
        <label className="label">Amount received</label>
        <input
          type="number"
          step="any"
          className="input"
          {...register("amount")}
        />
        {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-accent" disabled={paying}>Record payment</button>
      </div>
    </form>
  );
}
