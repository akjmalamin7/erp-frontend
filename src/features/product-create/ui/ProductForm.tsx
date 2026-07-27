import { useGetAllBrandsQuery } from "@/entities/brand";
import { useGetAllCategoriesQuery } from "@/entities/category";
import type { Product } from "@/entities/product";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/entities/product";
import { ImageUploader } from "@/features/image-uploader";
import {
  productSchema,
  type ProductFormValues,
} from "@/features/product-create/model/schema";
import { BrandSelect } from "@/features/select-brand";
import CategorySelect from "@/features/select-category/ui/SelectCategory";
import { Modal } from "@/shared/ui";
import { ControllInput } from "@/shared/ui/controll-input";
import { ControllRadio } from "@/shared/ui/controll-radio";
import { ControllSelect } from "@/shared/ui/controll-select";
import { ControllTextArea } from "@/shared/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProductFormProps {
  open?: boolean;
  editing: Product | null;
  onDone: () => void;
  onCancel: () => void;
}

const CODE_OPTIONS = ["PROD-001", "PROD-002", "PROD-003", "PROD-004"];

const emptyValues: ProductFormValues = {
  name: "",
  sku: "",
  code: "",
  price: 0,
  discount_price: 0,
  cost: 0,
  quantity: 0,
  low_stock_threshold: 0,
  description: "",
  category: "",
  brand: "",
  status: "active",
  image: "",
};

const ProductForm: React.FC<ProductFormProps> = ({
  open,
  editing,
  onDone,
  onCancel,
}) => {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const form = useForm<ProductFormValues>({
    defaultValues: emptyValues,
    resolver: yupResolver(productSchema) as any,
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { isDirty },
  } = form;

  const watchedImage = watch("image");

  const categoryOptions =
    categories?.data?.map((c) => ({ name: c.name, value: c._id })) || [];
  const brandOptions =
    brands?.data?.map((b) => ({ name: b.name, value: b._id })) || [];
  const codeOptions = CODE_OPTIONS.map((code) => ({ name: code, value: code }));

  useEffect(() => {
    if (editing) {
      reset({
        ...editing,
        sku: editing.sku ?? "",
        discount_price: editing.discount_price,
        category:
          typeof editing.category === "string"
            ? editing.category
            : ((editing.category as any)?._id ?? ""),
        brand:
          typeof editing.brand === "string"
            ? editing.brand
            : ((editing.brand as any)?._id ?? ""),
        status: editing.status ?? "active",
        image: editing.image ?? "",
      });
    } else {
      reset(emptyValues);
    }
  }, [editing, reset, open]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (editing) {
        await updateProduct({ id: editing._id, body: values }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(values).unwrap();
        toast.success("Product created successfully");
      }
      onDone();
    } catch (err) {
      toast.error("Couldn't save the product");
    }
  };

  const ModalFooter = (
    <div className="w-full flex justify-end gap-2">
      <button type="button" className="btn-outline" onClick={onCancel}>
        Cancel
      </button>
      <button
        type="button"
        disabled={creating || updating}
        className="btn-accent"
        onClick={handleSubmit(onSubmit)}
      >
        {editing ? "Save changes" : "Create product"}
      </button>
    </div>
  );

  return (
    <Modal
      open={open!}
      title={editing ? "Edit product" : "New product"}
      onClose={onCancel}
      footer={ModalFooter}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ControllInput label="Product Name" control={control} name="name" />
            <ControllSelect
              control={control}
              label="Product Code"
              name="code"
              options={codeOptions}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ControllInput
              type="number"
              name="cost"
              label="Cost"
              control={control}
            />
            <ControllInput
              type="number"
              name="price"
              label="Selling Price"
              control={control}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ControllInput
              type="number"
              name="quantity"
              label="Quantity"
              control={control}
            />
            <ControllInput
              type="number"
              name="low_stock_threshold"
              label="Low Stock Threshold"
              control={control}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CategorySelect control={control} name="category" />
            <BrandSelect control={control} name="brand" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ControllInput
              type="number"
              control={control}
              name="discount_price"
              label="Discount Price"
            />
            <ControllRadio
              control={control}
              name="status"
              label="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </div>

          <div className="space-y-1">
            <label className="label">Product Image</label>
            <div className="flex items-center gap-4 p-2 border border-dashed border-gray-500 rounded-md">
              <ImageUploader
                onSelect={(url) =>
                  setValue("image", url, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
              {watchedImage && (
                <div className="relative group">
                  <img
                    src={watchedImage}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setValue("image", "")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <ControllTextArea
              control={control}
              name="description"
              label="Description"
              placeholder="Enter product description..."
            />
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ProductForm;
