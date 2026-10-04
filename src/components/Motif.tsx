import type { Motif as MotifName } from "@/lib/palettes";
import { getTheme } from "@/lib/content";
import { resolveMotif, type ThemeSetting } from "@/lib/theme";
import { cn } from "@/lib/cn";

/** Simple filled shapes on a 24×24 grid. They take the current text color. */
const paths: Record<MotifName, string> = {
  leaf: "M12 1.5l1.6 3.6 2.6-1.2-.5 4.1 3.6-1.4-1 3 3.2 1.1-3.4 2.8.9 1.6-4.5-.4.3 3.1-2.6-1.6L12 22.5l-.2-6.3-2.6 1.6.3-3.1-4.5.4.9-1.6-3.4-2.8 3.2-1.1-1-3 3.6 1.4-.5-4.1 2.6 1.2z",
  bat: "M12 8.2c.6-1 1.1-1.6 1.6-1.9l.2 1.6c1.6-.4 2.9-.4 3.9.1C19.5 6 21.2 5.4 23 5.6c-1.3 1.3-1.8 3.1-1.5 5.3-1.4-.6-2.7-.5-3.8.3-.8-.9-2-1.2-3.4-.8-.7.9-1.4 1.6-2.3 2.1-.9-.5-1.6-1.2-2.3-2.1-1.4-.4-2.6-.1-3.4.8-1.1-.8-2.4-.9-3.8-.3.3-2.2-.2-4-1.5-5.3 1.8-.2 3.5.4 5.3 2.4 1-.5 2.3-.5 3.9-.1l.2-1.6c.5.3 1 .9 1.6 1.9z",
  snowflake:
    "M11 1h2v4.2l2.3-2.3 1.4 1.4L13 8v2.3l2-1.2 1.3-5 1.9.5-.8 3.1 3.6-2.1 1 1.7-3.6 2.1 3.1.8-.5 1.9-5-1.3-2 1.2 2 1.2 5-1.3.5 1.9-3.1.8 3.6 2.1-1 1.7-3.6-2.1.8 3.1-1.9.5-1.3-5-2-1.2V16l3.7 3.7-1.4 1.4-2.3-2.3V23h-2v-4.2l-2.3 2.3-1.4-1.4L11 16v-2.3l-2 1.2-1.3 5-1.9-.5.8-3.1-3.6 2.1-1-1.7 3.6-2.1-3.1-.8.5-1.9 5 1.3 2-1.2-2-1.2-5 1.3-.5-1.9 3.1-.8L1 6.4l1-1.7 3.6 2.1-.8-3.1 1.9-.5 1.3 5 2 1.2V8L7.3 4.3l1.4-1.4L11 5.2z",
  heart:
    "M12 21.3l-1.4-1.3C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.6 11.5z",
  blossom:
    "M12 2.5c1.6 0 2.8 1.5 2.6 3.4 1.6-1 3.6-.6 4.1.9.5 1.5-.6 3.2-2.4 3.7 1.7.8 2.4 2.7 1.5 4-.9 1.3-2.9 1.3-4.2 0 .1 1.9-1.1 3.4-2.6 3.4h-.1c-1.5 0-2.7-1.5-2.6-3.4-1.3 1.3-3.3 1.3-4.2 0-.9-1.3-.2-3.2 1.5-4-1.8-.5-2.9-2.2-2.4-3.7.5-1.5 2.5-1.9 4.1-.9-.2-1.9 1-3.4 2.6-3.4zm0 6.6a2.4 2.4 0 100 4.8 2.4 2.4 0 000-4.8z",
  sun: "M12 6.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zM11 0h2v4h-2zm0 20h2v4h-2zM0 11h4v2H0zm20 0h4v2h-4zM3.5 4.9l1.4-1.4 2.8 2.8-1.4 1.4zm12.8 12.8l1.4-1.4 2.8 2.8-1.4 1.4zM3.5 19.1l2.8-2.8 1.4 1.4-2.8 2.8zM16.3 6.3l2.8-2.8 1.4 1.4-2.8 2.8z",
  sparkle: "M12 0c.7 6.2 2.6 9.6 12 12-9.4 2.4-11.3 5.8-12 12-.7-6.2-2.6-9.6-12-12 9.4-2.4 11.3-5.8 12-12z",
};

interface MotifProps {
  name: MotifName;
  className?: string;
}

/** One seasonal drawing. Decorative, so hidden from screen readers. */
export function MotifIcon({ name, className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={cn("size-4", className)}>
      <path d={paths[name]} fill="currentColor" />
    </svg>
  );
}

/** The current theme's drawing, read from the editor's theme setting. */
export async function SeasonMotif({ className }: { className?: string }) {
  const theme = await getTheme();
  return (
    <MotifIcon name={resolveMotif(theme.palette as ThemeSetting)} className={className} />
  );
}

/** A thin gold rule with the season's drawing in the middle. */
export async function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-3 text-accent", className)}>
      <span className="h-px w-10 bg-current opacity-50" />
      <SeasonMotif className="size-3.5" />
      <span className="h-px w-10 bg-current opacity-50" />
    </div>
  );
}

/**
 * A few drawings drifting slowly across a section, like leaves falling
 * past a window. Purely decorative; stops for people who reduce motion.
 */
export async function DriftingMotifs({ className }: { className?: string }) {
  const theme = await getTheme();
  const name = resolveMotif(theme.palette as ThemeSetting);
  const items = [
    { left: "6%", size: "size-5", delay: "0s", duration: "19s" },
    { left: "22%", size: "size-3", delay: "-7s", duration: "23s" },
    { left: "44%", size: "size-4", delay: "-13s", duration: "21s" },
    { left: "63%", size: "size-6", delay: "-4s", duration: "26s" },
    { left: "81%", size: "size-3.5", delay: "-16s", duration: "20s" },
    { left: "93%", size: "size-4", delay: "-10s", duration: "24s" },
  ];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {items.map((item, i) => (
        <span
          key={i}
          className="drift absolute -top-10"
          style={{ left: item.left, animationDelay: item.delay, animationDuration: item.duration }}
        >
          <MotifIcon name={name} className={item.size} />
        </span>
      ))}
    </div>
  );
}
