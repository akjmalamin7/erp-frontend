// import { ProfileSchemaType } from "@/entities/profile/model/schema";
// import { ALL_MENUS, IProfile } from "@/entities/profile/model/types";
// import { Checkbox } from "@/shared/ui/checkbox";
// import { Shield } from "lucide-react";
// import { Controller, useFormContext } from "react-hook-form";

// interface Props {
//   isEditing?: boolean;
//   profileData: IProfile;
// }
// const PermissionsForm = ({ isEditing, profileData }: Props) => {
//   const form = useFormContext<ProfileSchemaType>();
//   const { setValue, watch, control } = form;
//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-semibold flex items-center gap-2">
//         <Shield size={20} className="text-brass-500" />
//         Menu Permissions
//       </h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
//         {ALL_MENUS.map((menu) => (
//           <Controller
//             key={menu.value}
//             control={control}
//             name="allowedMenus"
//             render={({ field }) => {
//               const isChecked = field.value?.includes(menu.value);

//               return (
//                 <label
//                   className={`flex items-center justify-between px-3 py-1.5 rounded-lg transition-all border ${
//                     isChecked
//                       ? "bg-brass-500/10 border-brass-500/30 text-brass-200"
//                       : "bg-transparent border-[#ebebeb] text-slate-500"
//                   } ${isEditing ? "cursor-pointer hover:bg-white/5" : "cursor-default"}`}
//                 >
//                   <span className="text-sm font-medium">{menu.label}</span>

//                   <Checkbox
//                     disabled={!isEditing}
//                     checked={isChecked}
//                     onChange={(e) => {
//                       const currentValues = field.value || [];
//                       if (e.target.checked) {
//                         field.onChange([...currentValues, menu.value]);
//                       } else {
//                         field.onChange(
//                           currentValues.filter(
//                             (v: string | undefined) => v !== menu.value,
//                           ),
//                         );
//                       }
//                     }}
//                     className="checkbox-xs"
//                   />
//                 </label>
//               );
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PermissionsForm;

const PermissionsForm = () => {
  return <div>PermissionsForm</div>;
};

export default PermissionsForm;
