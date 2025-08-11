import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "btn-error",
      outline: "btn-outline",
      secondary: "btn-secondary",
      accent: "btn-accent",
      ghost: "btn-ghost",
      link: "btn-link",
    },
    size: {
      default: "btn-primary",
      sm: "btn-sm",
      lg: "btn-lg",
      icon: "size-auto border-none p-1 shadow-lg shadow-base-200",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
