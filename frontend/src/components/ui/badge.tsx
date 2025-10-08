import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // Space Age Lounge: Rounded, bold text, 2px border minimum, 14px text
  "inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default: Tangerine background with deep walnut text
        default:
          "border-tangerine bg-tangerine text-deep-walnut hover:bg-[#FFA55F]",

        // Secondary: Atomic teal with white text
        secondary:
          "border-atomic-teal bg-atomic-teal text-white hover:bg-[#3BB5A5]",

        // Destructive: Coral pink with white text
        destructive:
          "border-coral-pink bg-coral-pink text-white hover:bg-[#FF8585]",

        // Outline: Warm gray border, champagne background
        outline:
          "border-warm-gray bg-white text-deep-walnut hover:bg-powder-blue",

        // Success: Atomic teal (same as secondary)
        success:
          "border-atomic-teal bg-atomic-teal text-white hover:bg-[#3BB5A5]",

        // Info: Powder blue with deep walnut text
        info:
          "border-powder-blue bg-powder-blue text-deep-walnut hover:bg-sky-blue",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
