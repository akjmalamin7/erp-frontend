import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useCreateBrandMutation } from "@/entities/brand";
import { nameDescriptionSchema, type NameDescriptionFormValues } from "@/shared/lib/validation";

interface BrandFormProps {
  onDone: () => void;
  onCancel: () => void;
}

export default function BrandForm({ onDone, onCancel }: BrandFormProps) {
  const [createBrand, { isLoading: creating }] = useCreateBrandMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameDescriptionFormValues>({
    resolver: yupResolver(nameDescriptionSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (values: NameDescriptionFormValues) => {
    try {
      await createBrand({ name: values.name, description: values.description || undefined }).unwrap();
      toast.success("Brand added");
      onDone();
    } catch {
      toast.error("Couldn't add brand");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Name</label>
        <input className="input" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="label">Description (optional)</label>
        <textarea className="input" rows={3} {...register("description")} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={creating} className="btn-accent">
          Save
        </button>
      </div>
    </form>
  );
}
