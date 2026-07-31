import CreateUser from "@/pages/create-user";
import ProfilePage from "@/pages/profile";
import UpdatePassword from "@/pages/update-password";
import RequireRole from "./RequireRole";

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
  {
    element: <RequireRole roles={["super_admin", "admin"]} />,
    children: [
      {
        path: "profile/create-user",
        element: <CreateUser />,
        handle: { title: "Create User" },
      },
    ],
  },
];
