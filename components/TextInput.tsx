import type { InputHTMLAttributes } from "react";

export default function TextInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      {...props}
    />
  );
}