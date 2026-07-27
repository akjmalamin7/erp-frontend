import { useGetAllCategoriesQuery } from "@/entities/category";
import { ControllSelect } from "@/shared/ui/controll-select";
import { Control, FieldValues, Path } from "react-hook-form";

interface CategorySelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CategorySelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Category",
  placeholder = "Select Category",
  disabled,
}: CategorySelectProps<TFieldValues>) => {
  const { data, isLoading } = useGetAllCategoriesQuery();

  const categoryOptions =
    data?.data?.map((category) => ({
      name: category.name,
      value: category._id,
    })) || [];

  return (
    <ControllSelect
      control={control}
      name={name}
      label={label}
      options={categoryOptions}
      placeholder={isLoading ? "Loading categories..." : placeholder}
      disabled={disabled || isLoading}
    />
  );
};

export default CategorySelect;
