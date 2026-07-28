interface Props {
  label: string;
  value: string;
  icon: React.ReactNode;
}
const ProfileInfoItem = ({ label, value, icon }: Props) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 p-2 bg-white/5 rounded-lg text-slate-400">{icon}</div>
    <div>
      <p className="text-xs text-slate-900 uppercase tracking-wider">{label}</p>
      <p className="text-slate-400 font-medium break-all">{value}</p>
    </div>
  </div>
);
export default ProfileInfoItem;
