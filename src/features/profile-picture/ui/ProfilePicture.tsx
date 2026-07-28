import { ProfileSchemaType } from "@/entities/profile/model/schema";
import { IProfile } from "@/entities/profile/model/types";
import { ImageUploader } from "@/features/image-uploader";
import { Camera, UserIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props {
  isEditing?: boolean;
  watchedPhoto?: string;
  profileData: IProfile;
}
const ProfilePicture = ({ isEditing, watchedPhoto, profileData }: Props) => {
  const form = useFormContext<ProfileSchemaType>();
  const { setValue } = form;
  return (
    <div className="relative">
      <div className="w-36 h-36 rounded-3xl border-4 border-amber-500 overflow-hidden bg-ink-800 shadow-lg">
        {(isEditing ? watchedPhoto : profileData?.photo) ? (
          <img
            src={isEditing ? watchedPhoto : profileData?.photo}
            className="w-full h-full object-cover"
            alt="Profile"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <UserIcon size={60} />
          </div>
        )}
      </div>
      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center  opacity-0 group-hover:opacity-100 transition-all rounded-3xl cursor-pointer">
          <div className="relative flex flex-col items-center  text-xs">
            <Camera className="mb-1 h-6 w-6 text-white!" />
            <span className="text-white">Update</span>
            <div className="absolute inset-0 opacity-0">
              <ImageUploader
                onSelect={(url) =>
                  setValue("photo", url, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
