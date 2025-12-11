import { useState } from "react";
// import { BASE_URL } from "../constants";
// import { AuthContext } from "../contexts/AuthContext";
import TextInput from "../components/TextInput";
import symbol from "../assets/symbol.png";
import envelope from "../assets/envelope-icon.png";
import lock from "../assets/lock-icon.png";
import Button from "../components/Button";
import Or from "../components/Or";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <a className="text-sm text-purple-500 w-full text-right mr-5">
        Forgot password?
      </a>
      <Button>Sign In ➔</Button>
      <Or />
      <p className="text-[#8d9db5] text-sm">
        Don't have an account?{" "}
        <a className="text-[#00cedd] text-sm cursor-pointer">Create one</a>
      </p>
    </div>
  );
}
