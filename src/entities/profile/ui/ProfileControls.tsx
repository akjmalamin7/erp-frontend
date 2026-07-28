import { Edit2, Loader2, Save, X } from "lucide-react";

interface Porps {
  isEditing?: boolean;
  isUpdating?: boolean;
  setIsEditing?: (value: boolean) => void;
  submit?: () => void;
}
const ProfileControls = ({
  isEditing,
  isUpdating,
  setIsEditing,
  submit,
}: Porps) => {
  return (
    <div>
      {/* Controls */}
      {!isEditing ? (
        <button
          onClick={() => setIsEditing?.(true)}
          className="btn-accent flex items-center gap-2 h-11 px-6"
        >
          <Edit2 size={18} /> Edit Profile
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing?.(false)}
            className="btn-outline flex items-center gap-2 h-11 px-6"
          >
            <X size={18} /> Cancel
          </button>
          <button
            onClick={submit}
            disabled={isUpdating}
            className="btn-accent flex items-center gap-2 h-11 px-6"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Save Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileControls;
