import { Badge } from "@/shared/ui/badge";

interface Props {
  label: string;
  value: string;
  icon: React.ReactNode;
}
const ProfileInfoItem = ({ label, value, icon }: Props) => {
  const getFormattedValue = (val: string) => {
    if (val === "active") return <Badge variant="active">Active</Badge>;
    if (val === "inactive") return <Badge variant="inactive">Inactive</Badge>;
    return val || "N/A";
  };

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 p-2 bg-white/5 rounded-lg text-slate-500">
        {icon}
      </div>
      <div>
        <p className="text-xs  text-slate-900 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-slate-400 text-sm font-medium break-all">
          {getFormattedValue(value)}
        </p>
      </div>
    </div>
  );
};
export default ProfileInfoItem;
