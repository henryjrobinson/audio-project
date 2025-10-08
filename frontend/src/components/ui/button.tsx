import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles: Pill-shaped, 18px text, minimum 44px height, semibold
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-semibold transition-all duration-normal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-md hover:shadow-lg hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        // Primary: Tangerine button (main CTAs)
        default: "bg-tangerine text-deep-walnut border-none hover:bg-[#FFA55F] focus-visible:ring-tangerine/50",

        // Secondary: Atomic Teal button
        secondary: "bg-atomic-teal text-white border-none hover:bg-[#3BB5A5] focus-visible:ring-atomic-teal/50",

        // Destructive: Coral Pink for destructive actions
        destructive: "bg-coral-pink text-white border-none hover:bg-[#FF8585] focus-visible:ring-coral-pink/50",

        // Outline: Warm Gray border, champagne background
        outline: "border-2 border-warm-gray bg-white text-deep-walnut hover:bg-powder-blue focus-visible:ring-warm-gray/50",

        // Ghost: Transparent with hover state
        ghost: "bg-transparent text-deep-walnut hover:bg-powder-blue hover:text-deep-walnut focus-visible:ring-atomic-teal/30",

        // Link: Underlined, follows link styles
        link: "text-atomic-teal underline underline-offset-[3px] decoration-2 hover:text-sky-blue hover:decoration-[3px] bg-transparent shadow-none hover:shadow-none",
      },
      size: {
        // Default: 44px minimum (WCAG minimum)
        default: "min-h-touch rounded-pill px-6 py-3",

        // Small: Still meets 44px minimum
        sm: "min-h-touch rounded-pill px-4 py-2",

        // Large: 56px comfortable (preferred for primary CTAs)
        lg: "min-h-touch-comfortable rounded-pill px-8 py-4 text-lg",

        // Icon: Square with 44px minimum
        icon: "min-h-touch min-w-touch rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
