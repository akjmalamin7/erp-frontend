import { useAppDispatch } from "@/app/hooks";
import { credentialsSet, useLoginMutation } from "@/entities/session";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth-login/model/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await login(values).unwrap();

      if (res.status === "success") {
        dispatch(
          credentialsSet({
            token: res.token,
            user: res.user,
          }),
        );

        toast.success("Welcome back!");

        const redirectTo =
          (location.state as { from?: { pathname: string } })?.from?.pathname ??
          "/";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 space-y-4"
      noValidate
    >
      <div>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="input"
          placeholder="you@azmgroup.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="label" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="input pr-10"
            placeholder="••••••••"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isLoading} className="btn-accent w-full">
        {isLoading && <LoaderCircle size={16} className="animate-spin" />}
        Sign in
      </button>
    </form>
  );
}
