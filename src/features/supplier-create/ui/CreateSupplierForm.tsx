import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useCreateSupplierMutation } from "@/entities/supplier";
import type { Supplier } from "@/entities/supplier";
import {
  createSupplierSchema,
  type CreateSupplierFormValues,
} from "@/features/supplier-create/model/schema";

interface CreateSupplierFormProps {
  onCreated: (supplier: Supplier) => void;
  onCancel: () => void;
}

export default function CreateSupplierForm({ onCreated, onCancel }: CreateSupplierFormProps) {
  const [createSupplier, { isLoading: creating }] = useCreateSupplierMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSupplierFormValues>({
    resolver: yupResolver(createSupplierSchema),
    defaultValues: { name: "", phone: "", email: "", address: "" },
  });

  const onSubmit = async (values: CreateSupplierFormValues) => {
    try {
      const res = await createSupplier(values).unwrap();
      toast.success("Supplier added");
      onCreated(res.data);
    } catch {
      toast.error("Couldn't add supplier");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Company / contact name</label>
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
        <button type="button" className="btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" disabled={creating} className="btn-accent">Save supplier</button>
      </div>
    </form>
  );
}
