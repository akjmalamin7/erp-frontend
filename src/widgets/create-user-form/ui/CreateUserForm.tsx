import { userCreateSchemaType } from "@/entities/user/model/schema";
import { CheckMenus } from "@/features/check-menus";
import SelectRole from "@/features/select-role/ui/SelectRole";
import { ControllInput } from "@/shared/ui/controll-input";
import ControllPassword from "@/shared/ui/password/ui/ControllPassword";
import { useFormContext } from "react-hook-form";

const CreateUserForm = () => {
  const form = useFormContext<userCreateSchemaType>();
  const { control } = form;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ControllInput name="email" control={control} label="Email" />

        <ControllPassword name="password" control={control} label="Password" />
        <div className="md:col-span-2">
          <SelectRole disabled name="role" control={control} />
        </div>
      </div>
      <CheckMenus name="allowedMenus" control={control} />
    </div>
  );
};

export default CreateUserForm;
