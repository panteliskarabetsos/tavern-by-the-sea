import Link from "next/link";
import { external } from "@/lib/site";
import { Wave } from "./Logo";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-[12px] uppercase tracking-[0.18em] font-medium transition-colors duration-300";

const variants = {
  solid: "bg-brand text-cream hover:bg-brand-deep",
  outline: "border border-current text-brand hover:bg-brand hover:text-cream",
  ghost: "border border-cream/45 text-cream hover:bg-cream hover:text-ink",
};

export function Button({ href, variant = "solid", className = "", children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const external = typeof href === "string" && /^(https?:|tel:|mailto:)/.test(href);

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/** Sends people to our own booking page, which hosts the OpenTable widget. */
export function ReserveButton({ variant = "solid", className = "", label, ...rest }) {
  return (
    <Button href="/reservations" variant={variant} className={className} {...rest}>
      {label ?? "Reserve a Table"}
    </Button>
  );
}

/** Toast handles takeaway ordering; this always leaves the site. */
export function OrderButton({ variant = "outline", className = "", children, ...rest }) {
  return (
    <Button href={external.orderOnline} variant={variant} className={className} {...rest}>
      {children ?? "Order Online"}
    </Button>
  );
}

export function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`px-6 sm:px-8 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, blurb, align = "left", tone = "ink" }) {
  const centered = align === "center";
  const sub = tone === "cream" ? "text-cream/70" : "text-ink/65";
  return (
    <header className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${tone === "cream" ? "text-seafoam" : "text-brass"}`}>{eyebrow}</p>}
      <h2 className="font-display mt-4 text-4xl sm:text-5xl leading-[1.05] tracking-tight text-balance">
        {title}
      </h2>
      <Wave className={`mt-5 h-2 w-20 text-brass/70 ${centered ? "mx-auto" : ""}`} />
      {blurb && <p className={`mt-6 text-[17px] leading-relaxed text-pretty ${sub}`}>{blurb}</p>}
    </header>
  );
}
