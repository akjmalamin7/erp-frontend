import { useGetAllBrandsQuery } from "@/entities/brand";
import { ControllSelect } from "@/shared/ui/controll-select";
import { Control, FieldValues, Path } from "react-hook-form";

interface BrandSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const BrandSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Brand",
  placeholder = "Select Brand",
  disabled,
}: BrandSelectProps<TFieldValues>) => {
  const { data, isLoading } = useGetAllBrandsQuery();

  const brandOptions =
    data?.data?.map((brand) => ({
      name: brand.name,
      value: brand._id,
    })) || [];

  return (
    <ControllSelect
      control={control}
      name={name}
      label={label}
      options={brandOptions}
      placeholder={isLoading ? "Loading brands..." : placeholder}
      disabled={disabled || isLoading}
    />
  );
};

export default BrandSelect;
