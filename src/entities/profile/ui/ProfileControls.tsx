import Button from "@/shared/ui/button/Button";
import { Edit2, Loader2, Save, X } from "lucide-react";

interface Props {
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
}: Props) => {
  return (
    <div>
      {/* Controls */}
      {!isEditing ? (
        <Button onClick={() => setIsEditing?.(true)} variant="accent" size="lg">
          <Edit2 size={18} /> Edit Profile
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button
            onClick={() => setIsEditing?.(false)}
            size="lg"
            variant="outline"
          >
            <X size={18} /> Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={isUpdating}
            variant="accent"
            size="lg"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Save Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileControls;
