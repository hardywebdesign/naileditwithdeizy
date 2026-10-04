"use server";

import { Resend } from "resend";
import { getBusiness } from "@/lib/content";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  /** Field-level errors, keyed by input name */
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  /** What the person typed, so the form keeps it after an error */
  values?: Record<string, string>;
};

const topics: Record<string, string> = {
  custom: "Custom set request",
  order: "Question about an order",
  sizing: "Help with sizing",
  other: "Something else",
};

/**
 * Handles the contact / custom-order form.
 *
 * Emails the submission to Deizy through Resend (free tier). Environment
 * variables, set in Vercel > Project > Settings > Environment Variables:
 *   RESEND_API_KEY      required in production
 *   CONTACT_TO_EMAIL    where messages go (defaults to business.email)
 *   CONTACT_FROM_EMAIL  sender; defaults to Resend's test sender until
 *                       Deizy's domain is verified in Resend
 */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    topic: String(formData.get("topic") ?? "other"),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot: real people never fill this hidden field. Pretend it worked.
  if (formData.get("website")) return { status: "sent" };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter an email address like name@example.com.";
  if (values.message.length < 10)
    errors.message = "Add a few more details so I can help.";
  if (values.message.length > 5000)
    errors.message = "Keep your message under 5,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Check the highlighted fields.", errors, values };
  }

  const business = await getBusiness();
  const topicLabel = topics[values.topic] ?? topics.other;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without a key: log instead of emailing.
      console.log("[contact form] RESEND_API_KEY not set, message not emailed:", values);
      return { status: "sent" };
    }
    console.error("[contact form] RESEND_API_KEY is missing in production");
    return {
      status: "error",
      message: `The form isn't connected yet. Email ${business.email} instead.`,
      values,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_FROM_EMAIL ||
      `${business.name} website <onboarding@resend.dev>`,
    to: process.env.CONTACT_TO_EMAIL || business.email,
    replyTo: values.email,
    subject: `${topicLabel} from ${values.name}`,
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Topic: ${topicLabel}`,
      "",
      values.message,
      "",
      "Reply to this email to answer them directly.",
    ].join("\n"),
  });

  if (error) {
    console.error("[contact form] Resend error:", error);
    return {
      status: "error",
      message: `Your message didn't send. Try again, or email ${business.email} directly.`,
      values,
    };
  }

  return { status: "sent" };
}
