import { IProfile } from "@/entities/profile/model/types";
import { useGetAllProfilesQuery } from "@/entities/user/api/userApi";
import { ControllSelect } from "@/shared/ui/controll-select";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectUserProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const SelectUser = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Select User/Staff",
  disabled = false,
}: SelectUserProps<TFieldValues>) => {
  const { data, isLoading, isError } = useGetAllProfilesQuery();

  const userOptions = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((profile: IProfile) => ({
      name: `${profile.name} (${profile.user?.employee_id || "N/A"})`,
      value: profile.user._id,
    }));
  }, [data]);

  return (
    <div className="relative w-full">
      <ControllSelect
        name={name}
        label={label}
        control={control}
        options={[{ name: "--SELECT USER--", value: "" }, ...userOptions]}
        disabled={isLoading || disabled || isError}
      />

      {isLoading && (
        <div className="absolute right-8 top-10">
          <Loader2 size={14} className="animate-spin text-brass-500" />
        </div>
      )}

      {isError && (
        <p className="text-[10px] text-red-500 mt-1">Failed to load users.</p>
      )}
    </div>
  );
};
export default SelectUser;
