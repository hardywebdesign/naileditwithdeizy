import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getBusiness, getPolicies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Policies",
  description: "Turnaround, shipping, pickup, damaged sets and sizing.",
};

export default async function PoliciesPage() {
  const [{ items }, business] = await Promise.all([getPolicies(), getBusiness()]);
  return (
    <>
      <PageIntro
        title="Policies"
        intro="The details on turnaround, shipping and what happens if something isn't right."
      />
      <section className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((p) => (
            <div key={p.title} className="grid gap-4 py-10 md:grid-cols-[1fr_2fr]">
              <h2 className="font-display text-3xl text-lacquer">{p.title}</h2>
              <p className="text-lg leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-ink-soft">
          Questions about a policy? Email{" "}
          <a
            href={`mailto:${business.email}`}
            className="text-lacquer underline decoration-1 underline-offset-4"
          >
            {business.email}
          </a>
          .
        </p>
      </section>
    </>
  );
}
