import { useAppSelector } from "@/app/hooks";
import { useCreateBrandMutation } from "@/entities/brand";
import { Modal } from "@/shared/ui";
import Button from "@/shared/ui/button/Button";
import { ControllInput } from "@/shared/ui/controll-input";
import { ControllTextArea } from "@/shared/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { brandSchema } from "../model/schema";

const BrandForm = () => {
  const user = useAppSelector((s: any) => s.auth?.user);
  const [open, setOpen] = useState(false);

  const [createBrand, { isLoading: creating }] = useCreateBrandMutation();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(brandSchema),
    defaultValues: { name: "", description: "" },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isValid },
  } = form;

  const handleModal = () => setOpen((prev) => !prev);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const payload = {
        ...values,
        user: user._id,
      };
      await createBrand(payload).unwrap();
      toast.success("Brand added");
      handleModal();
      reset({
        name: "",
        description: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  });

  const ButtonJSX = (
    <div className="flex justify-end gap-3 w-full">
      <Button variant="outline" onClick={handleModal}>
        Cancel
      </Button>
      <Button
        variant="accent"
        onClick={onSubmit}
        disabled={creating || !isDirty || !isValid}
      >
        {creating ? "Creating..." : "Create"}
      </Button>
    </div>
  );

  return (
    <>
      <div className="cursor-pointer">
        <Button variant="accent" onClick={handleModal}>
          <Plus size={16} /> New brand
        </Button>
      </div>

      {open && (
        <Modal
          open={open}
          title={"Create Customer"}
          footer={ButtonJSX}
          onClose={handleModal}
        >
          <FormProvider {...form}>
            <div className="flex flex-col gap-4">
              <ControllInput name="name" label="Name" control={control} />
              <ControllTextArea
                name="description"
                label="Desciption"
                control={control}
              />
            </div>
          </FormProvider>
        </Modal>
      )}
    </>
  );
};
export default BrandForm;
