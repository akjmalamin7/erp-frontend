import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { ProfileControls, UserMeta } from "@/entities/profile";
import { profileSchema } from "@/entities/profile/model/schema";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/entities/user";
import {
  PermissionsForm,
  PersonalInformationForm,
} from "@/features/profile-edit";
import { ProfilePicture } from "@/features/profile-picture";
import { PageHeader } from "@/shared/ui";
import { Container } from "@/shared/ui/container";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: response, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const profileData = response?.data;

  const form = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      designation: "",
      bio: "",
      dob: "",
      photo: "",
      allowedMenus: [],
    },
  });

  const { handleSubmit, reset, watch } = form;
  const watchedPhoto = watch("photo");

  useEffect(() => {
    if (profileData) {
      reset({
        designation: profileData.designation || "",
        bio: profileData.bio || "",
        dob: profileData.dob || "",
        photo: profileData.photo || "",
        allowedMenus: profileData.user?.allowedMenus || [],
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (values: any) => {
    try {
      await updateProfile(values).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brass-500" size={40} />
      </div>
    );
  }

  if (isError || !profileData) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Something went wrong while loading the profile.</p>
      </div>
    );
  }

  return (
    <Container size="xl">
      {/* Page Header */}
      <PageHeader
        title="My Profile"
        description="Manage your account settings and permissions"
      />

      <div className=" border border-white/10 rounded-2xl overflow-hidden card">
        {/* Cover Section */}
        <div className="h-40 bg-linear-to-r bg-gray-800"></div>
        <div className="px-3 sm:px-4 md:px-5 lg:px-8 pb-10">
          <FormProvider {...form}>
            <div className="relative flex flex-col sm:flex-row justify-between items-center sm:items-end -mt-16 mb-8 gap-6">
              {/* Profile Photo */}
              <div className="relative group">
                <ProfilePicture
                  isEditing={isEditing}
                  watchedPhoto={watchedPhoto}
                  profileData={profileData}
                />
              </div>

              {/* User Meta */}
              <UserMeta
                email={profileData.user.email}
                designation={profileData.designation}
              />

              <ProfileControls
                isEditing={isEditing}
                isUpdating={isUpdating}
                setIsEditing={setIsEditing}
                submit={handleSubmit(onSubmit)}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                {/* Left Column: Personal Info */}
                <PersonalInformationForm
                  isEditing={isEditing}
                  profileData={profileData}
                />

                {/* Right Column: Permissions */}
                <PermissionsForm
                  isEditing={isEditing}
                  profileData={profileData}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
