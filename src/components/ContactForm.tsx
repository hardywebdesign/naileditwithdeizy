"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/(site)/contact/actions";
import { cn } from "@/lib/cn";

const topics = [
  { value: "custom", label: "Custom set request" },
  { value: "order", label: "Question about an order" },
  { value: "sizing", label: "Help with sizing" },
  { value: "other", label: "Something else" },
];

const initialState: ContactState = { status: "idle" };

/**
 * Contact / custom-order form. Submits to a Server Action
 * (src/app/contact/actions.ts) that emails Deizy through Resend.
 * Works without JavaScript too, since it's a plain form posting to the action.
 */
export function ContactForm({
  defaultTopic = "custom",
  defaultMessage = "",
}: {
  defaultTopic?: string;
  defaultMessage?: string;
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-[2rem] bg-blush/70 p-10 text-center">
        <p className="font-display text-3xl text-lacquer">Message sent.</p>
        <p className="mt-3 text-lg text-ink-soft">
          Thanks for reaching out. I&apos;ll reply by email, usually within a day or two.
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.errors ?? {};
  const field = (invalid?: string) =>
    cn(
      "mt-2 w-full rounded-2xl border bg-surface px-4 py-3 text-base text-ink",
      "placeholder:text-ink-soft/60 focus:outline-none focus:ring-2",
      invalid
        ? "border-lacquer-bright focus:ring-lacquer-bright/30"
        : "border-accent/30 focus:border-lacquer focus:ring-lacquer/25",
    );

  return (
    <form action={formAction} noValidate className="grid gap-6">
      {/* Honeypot field to catch spam bots; hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="font-medium">Your name</span>
          <input
            name="name"
            required
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
            className={field(err.name)}
          />
          {err.name && (
            <span id="name-error" className="mt-2 block text-sm text-lacquer-bright">
              {err.name}
            </span>
          )}
        </label>
        <label className="block">
          <span className="font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={v.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
            className={field(err.email)}
          />
          {err.email && (
            <span id="email-error" className="mt-2 block text-sm text-lacquer-bright">
              {err.email}
            </span>
          )}
        </label>
      </div>

      <label className="block">
        <span className="font-medium">What can I help with?</span>
        <select name="topic" defaultValue={v.topic ?? defaultTopic} className={field()}>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="font-medium">Message</span>
        <span id="message-hint" className="mt-1 block text-sm text-ink-soft">
          For a custom set, describe the colors, shape, length and any art you want. Include
          your sizes if you know them.
        </span>
        <textarea
          name="message"
          required
          rows={6}
          defaultValue={v.message ?? defaultMessage}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-hint message-error" : "message-hint"}
          className={field(err.message)}
        />
        {err.message && (
          <span id="message-error" className="mt-2 block text-sm text-lacquer-bright">
            {err.message}
          </span>
        )}
      </label>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-2xl bg-blush px-4 py-3 text-lacquer-deep">
          {state.message}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-12 items-center rounded-full bg-lacquer px-8 font-medium text-on-main",
            "transition-colors hover:bg-lacquer-deep disabled:opacity-60",
          )}
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
