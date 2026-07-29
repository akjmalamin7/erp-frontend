import ProfilePage from "@/pages/profile";
import UpdatePassword from "@/pages/update-password";

export const profileRoutes = [
  {
    path: "profile",
    element: <ProfilePage />,
    handle: { title: "My profile" },
  },
  {
    path: "profile/update-password",
    element: <UpdatePassword />,
    handle: { title: "Update Password" },
  },
];
