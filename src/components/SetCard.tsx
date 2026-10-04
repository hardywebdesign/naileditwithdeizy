import Image from "next/image";
import Link from "next/link";

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
  const href = `/contact?topic=custom&set=${encodeURIComponent(title)}`;
  return (
    <article className="group">
      {image && (
        <div className="nail-arch relative aspect-[4/5] overflow-hidden bg-blush ring-1 ring-accent/25 ring-offset-4 ring-offset-pearl transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-24px_var(--color-lacquer)]">
          <Image
            src={image}
            alt={`${title} press-on nail set`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}
      <div className="mt-5 text-center">
        {style && <p className="eyebrow text-[0.65rem] text-ink-soft">{style}</p>}
        <h3 className="mt-1 font-display text-xl text-ink md:text-2xl">{title}</h3>
        {requestable && (
          <Link
            href={href}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-lacquer transition-colors hover:text-lacquer-deep"
          >
            Request this set
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
