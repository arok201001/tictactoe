import { useState } from "react";
import { BASE_URL } from "../constants";
import { AuthContext } from "../contexts/AuthContext";
import TextInput from "../../components/TextInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex p-8 bg-red-500 text-white">
      <h1>Login</h1>
      <label>Email adress: </label>
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password: </label>
      <TextInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
