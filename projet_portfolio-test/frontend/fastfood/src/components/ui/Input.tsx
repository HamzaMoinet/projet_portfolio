import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${className}`}
    {...props}
  />
));

Input.displayName = "Input";
export default Input;
