import { IProfile } from "@/entities/profile/model/types";
import { Checkbox } from "@/shared/ui/checkbox";
import { List } from "@/shared/ui/list";
import { Shield } from "lucide-react";

interface Props {
  isEditing?: boolean;
  profileData: IProfile;
}
const PermissionsForm = ({ profileData, isEditing }: Props) => {
  const formattedMenus = profileData.user.allowedMenus.map((menu, index) => ({
    id: index + 1,
    name: menu || menu.charAt(0).toUpperCase() + menu.slice(1),
    role: "Access Granted",
  }));
  return (
    <div className=" flex flex-col gap-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Shield size={20} className="text-brass-500" />
        Menu Permissions
      </h3>
      <List
        items={formattedMenus}
        keyExtractor={(user) => user.id}
        gap="xs"
        onItemClick={(user) => console.log("Clicked:", user.name)}
        itemClassName="px-3 py-1 rounded-md"
        renderItem={(user) => (
          <div className="flex justify-start items-center gap-2">
            <Checkbox disabled={!isEditing} checked />
            <span className="text-sm capitalize">{user.name}</span>
            <span className="text-xs text-slate-500">{user.role}</span>
          </div>
        )}
      />
    </div>
  );
};

export default PermissionsForm;
