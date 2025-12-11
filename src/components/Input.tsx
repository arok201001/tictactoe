import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label>{label}</label>
        
        <input ref={ref} {...props} />
        
        {error && <p>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;