import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "flushed"
  icon?: React.ReactNode
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", icon, error, ...props }, ref) => (
    <div className="relative flex items-center">
      {icon && (
        <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">{icon}</div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          {
            "border-destructive focus-visible:ring-destructive": error,
            "pl-10": icon,
            "border-0 border-b-2 rounded-none bg-transparent": variant === "flushed",
            "bg-muted": variant === "filled",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  ),
)
Input.displayName = "Input"

export { Input }
