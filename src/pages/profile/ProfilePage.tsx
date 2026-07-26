import { profileUpdated } from "@/entities/session";
import { useAppDispatch } from "@/app/hooks";
import { Loader, PageHeader } from "@/shared/ui";
import { useGetProfileQuery } from "@/entities/user";
import PasswordUpdateForm from "@/features/password-update/ui/PasswordUpdateForm";

export default function ProfilePage() {
  const { data, isLoading } = useGetProfileQuery();
  const dispatch = useAppDispatch();

  const user = data?.data;

  if (isLoading) return <Loader />;

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

        <PasswordUpdateForm />
      </div>
    </div>
  );
}
