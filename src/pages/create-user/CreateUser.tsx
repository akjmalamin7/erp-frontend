import {
  userCreateSchema,
  userCreateSchemaType,
} from "@/entities/user/model/schema";
import {
  useCreateAdminMutation,
  useCreateEmployeeMutation,
} from "@/features/staff-create/api/staffApi";
import { PageHeader } from "@/shared/ui";
import Button from "@/shared/ui/button/Button";
import { Container } from "@/shared/ui/container";
import { Tabs } from "@/shared/ui/tabs";
import { CreateUserForm } from "@/widgets/create-user-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserCog, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Tab = "employee" | "admin";

const CreateUser = () => {
  const [activeTab, setActiveTab] = useState<Tab>("employee");

  const [createEmployee, { isLoading: creatingEmployee }] =
    useCreateEmployeeMutation();
  const [createAdmin, { isLoading: creatingAdmin }] = useCreateAdminMutation();

  const form = useForm<userCreateSchemaType>({
    mode: "onChange",
    resolver: yupResolver(userCreateSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = form;

  useEffect(() => {
    const commonMenus: userCreateSchemaType["allowedMenus"] = [
      "dashboard",
      "profile",
      "invoice",
      "stock",
      "sale",
      "customers",
    ];
    const adminMenus: Array<
      userCreateSchemaType["allowedMenus"][number] | "category"
    > = [...commonMenus, "category", "mail_atleast", "staff", "sales_report"];

    reset({
      email: "",
      password: "",
      role: activeTab,
      allowedMenus:
        activeTab === "admin"
          ? (adminMenus as userCreateSchemaType["allowedMenus"])
          : commonMenus,
    });
  }, [activeTab, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const cleanPayload = {
        ...values,
        allowedMenus: values.allowedMenus.filter(
          (menu): menu is userCreateSchemaType["allowedMenus"][number] =>
            menu !== undefined && menu !== null,
        ),
      };

      if (activeTab === "admin") {
        await createAdmin(cleanPayload as any).unwrap();
      } else {
        await createEmployee(cleanPayload as any).unwrap();
      }

      toast.success(
        `${activeTab === "admin" ? "Admin" : "Staff"} account created successfully!`,
      );
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create user.");
    }
  });

  const isPending = creatingEmployee || creatingAdmin;

  const accountTabs: { key: Tab; label: string; icon: any }[] = [
    { key: "employee", label: "Employee", icon: <Users size={16} /> },
    { key: "admin", label: "Admin", icon: <UserCog size={16} /> },
  ];

  return (
    <Container size="md">
      <PageHeader
        title="Account Creation"
        description="Register a new employee or admin and set their system permissions."
      />

      <div className="mb-6">
        <Tabs
          tabs={accountTabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab as Tab)}
        />
      </div>

      <div className="card p-5">
        <div className="mb-6 border-b border-white/5 pb-4">
          <h2 className="text-lg font-bold capitalize text-brass-500 flex items-center gap-2">
            {activeTab === "admin" ? (
              <UserCog size={20} />
            ) : (
              <Users size={20} />
            )}
            Create {activeTab} Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Setting default permissions for <strong>{activeTab}</strong> role.
          </p>
        </div>

        <FormProvider {...form}>
          <CreateUserForm />
        </FormProvider>
        <div className="mt-8 border-t border-white/5">
          <Button
            onClick={onSubmit}
            size="md"
            className="w-full"
            disabled={isPending || !isDirty || !isValid}
            loading={isPending}
          >
            {isPending ? `Creating ${activeTab}...` : `Create ${activeTab}`}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CreateUser;
