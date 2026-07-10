import Link from "next/link";
import { Logo } from "./Logo";
import { site, external, addressLine, mapsLinkUrl, footerNav } from "@/lib/site";

// Everything here leaves our domain; Toast and OpenTable own these flows.
const offsite = [
  { href: external.orderOnline, label: "Order Online" },
  { href: external.giftCards.buy, label: "Buy a Gift Card" },
  { href: external.giftCards.balance, label: "Check Card Balance" },
  { href: external.rewards.signup, label: "Join Rewards" },
  { href: external.rewards.lookup, label: "Check Rewards Points" },
];

// lucide-react dropped brand marks in v1, so these two live here.
function Instagram({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.5 2.5h-2.7a4.8 4.8 0 0 0-4.8 4.8v2.7H7v4h3v8h4v-8h3l1-4h-4V7.3a1 1 0 0 1 1-1h2.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-cream">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-20">
        <div className="flex justify-center">
          <Logo stacked />
        </div>

        <div className="mt-16 grid gap-12 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
          <div>
            <h3 className="eyebrow text-seafoam">Find Us</h3>
            <a
              href={mapsLinkUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-cream/80 not-italic leading-relaxed hover:text-cream"
            >
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </a>
            <a href={site.phoneHref} className="mt-3 block text-cream/80 hover:text-cream">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block text-cream/80 hover:text-cream">
              {site.email}
            </a>
          </div>

          <div>
            <h3 className="eyebrow text-seafoam">Hours</h3>
            <ul className="mt-4 space-y-2 text-cream/80">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <span className="block text-sm">{h.days}</span>
                  <span className={`block ${h.closed ? "text-cream/70 italic" : "text-cream/70"}`}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-seafoam">Explore</h3>
            <ul className="mt-4 space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-seafoam">Order & Gift</h3>
            <ul className="mt-4 space-y-2">
              {offsite.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cream/80 hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center gap-4 sm:justify-start">
              <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-cream/70 hover:text-cream">
                <Instagram size={20} />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-cream/70 hover:text-cream">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-16 border-t border-cream/15 pt-8 text-center text-xs text-cream/70">
          © {new Date().getFullYear()} {site.name} · {addressLine}
        </p>
      </div>
    </footer>
  );
}
