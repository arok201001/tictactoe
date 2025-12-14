import { useState } from "react";
import TextInput from "../components/TextInput";
import symbol from "../assets/symbol.png";
import envelope from "../assets/envelope-icon.png";
import lock from "../assets/lock-icon.png";
import Button from "../components/Button";
import Or from "../components/Or";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useAuth()

  const handleLogin = () => {
    login(email, password)
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#152034] p-5 rounded-xl max-w-90">
      <img src={symbol} alt="" className="h-14" />
      <h1 className="text-white text-3xl mt-3 ">WELCOME BACK</h1>
      <h3 className="text-[#8d9db5] mt-1 text-sm">
        Sign in to continue playing
      </h3>
      <div className="mt-7 flex flex-col">
        <label className="text-xs text-[#8d9db5] text-left w-80 h-6">
          EMAIL
        </label>
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          iconSrc={envelope}
          iconAlt="envelope"
        />
        <label className="text-xs text-[#8d9db5] text-left w-80 h-6">
          PASSWORD
        </label>
        <TextInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          iconSrc={lock}
          iconAlt="lock"
        />
      </div>
      <a className="text-sm text-purple-500 w-full text-right mr-5 cursor-pointer">
        Forgot password?
      </a>
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Sign In ➔"}
        </Button>
      <Or />
      <p className="text-[#8d9db5] text-sm flex gap-1">
        Don't have an account?
        <NavLink to={"/register"}>
          <span className="text-[#00cedd] text-sm cursor-pointer">Create one</span>
        </NavLink>
      </p>
    </div>
  );
}

