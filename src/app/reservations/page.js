import { Phone, Users, Umbrella, Wine } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import OpenTableWidget from "@/components/OpenTableWidget";
import { Button, Section, SectionHeading } from "@/components/ui";
import { site, external, pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Reservations",
  description: `Book a table at Tavern by the Sea in ${site.town}. Waterfront patios, a full bar, and Mediterranean cooking since ${site.established}.`,
  path: "/reservations",
});

const notes = [
  {
    icon: Users,
    title: "Six or more",
    copy: `Large parties are booked by phone so we can seat you together. Call ${site.phone} and we will find you a table.`,
  },
  {
    icon: Wine,
    title: "The bar is walk-in",
    copy: "Seats at the bar are never reserved. Come as you are — the full meze menu is served there until close.",
  },
  {
    icon: Umbrella,
    title: "Patio seating",
    copy: "Both patios are seasonal and weather permitting. We cannot guarantee an outdoor table, but tell us you would like one and we will do our best.",
  },
];

export default function ReservationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a table"
        title="Reservations"
        blurb="Pick a date and a time below. If the boats are in and the sun is out, come early — the lower patio goes first."
        src="/images/lower-patio.jpg"
      />

      <Section className="bg-cream">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="OpenTable"
              title="Find a table"
              blurb="Availability is live. Booking is handled by OpenTable, so you will get their confirmation email and can change or cancel from it."
            />

            <div className="mt-10 space-y-8">
              {notes.map(({ icon: Icon, title, copy }) => (
                <div key={title}>
                  <h3 className="flex items-center gap-3 font-display text-2xl">
                    <Icon className="shrink-0 text-brass" size={20} aria-hidden />
                    {title}
                  </h3>
                  <p className="mt-2 pl-8 leading-relaxed text-ink/65 text-pretty">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={site.phoneHref} variant="outline">
                <Phone size={15} aria-hidden />
                {site.phone}
              </Button>
              <Button href={external.openTable.url} variant="outline">
                Open in OpenTable
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:w-[320px]">
            <div className="lg:sticky lg:top-32">
              <OpenTableWidget />
              <p className="mt-4 text-center text-sm text-ink/70 text-pretty">
                Booked through OpenTable. Their{" "}
                <a
                  href="https://www.opentable.com/legal/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-brand"
                >
                  privacy policy
                </a>{" "}
                applies inside the widget.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="relative grain bg-sand/40">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Before you arrive"
            title="A few small things"
            blurb={site.hoursNote}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mx-auto mt-14 max-w-2xl">
            {site.hours.map((h) => (
              <div
                key={h.days}
                className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4 last:border-0"
              >
                <dt className="text-ink">{h.days}</dt>
                <dd className={h.closed ? "text-ink/70 italic" : "text-ink/70"}>{h.time}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>
    </>
  );
}
