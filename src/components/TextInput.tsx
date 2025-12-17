import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  iconSrc?: string;
  iconAlt?: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ iconSrc, iconAlt = "", ...props }, ref) => {
    return (
      <div className="flex items-center bg-gradient-to-r from-[#2e3d53] to-[#212f43] rounded-2xl h-12 mb-4 px-3">
        {iconSrc && (
          <img src={iconSrc} alt={iconAlt} className="w-6 h-6 mr-2" />
        )}
        <input
          className="bg-transparent flex-1 placeholder:text-sm placeholder:text-[#8d9db5] text-[#8d9db5] outline-none"
          type="text"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;