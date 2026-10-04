import { getTheme } from "@/lib/content";
import { SeasonMotif } from "@/components/Motif";

/** Seasonal message across the top of every page, set in the editor. */
export async function AnnouncementBar() {
  const { announcement } = await getTheme();
  if (!announcement?.trim()) return null;
  return (
    <div className="flex items-center justify-center gap-3 bg-lacquer-deep px-5 py-2.5 text-center text-xs tracking-wide text-on-deep sm:text-[0.8rem]">
      <SeasonMotif className="hidden size-3 shrink-0 opacity-70 sm:block" />
      <p>{announcement}</p>
      <SeasonMotif className="hidden size-3 shrink-0 opacity-70 sm:block" />
    </div>
  );
}
