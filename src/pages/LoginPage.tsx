import TextInput from "../components/TextInput";
import symbol from "../assets/symbol.png";
import envelope from "../assets/envelope-icon.png";
import lock from "../assets/lock-icon.png";
import Button from "../components/Button";
import Or from "../components/Or";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "../types";


export default function LoginPage() {
  const { login, loading } = useAuth();

  const {
    register, //registrerar inputen with validation
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error: any) {
      console.error("Login error: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center bg-[#152034] p-5 rounded-xl max-w-90"
    >
      <img src={symbol} alt="" className="h-14" />
      <h1 className="text-white text-3xl mt-3 ">WELCOME BACK</h1>
      <h3 className="text-[#8d9db5] mt-2 text-sm">
        Sign in to continue playing
      </h3>
      <div className="mt-7 flex flex-col">
        <label className="text-xs text-[#8d9db5] text-left w-80 h-6">
          EMAIL
        </label>
        <TextInput
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
          placeholder="Enter your email"
          iconSrc={envelope}
          iconAlt="envelope"
        />
        {errors.email && (
          <p className="text-red-400 text-xs m-1 mb-3">
            {errors.email.message}
          </p>
        )}
        <label className="text-xs text-[#8d9db5] text-left w-80 h-6">
          PASSWORD
        </label>
        <TextInput
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Enter your password"
          iconSrc={lock}
          iconAlt="lock"
        />
        {errors.password && (
          <p className="text-red-400 text-xs m-1 mb-3">
            {errors.password.message}
          </p>
        )}
      </div>
      
      <NavLink to="/forgot-password" className="text-sm text-purple-500 w-full text-right mr-5 cursor-pointer">
        Forgot password?
      </NavLink>

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Sign In ➔"}
      </Button>
      
      <Or />
      <p className="text-[#8d9db5] text-sm flex gap-1">
        Don't have an account?
        <NavLink to={"/register"}>
          <span className="text-[#00cedd] text-sm cursor-pointer">
            Create one
          </span>
        </NavLink>
      </p>
    </form>
  );
}