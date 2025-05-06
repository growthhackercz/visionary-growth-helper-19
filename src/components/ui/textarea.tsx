
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
