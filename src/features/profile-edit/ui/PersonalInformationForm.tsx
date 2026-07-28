import { ProfileInfoItem } from "@/entities/profile";
import { ProfileSchemaType } from "@/entities/profile/model/schema";
import { IProfile } from "@/entities/profile/model/types";
import { ControllInput } from "@/shared/ui/controll-input";
import { ControllTextArea } from "@/shared/ui/textarea";
import { BadgeCheck, Calendar, Mail, Shield } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props {
  isEditing?: boolean;
  profileData: IProfile;
}
const PersonalInformationForm = ({ isEditing, profileData }: Props) => {
  const form = useFormContext<ProfileSchemaType>();
  const { setValue, control } = form;
  return (
    <div className="lg:col-span-2 space-y-4">
      <section>
        <h3 className="text-lg font-semibold  mb-4 flex items-center gap-2">
          <BadgeCheck size={20} className="text-brass-500" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-white/5 px-2 rounded-xl border border-white/5">
          {isEditing ? (
            <>
              <ControllInput
                name="designation"
                label="Designation"
                control={control}
              />
              <ControllInput
                type="date"
                name="dob"
                label="Date of Birth"
                control={control}
              />
            </>
          ) : (
            <>
              <ProfileInfoItem
                label="Full Email Address"
                value={profileData.user.email}
                icon={<Mail size={16} />}
              />
              <ProfileInfoItem
                label="Employee ID"
                value={profileData.user.employee_id}
                icon={<Shield size={16} />}
              />
              <ProfileInfoItem
                label="Account Status"
                value={profileData.user.status}
                icon={<BadgeCheck size={16} />}
              />
              <ProfileInfoItem
                label="Date of Birth"
                value={profileData.dob || "Not Provided"}
                icon={<Calendar size={16} />}
              />
            </>
          )}
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold  mb-3">Bio & Summary</h3>
        {isEditing ? (
          <ControllTextArea
            name="bio"
            placeholder="Tell us something about yourself..."
            control={control}
          />
        ) : (
          <div className="bg-white/5  rounded-xl border border-white/5">
            <p className="text-slate-400 leading-relaxed">
              {profileData.bio || "No bio information available."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PersonalInformationForm;
