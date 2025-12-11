import { useState } from "react";
// import { BASE_URL } from "../constants";
// import { AuthContext } from "../contexts/AuthContext";
import TextInput from "../../components/TextInput";
import symbol from "../assets/symbol.png"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-red-100">

      <img className="h-1 " src={symbol} alt="" />
      <h1>WELCOME BACK</h1>
      <h3>Sign in to continue playing</h3>
      <label>EMAIL</label>
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>PASSWORD</label>
      <TextInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <a href="">Forgot password?</a>
      <button>Sign In ➔</button>
      <p>OR</p>
      <p>Don't have an account? <a href="">Create one</a></p>
    </div>
  );
}
