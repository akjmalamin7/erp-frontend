import { useAppSelector } from "@/app/hooks";
import {
  Customer,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} from "@/entities/customer";
import {
  createCustomerSchema,
  type CreateCustomerFormValues,
} from "@/features/customer-create/model/schema";
import { Modal } from "@/shared/ui";
import Button from "@/shared/ui/button/Button";
import { ControllInput } from "@/shared/ui/controll-input";
import { ControllTextArea } from "@/shared/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  mode?: "edit" | "add";
  initialData?: Customer;
  trigger?: ReactNode;
}

const CreateCustomerForm = ({ mode = "add", initialData, trigger }: Props) => {
  // annotate state as any to avoid unknown index errors in this selector
  const user = useAppSelector((s: any) => s.auth?.user);
  const [open, setOpen] = useState(false);
  const isEdit = mode === "edit";

  const [createCustomer, { isLoading: creating }] = useCreateCustomerMutation();
  const [updateCustomer, { isLoading: updating }] = useUpdateCustomerMutation();

  const form = useForm<CreateCustomerFormValues>({
    mode: "onChange",
    resolver: yupResolver(createCustomerSchema),
    defaultValues: { name: "", phone: "", email: "", address: "" },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isValid },
  } = form;

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        reset({
          name: initialData.name,
          phone: initialData.phone,
          email: initialData.email || "",
          address: initialData.address || "",
        });
      } else {
        reset({ name: "", phone: "", email: "", address: "" });
      }
    }
  }, [open, isEdit, initialData, reset]);

  const handleModal = () => setOpen((prev) => !prev);

  const onSubmit = handleSubmit(async (values: CreateCustomerFormValues) => {
    try {
      if (isEdit && initialData) {
        await updateCustomer({ id: initialData._id, body: values }).unwrap();
        toast.success("Customer updated");
      } else {
        const payload = { ...values, user: user?._id };
        await createCustomer(payload).unwrap();
        toast.success("Customer added");
      }
      handleModal();
    } catch {
      toast.error(`Couldn't ${isEdit ? "update" : "add"} customer`);
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
        disabled={creating || updating || (isEdit && !isDirty) || !isValid}
      >
        {creating || updating ? "Saving..." : isEdit ? "Update" : "Create"}
      </Button>
    </div>
  );

  return (
    <>
      <div onClick={handleModal} className="cursor-pointer">
        {trigger ? (
          trigger
        ) : (
          <Button variant="accent">
            <Plus size={16} /> New customer
          </Button>
        )}
      </div>

      {open && (
        <Modal
          open={open}
          title={isEdit ? "Edit Customer" : "Create Customer"}
          footer={ButtonJSX}
          onClose={handleModal}
        >
          <FormProvider {...form}>
            <div className="flex flex-col gap-4">
              <ControllInput name="name" label="Name" control={control} />
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

export default CreateCustomerForm;
