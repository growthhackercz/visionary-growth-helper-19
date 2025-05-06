
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border border-input bg-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        glass: "bg-white/5 border-white/10 focus:border-white/20 focus:bg-white/10 px-3 py-2 transition-colors",
        filled: "bg-white/10 border-transparent focus:bg-white/15 px-3 py-2 transition-colors",
        underlined: "border-b border-input bg-transparent rounded-none px-3 py-2 focus:border-b-2 focus:border-primary",
        minimal: "border-none bg-transparent px-3 py-2 focus:bg-white/5",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
