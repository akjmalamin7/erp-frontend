import SmsSettingsPage from "@/pages/sms/SmsSettingsPage";
import StaffPage from "@/pages/staff/StaffPage";

export const staffRoutes = [
  {
    path: "staff",
    element: <StaffPage />,
    handle: { title: "Staff" },
  },
  {
    path: "sms",
    element: <SmsSettingsPage />,
    handle: { title: "SMS settings" },
  },
];
