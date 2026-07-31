import { useAppSelector } from "@/app/hooks";
import { useCreateSupplierMutation } from "@/entities/supplier";
import { Modal } from "@/shared/ui";
import Button from "@/shared/ui/button/Button";
import { ControllInput } from "@/shared/ui/controll-input";
import { ControllTextArea } from "@/shared/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createSupplierSchema } from "../model/schema";

const CreateSupplierForm = () => {
  const user = useAppSelector((s: any) => s.auth?.user);
  const [open, setOpen] = useState(false);

  const [createSupplier, { isLoading: creating }] = useCreateSupplierMutation();

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(createSupplierSchema),
    defaultValues: {
      name: "",
      company_name: "",
      phone: "",
      email: "",
      address: "",
    },
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
      await createSupplier(payload).unwrap();
      toast.success("Supplier created");
      handleModal();
      reset();
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
          <Plus size={16} /> New Supplier
        </Button>
      </div>

      {open && (
        <Modal
          open={open}
          title={"Create Supplier"}
          footer={ButtonJSX}
          onClose={handleModal}
        >
          <FormProvider {...form}>
            <div className="flex flex-col gap-4">
              <ControllInput name="name" label="Name" control={control} />
              <ControllInput
                name="company_name"
                label="Company Name"
                control={control}
              />
              <ControllInput name="phone" label="Phone" control={control} />
              <ControllInput name="email" label="Email" control={control} />
              <ControllTextArea
                name="address"
                label="Address"
                control={control}
              />
            </div>
          </FormProvider>
        </Modal>
      )}
    </>
  );
};
export default CreateSupplierForm;
