import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useCreateCustomerMutation } from "@/entities/customer";
import {
  createCustomerSchema,
  type CreateCustomerFormValues,
} from "@/features/customer-create/model/schema";

interface CreateCustomerFormProps {
  onDone: () => void;
  onCancel: () => void;
}

export default function CreateCustomerForm({ onDone, onCancel }: CreateCustomerFormProps) {
  const [createCustomer, { isLoading: creating }] = useCreateCustomerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormValues>({
    resolver: yupResolver(createCustomerSchema),
    defaultValues: { name: "", phone: "", email: "", address: "" },
  });

  const onSubmit = async (values: CreateCustomerFormValues) => {
    try {
      await createCustomer(values).unwrap();
      toast.success("Customer added");
      onDone();
    } catch {
      toast.error("Couldn't add customer");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Full name</label>
        <input className="input" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="label">Phone</label>
        <input className="input" {...register("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="label">Email (optional)</label>
        <input type="email" className="input" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label className="label">Address (optional)</label>
        <textarea className="input" rows={2} {...register("address")} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={creating} className="btn-accent">
          Save customer
        </button>
      </div>
    </form>
  );
}
