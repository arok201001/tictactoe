import { ImageOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type textInputProps = InputHTMLAttributes<HTMLInputElement> & {
  iconSrc?: string;
  iconAlt?: string;
};

export default function TextInput({ iconSrc, iconAlt = "", ...props }: textInputProps) {
  return (
    <div className="flex items-center bg-gradient-to-r from-[#2e3d53] to-[#212f43] rounded-2xl h-12 mb-4 px-3">
      {iconSrc && (
        <img src={iconSrc} alt={iconAlt} className="w-6 h-6 mr-2" />
      )}
      <input
        className="bg-transparent flex-1 placeholder:text-sm placeholder:text-[#8d9db5] text-[#8d9db5] outline-none"
        type="text"
        {...props}
      />
    </div>
  );
}
