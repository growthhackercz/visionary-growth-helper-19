
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card",
        glass: "backdrop-blur-lg bg-white/5 border-white/10",
        elevated: "backdrop-blur-lg bg-white/8 border-white/15 shadow-card-md",
        prominent: "backdrop-blur-xl bg-white/10 border-white/20 shadow-card-lg",
        gradient: "bg-gradient-to-br from-primary/10 via-secondary/5 to-secondary/10 border-white/10",
        success: "bg-success/10 border-success/20",
        warning: "bg-warning/10 border-warning/20",
        destructive: "bg-destructive/10 border-destructive/20",
        accent: "bg-accent/10 border-accent/20",
        // New variants
        interactive: "bg-card hover:bg-card/80 transition-colors cursor-pointer border-white/5 hover:border-white/20",
        highlighted: "backdrop-blur-lg bg-primary/5 border-primary/20 shadow-[0_0_15px_rgba(234,56,76,0.15)]",
        info: "backdrop-blur-lg bg-accent/5 border-accent/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
        action: "backdrop-blur-lg bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-250 cursor-pointer",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, size }), className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-heading-4 leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
