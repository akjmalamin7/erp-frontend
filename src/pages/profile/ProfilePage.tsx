import { profileUpdated } from "@/app/authSlice";
import { useAppDispatch } from "@/app/hooks";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { useUpdatePasswordMutation } from "@/services/authApi";
import { useGetProfileQuery } from "@/services/usersApi";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data, isLoading } = useGetProfileQuery();
  const [updatePassword, { isLoading: changing }] = useUpdatePasswordMutation();
  const dispatch = useAppDispatch();
  const [pwForm, setPwForm] = useState({ old_password: "", new_password: "" });

  const user = data?.data;

  if (isLoading) return <Loader />;

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword(pwForm).unwrap();
      toast.success("Password updated");
      setPwForm({ old_password: "", new_password: "" });
    } catch {
      toast.error("Couldn't update password");
    }
  };

  return (
    <div>
      <PageHeader title="My profile" description="Your account details and security settings." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900">Account details</h3>
          <dl className="mt-3 divide-y divide-slate-100 text-sm">
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Email</dt>
              <dd className="font-medium text-ink-900">{user?.user?.email}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Employee ID</dt>
              <dd className="font-mono text-ink-900">{user?.user?.employee_id}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Role</dt>
              <dd className="capitalize font-medium text-ink-900">{user?.user?.role?.replace("_", " ")}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-slate-500">Status</dt>
              <dd className="capitalize font-medium text-ink-900">{user?.user?.status}</dd>
            </div>
          </dl>
          {user && (
            <button
              className="btn-outline mt-4 w-full"
              onClick={() => dispatch(profileUpdated(user?.user))}
            >
              Refresh session details
            </button>
          )}
        </div>

        <form onSubmit={handleChangePassword} className="card space-y-4 p-5">
          <h3 className="text-sm font-bold text-ink-900">Change password</h3>
          <div>
            <label className="label">Current password</label>
            <input
              required
              type="password"
              className="input"
              value={pwForm.old_password}
              onChange={(e) => setPwForm({ ...pwForm, old_password: e.target.value })}
            />
          </div>
          <div>
            <label className="label">New password</label>
            <input
              required
              type="password"
              className="input"
              value={pwForm.new_password}
              onChange={(e) => setPwForm({ ...pwForm, new_password: e.target.value })}
            />
          </div>
          <button type="submit" disabled={changing} className="btn-accent w-full">Update password</button>
        </form>
      </div>
    </div>
  );
}
