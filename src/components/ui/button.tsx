
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        outline:
          "border border-input bg-transparent hover:bg-accent/10 hover:text-accent-foreground active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-white hover:bg-success/90 active:scale-[0.98]",
        warning: "bg-warning text-white hover:bg-warning/90 active:scale-[0.98]",
        accent: "bg-accent text-white hover:bg-accent/90 active:scale-[0.98]",
        glass: "backdrop-blur-lg bg-white/10 border border-white/10 hover:bg-white/20 active:scale-[0.98]",
        "glass-accent": "backdrop-blur-lg bg-accent/20 border border-accent/20 text-white hover:bg-accent/30 active:scale-[0.98]",
        "glass-primary": "backdrop-blur-lg bg-primary/20 border border-primary/20 text-white hover:bg-primary/30 active:scale-[0.98]",
        // New variants
        info: "bg-accent text-white hover:bg-accent/90 active:scale-[0.98]",
        "outline-primary": "border border-primary/30 text-primary bg-transparent hover:bg-primary/10 active:scale-[0.98]",
        "outline-accent": "border border-accent/30 text-accent bg-transparent hover:bg-accent/10 active:scale-[0.98]",
        "outline-success": "border border-success/30 text-success bg-transparent hover:bg-success/10 active:scale-[0.98]",
        "outline-warning": "border border-warning/30 text-warning bg-transparent hover:bg-warning/10 active:scale-[0.98]",
        "outline-destructive": "border border-destructive/30 text-destructive bg-transparent hover:bg-destructive/10 active:scale-[0.98]",
        "soft-primary": "bg-primary/10 text-primary hover:bg-primary/20 active:scale-[0.98]",
        "soft-accent": "bg-accent/10 text-accent hover:bg-accent/20 active:scale-[0.98]",
        "soft-success": "bg-success/10 text-success hover:bg-success/20 active:scale-[0.98]",
        "soft-warning": "bg-warning/10 text-warning hover:bg-warning/20 active:scale-[0.98]",
        "soft-destructive": "bg-destructive/10 text-destructive hover:bg-destructive/20 active:scale-[0.98]",
        gradient: "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
