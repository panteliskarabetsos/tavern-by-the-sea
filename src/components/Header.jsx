"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ReserveButton, OrderButton } from "./ui";
// The mobile panel has room for the full set; the desktop bar does not.
import { nav, mobileNav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only the home hero sits under a transparent header.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = overHero && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        transparent ? "bg-transparent" : "bg-cream/95 backdrop-blur-md border-b border-ink/8"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-8 h-20">
        <Link
          href="/"
          aria-label="Tavern by the Sea — home"
          onClick={() => setOpen(false)}
          className={`transition-colors duration-500 ${transparent ? "text-cream" : "text-brand"}`}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`eyebrow relative py-1 transition-colors duration-300 ${
                  transparent ? "text-cream/85 hover:text-cream" : "text-ink/70 hover:text-brand"
                } ${active ? "!text-brass" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <span aria-hidden className={`h-4 w-px ${transparent ? "bg-cream/30" : "bg-ink/15"}`} />
          <OrderButton
            variant={transparent ? "ghost" : "outline"}
            className="!px-5 !py-2.5 !text-[11px]"
          />
          <ReserveButton
            label="Reserve"
            variant={transparent ? "ghost" : "solid"}
            className="!px-5 !py-2.5 !text-[11px]"
          />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`-mr-2 p-2 transition-colors xl:hidden ${transparent ? "text-cream" : "text-brand"}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-ink/8 bg-cream px-6 pb-10 pt-6 xl:hidden"
        >
          <ul className="flex flex-col">
            {mobileNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display block border-b border-ink/8 py-4 text-2xl tracking-wide text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ReserveButton className="w-full" onClick={() => setOpen(false)} />
            <OrderButton className="w-full" onClick={() => setOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  );
}
