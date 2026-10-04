import { getTheme } from "@/lib/content";

/** Seasonal message across the top of every page, set in the editor. */
export async function AnnouncementBar() {
  const { announcement } = await getTheme();
  if (!announcement?.trim()) return null;
  return (
    <div className="bg-ink px-5 py-2 text-center text-xs text-pearl sm:text-sm">{announcement}</div>
  );
}
