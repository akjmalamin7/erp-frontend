import { useGetAllBrandsQuery } from "@/entities/brand";
import { useGetAllCategoriesQuery } from "@/entities/category";
import type { Product } from "@/entities/product";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/entities/product";
import {
  productSchema,
  type ProductFormValues,
} from "@/features/product-create/model/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const emptyValues: ProductFormValues = {
  name: "",
  sku: "",
  price: 0,
  cost_price: undefined,
  quantity: 0,
  unit: "pcs",
  category: "",
  brand: "",
};

interface ProductFormProps {
  editing: Product | null;
  onDone: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  editing,
  onDone,
  onCancel,
}: ProductFormProps) {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (editing) {
      reset({
        name: editing.name,
        sku: editing.sku ?? "",
        price: editing.price ?? 0,
        cost_price: editing.cost_price,
        quantity: editing.quantity ?? 0,
        unit: editing.unit ?? "pcs",
        category:
          typeof editing.category === "string"
            ? editing.category
            : (editing.category?._id ?? ""),
        brand:
          typeof editing.brand === "string"
            ? editing.brand
            : (editing.brand?._id ?? ""),
      });
    } else {
      reset(emptyValues);
    }
  }, [editing, reset]);

  const onSubmit = async (values: ProductFormValues) => {
    const body = {
      name: values.name,
      sku: values.sku || undefined,
      price: values.price,
      cost_price: values.cost_price,
      quantity: values.quantity,
      unit: values.unit,
      category: values.category || undefined,
      brand: values.brand || undefined,
    };
    try {
      if (editing) {
        await updateProduct({ id: editing._id, body }).unwrap();
        toast.success("Product updated");
      } else {
        await createProduct(body).unwrap();
        toast.success("Product created");
      }
      onDone();
    } catch {
      toast.error("Couldn't save the product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label">Name</label>
        <input className="input" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="label">SKU (optional)</label>
        <input className="input" {...register("sku")} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Price</label>
          <input
            type="number"
            step="any"
            className="input"
            {...register("price")}
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="label">Cost price (optional)</label>
          <input
            type="number"
            step="any"
            className="input"
            {...register("cost_price")}
          />
          {errors.cost_price && (
            <p className="mt-1 text-xs text-red-600">
              {errors.cost_price.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Quantity</label>
          <input type="number" className="input" {...register("quantity")} />
          {errors.quantity && (
            <p className="mt-1 text-xs text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>
        <div>
          <label className="label">Unit</label>
          <input className="input" {...register("unit")} />
          {errors.unit && (
            <p className="mt-1 text-xs text-red-600">{errors.unit.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Category</label>
          <select className="input" {...register("category")}>
            <option value="">— None —</option>
            {(categories?.data ?? []).map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Brand</label>
          <select className="input" {...register("brand")}>
            <option value="">— None —</option>
            {(brands?.data ?? []).map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={creating || updating}
          className="btn-accent"
        >
          {editing ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
