import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light" | "outline-light";
type Size = "sm" | "md";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-lacquer text-on-main hover:bg-lacquer-deep",
  outline: "border border-lacquer text-lacquer hover:bg-lacquer hover:text-on-main",
  /** For use on a lacquer (main color) background */
  light: "bg-on-main text-lacquer hover:opacity-90",
  /** Outline button for use on a lacquer (main color) background */
  "outline-light": "border border-on-main text-on-main hover:bg-on-main hover:text-lacquer",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-base",
};

/** A link styled as a button. Use for navigation and external checkout links. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        "transition-colors duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
    />
  );
}
