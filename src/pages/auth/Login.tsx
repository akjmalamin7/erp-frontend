import { credentialsSet } from "@/app/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { useLoginMutation } from "@/services/authApi";
import { Boxes, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      if (res.status === "success") {
        dispatch(
          credentialsSet({
            token: res.token,
            user: res.user,
          })
        );

        toast.success("Welcome back!");

        const redirectTo =
          (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        "Invalid email or password";
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex items-center gap-2.5 lg:hidden">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900 text-brass-400">
          <Boxes size={20} strokeWidth={2.5} />
        </div>
        <span className="font-display text-lg font-bold text-ink-900">AZM ERP</span>
      </div>

      <h1 className="font-display text-2xl font-bold text-ink-900">Sign in</h1>
      <p className="mt-1 text-sm text-slate-500">
        Enter your work email and password to access the console.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className="input"
            placeholder="you@azmgroup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              className="input pr-10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink-700"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="btn-accent w-full">
          {isLoading && <LoaderCircle size={16} className="animate-spin" />}
          Sign in
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-slate-400">
        Access is provisioned by your organization&apos;s super admin. Contact
        them if you need an account or a password reset.
      </p>
    </div>
  );
}
