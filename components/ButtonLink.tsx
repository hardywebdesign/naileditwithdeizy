import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light" | "outline-light" | "deep" | "outline-deep";
type Size = "sm" | "md";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-lacquer text-on-main shadow-[0_10px_30px_-12px_var(--color-lacquer)] hover:bg-lacquer-deep hover:-translate-y-0.5",
  outline: "border border-lacquer/60 text-lacquer hover:border-lacquer hover:bg-lacquer hover:text-on-main",
  /** For use on a lacquer (main color) background */
  light: "bg-on-main text-lacquer hover:opacity-90",
  /** Outline button for use on a lacquer (main color) background */
  "outline-light": "border border-on-main text-on-main hover:bg-on-main hover:text-lacquer",
  /** For use on a lacquer-deep (dark band) background */
  deep: "bg-on-deep text-lacquer-deep hover:-translate-y-0.5",
  /** Outline button for use on a lacquer-deep background */
  "outline-deep": "border border-on-deep/50 text-on-deep hover:border-on-deep hover:bg-on-deep hover:text-lacquer-deep",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8rem]",
  md: "h-13 px-8 text-[0.95rem]",
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
        "inline-flex items-center justify-center rounded-full font-semibold tracking-wide",
        "transition-all duration-300",
        variants[variant],
        sizes[size],
        className,
      )}
    />
  );
}
