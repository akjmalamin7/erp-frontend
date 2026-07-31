import { useGetProfileQuery } from "@/entities/user";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useMustChangePassword = () => {
  const navigate = useNavigate();
  const { data: profile, isSuccess, isLoading } = useGetProfileQuery();

  useEffect(() => {
    if (isSuccess && profile?.data?.user?.must_change_password) {
      toast.error(
        "Security Alert: Your password was reset by an admin. Please update it immediately!",
        {
          duration: 8000,
          icon: "⚠️",
          id: "password-alert",
        },
      );

      navigate("/profile/update-password", { replace: true });
    }
  }, [profile, isSuccess, navigate]);

  return { profile: profile?.data, isLoading };
};
