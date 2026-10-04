import Link from "next/link";
import { Photo } from "@/components/Photo";

interface SetCardProps {
  title: string;
  image: string | null;
  style?: string;
  /** Show a "Request this set" link to the contact form */
  requestable?: boolean;
  priority?: boolean;
}

/** One of Deizy's designs from the gallery. */
export function SetCard({ title, image, style, requestable, priority }: SetCardProps) {
  return (
    <article>
      {image && (
        <Photo
          src={image}
          alt={`${title} press-on nail set`}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
        />
      )}
      <h3 className="mt-4 font-display text-xl text-ink md:text-2xl">{title}</h3>
      {style && <p className="text-sm text-ink-soft">{style}</p>}
      {requestable && (
        <Link
          href={`/contact?topic=custom&set=${encodeURIComponent(title)}`}
          className="mt-2 inline-block text-sm font-medium text-lacquer underline decoration-1 underline-offset-4 hover:text-lacquer-deep"
        >
          Request this set
        </Link>
      )}
    </article>
  );
}
