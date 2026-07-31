import { ProfileInfoItem } from "@/entities/profile";
import { ProfileSchemaType } from "@/entities/profile/model/schema";
import { IProfile } from "@/entities/profile/model/types";
import { SelectBloodGroupProps } from "@/features/select-blood-group";
import { SelectDesignation } from "@/features/select-designation";
import { ControllInput } from "@/shared/ui/controll-input";
import { ControllTextArea } from "@/shared/ui/textarea";

import {
  BadgeCheck,
  Briefcase,
  Calendar,
  Droplets,
  IdCard,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props {
  isEditing?: boolean;
  profileData: IProfile;
}
const PersonalInformationForm = ({ isEditing, profileData }: Props) => {
  const form = useFormContext<ProfileSchemaType>();
  const { control } = form;

  const profileItems = [
    { label: "Name", value: profileData.name, icon: <User size={15} /> },
    { label: "Phone", value: profileData.phone, icon: <Phone size={15} /> },
    {
      label: "Blood Group",
      value: profileData.blood_group,
      icon: <Droplets size={15} />,
    },
    {
      label: "Designation",
      value: profileData.designation,
      icon: <Briefcase size={15} />,
    },
    {
      label: "Address",
      value: profileData.address,
      icon: <MapPin size={15} />,
    },
    { label: "Email", value: profileData.user.email, icon: <Mail size={15} /> },
    {
      label: "Employee ID",
      value: profileData.user.employee_id,
      icon: <IdCard size={15} />,
    },
    {
      label: "Account Status",
      value: profileData.user.status,
      icon: <BadgeCheck size={15} />,
    },
    {
      label: "Date of Birth",
      value: profileData.dob || "Not Provided",
      icon: <Calendar size={15} />,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <section>
        <h3 className="text-lg font-semibold  mb-4 flex items-center gap-2">
          <BadgeCheck size={20} className="text-brass-500" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-white/5 px-2 rounded-xl border border-white/5">
          {isEditing ? (
            <>
              <ControllInput name="name" label="Name" control={control} />
              <ControllInput name="phone" label="Phone" control={control} />
              <ControllInput name="address" label="Address" control={control} />
              <SelectBloodGroupProps
                name="blood_group"
                control={control}
                label="Blood Group"
              />

              <SelectDesignation
                control={control}
                name="designation"
                label="Designation"
              />
              <ControllInput
                type="date"
                name="dob"
                label="Date of Birth"
                control={control}
              />
              <ControllTextArea
                name="address"
                label="Address"
                placeholder="Tell us something about yourself..."
                control={control}
              />
              <ControllTextArea
                name="bio"
                label="BIO"
                placeholder="Tell us something about yourself..."
                control={control}
              />
            </>
          ) : (
            profileItems.map((item, index) => (
              <ProfileInfoItem
                key={index}
                label={item.label}
                value={item.value}
                icon={item.icon}
              />
            ))
          )}
        </div>
      </section>
      <section>
        {!isEditing && (
          <>
            <h3 className="text-lg font-semibold">Bio & Summary</h3>
            <div className="bg-white/5  rounded-xl border border-white/5">
              <p className="text-slate-400 leading-relaxed">
                {profileData.bio || "No bio information available."}
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default PersonalInformationForm;
