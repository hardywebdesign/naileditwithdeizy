import Image from "next/image";
import { cn } from "@/lib/cn";

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Tailwind aspect ratio class */
  aspect?: string;
  /** "arch" = rounded top like a nail bed; "rounded" = soft corners */
  shape?: "arch" | "rounded";
}

/** A photo of Deizy's work, cropped to fill an arched or rounded frame. */
export function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  aspect = "aspect-[4/5]",
  shape = "arch",
}: PhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-blush",
        shape === "arch" ? "nail-arch" : "rounded-[2rem]",
        aspect,
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
