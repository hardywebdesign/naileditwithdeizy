import type { Metadata } from "next";
import Editor from "./editor";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const editorReady =
  process.env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT);

/** The admin editor at /admin. In production it needs Keystatic Cloud (see README). */
export default function AdminLayout() {
  if (!editorReady) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl text-lacquer">The editor isn&apos;t connected yet</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Set NEXT_PUBLIC_KEYSTATIC_PROJECT in Vercel to turn on editing. The README explains how.
        </p>
      </main>
    );
  }
  return <Editor />;
}
