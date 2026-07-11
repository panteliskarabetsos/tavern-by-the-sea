import { MapPin, Phone, Mail, Clock, Car, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { ReserveButton, Section, SectionHeading } from "@/components/ui";
import { site, addressLine, mapsEmbedUrl, mapsLinkUrl, pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description: `Find Tavern by the Sea at ${addressLine}. Hours, directions, parking, dock space and private events on Wickford Cove.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan a visit"
        title="Contact"
        blurb="At the end of West Main Street, where the road runs out and the cove begins."
        src="/images/exterior.jpg"
      />

      <Section className="bg-cream">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Details" title="Everything you need before you come" />

            <dl className="mt-12 space-y-9">
              <div>
                <dt className="eyebrow flex items-center gap-3 text-ink/70">
                  <MapPin className="shrink-0 text-brass" size={18} aria-hidden />
                  Address
                </dt>
                <dd className="mt-3 pl-8">
                  <a href={mapsLinkUrl} target="_blank" rel="noreferrer" className="text-lg hover:text-brand">
                    {site.address.street}
                    <br />
                    {site.address.locality}, {site.address.region} {site.address.postalCode}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow flex items-center gap-3 text-ink/70">
                  <Phone className="shrink-0 text-brass" size={18} aria-hidden />
                  Reservations
                </dt>
                <dd className="mt-3 pl-8">
                  <a href={site.phoneHref} className="text-lg hover:text-brand">
                    {site.phone}
                  </a>
                  <p className="mt-1 text-sm text-ink/70">
                    Parties of six or more, please call. The bar is walk-in only.
                  </p>
                </dd>
              </div>

              <div>
                <dt className="eyebrow flex items-center gap-3 text-ink/70">
                  <Mail className="shrink-0 text-brass" size={18} aria-hidden />
                  Email
                </dt>
                <dd className="mt-3 pl-8">
                  <a href={`mailto:${site.email}`} className="text-lg hover:text-brand">
                    {site.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow flex items-center gap-3 text-ink/70">
                  <Clock className="shrink-0 text-brass" size={18} aria-hidden />
                  Hours
                </dt>
                <dd className="mt-3 space-y-1 pl-8">
                  {site.hours.map((h) => (
                    <p key={h.days} className="text-ink/75">
                      <span className="text-ink">{h.days}</span> · {h.time}
                    </p>
                  ))}
                  <p className="pt-2 text-sm text-ink/70 text-pretty">{site.hoursNote}</p>
                </dd>
              </div>
            </dl>

            <div className="mt-12">
              <ReserveButton />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full min-h-[520px] overflow-hidden bg-sand">
              <iframe
                src={mapsEmbedUrl}
                title={`Map showing ${site.name} in ${site.town}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="relative grain bg-sand/40">
        <div className="grid gap-12 sm:grid-cols-2">
          <Reveal>
            <Car className="text-brass" size={24} aria-hidden />
            <h2 className="font-display mt-5 text-3xl">Parking & arriving</h2>
            <p className="mt-4 leading-relaxed text-ink/65 text-pretty">
              There is a lot beside the building and free street parking along West Main. In July and August,
              leave a few extra minutes — Wickford fills up. Arriving by boat, there is dock space on the cove
              side; call ahead and we will keep an eye out for you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Users className="text-brass" size={24} aria-hidden />
            <h2 className="font-display mt-5 text-3xl">Private events</h2>
            <p className="mt-4 leading-relaxed text-ink/65 text-pretty">
              The upper patio can be taken in full for rehearsal dinners, birthdays and company nights, up to 48
              seated. Family-style Mediterranean menus, priced per head. Write to us and we will send the details.
            </p>
            <a
              href={`mailto:${site.email}?subject=Private%20event%20enquiry`}
              className="eyebrow mt-6 inline-block text-brand transition-colors hover:text-brass"
            >
              Enquire about an event →
            </a>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
