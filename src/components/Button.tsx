import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export default function Button({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="text-white w-78 h-13 rounded-2xl mt-4 mb-4 bg-[#8f06ed] cursor-pointer"
      {...props}
    />
  );
}
