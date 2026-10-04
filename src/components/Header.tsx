"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { ButtonLink } from "@/components/ButtonLink";
import { cn } from "@/lib/cn";

export function Header({ businessName }: { businessName: string }) {
  const pathname = usePathname();
  // The menu remembers which page it was opened on, so it closes itself
  // automatically after navigating to a different page.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggle = () => setOpenOn(open ? null : pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-pearl/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:h-20">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-xl italic tracking-tight text-lacquer sm:text-2xl md:text-[1.7rem]"
        >
          {businessName}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "underline-offset-8 transition-colors hover:text-lacquer",
                      active ? "text-lacquer underline decoration-1" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href="/book" size="sm">
              Book a consultation
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-ink hover:bg-blush lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform",
                  open && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={cn("border-t border-ink/10 bg-pearl lg:hidden", !open && "hidden")}
      >
        <ul className="mx-auto max-w-6xl px-5 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-3 font-display text-2xl text-ink hover:text-lacquer"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <ButtonLink href="/book" className="w-full">
              Book a consultation
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
