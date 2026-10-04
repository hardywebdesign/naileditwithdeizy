import { cn } from "@/lib/cn";

/**
 * The text logo. "Nailed It With Deizy" is set as "Nailed It" with
 * "with Deizy" in italic gold; any other name shows as written.
 */
export function Wordmark({
  name,
  className,
  accentClass = "text-accent",
}: {
  name: string;
  className?: string;
  accentClass?: string;
}) {
  const match = name.match(/^(.+?)\s+(with\s+.+)$/i);
  return (
    <span className={cn("whitespace-nowrap font-display tracking-tight", className)}>
      {match ? (
        <>
          {match[1]}{" "}
          <span className={cn("font-normal italic", accentClass)}>{match[2].replace(/^with/i, "with")}</span>
        </>
      ) : (
        name
      )}
    </span>
  );
}
