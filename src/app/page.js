import Link from "next/link";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { Logo, ScallopMark, Wave } from "@/components/Logo";
import { Button, ReserveButton, OrderButton, Section, SectionHeading } from "@/components/ui";
import { site, addressLine, mapsLinkUrl, mapsEmbedUrl } from "@/lib/site";
import { photo } from "@/lib/photos";

export const metadata = { alternates: { canonical: "/" } };

const patios = [
  {
    href: "/patios#upper",
    src: "/images/upper-patio.jpg",
    slot: "Upper patio",
    title: "The Upper Patio",
    copy: "Perched over the cove under the green-and-white awning. Long lunches, longer sunsets.",
  },
  {
    href: "/patios#lower",
    src: "/images/lower-patio.jpg",
    slot: "Lower patio",
    title: "The Lower Patio",
    copy: "Right down at the water's edge, close enough to hear the halyards ring against the masts.",
  },
  {
    href: "/patios#bar",
    src: "/images/bar.jpg",
    slot: "The bar",
    title: "The Bar",
    copy: "Ouzo, Assyrtiko, and a proper martini — poured an hour past the kitchen.",
  },
];

const dishes = [
  { src: "/images/dish-octopus.jpg", slot: "Grilled octopus", name: "Grilled Octopus", desc: "Charred tender, red wine vinegar, capers, oregano" },
  { src: "/images/dish-branzino.jpg", slot: "Whole branzino", name: "Whole Branzino", desc: "Grilled over coals, ladolemono, charred lemon" },
  { src: "/images/dish-lamb.jpg", slot: "Lamb chops", name: "Lamb Chops", desc: "Oregano and garlic, lemon potatoes, tzatziki" },
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <Photo
          src={photo("/images/hero-aerial.jpg")}
          alt="Tavern by the Sea seen from above, its striped awning and umbrellas lining the water in Wickford"
          priority
          sizes="100vw"
          watermark={false}
        />
        <div className="hero-scrim absolute inset-0" />

        <div className="relative z-10 px-6 text-center text-cream">
          <Reveal y={16}>
            <Logo stacked />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream text-pretty">
              Mediterranean cooking on the water, two patios deep, in the oldest harbour village in Rhode Island.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ReserveButton variant="ghost" />
              <Button href="/menu" variant="ghost">
                View the Menu
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50">
          <Wave className="h-3 w-16 animate-pulse" />
        </div>
      </section>

      {/* ---------- Story strip ---------- */}
      <Section className="bg-cream">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow={`Est. ${site.established}`}
              title="Twenty years on this water"
              blurb="We opened in a shingled building at the end of Main Street because of the view, and we stayed because of the people who kept coming back. The cooking is Mediterranean — Greek at its root, coastal New England in its ingredients. The fish is landed at Point Judith. The olive oil comes from one grove."
            />
            <Link
              href="/story"
              className="eyebrow group mt-8 inline-flex items-center gap-2 text-brand transition-colors hover:text-brass"
            >
              Read our story
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-4/5 overflow-hidden rounded-t-[999px]">
              <Photo
                src={photo("/images/story.jpg")}
                alt="The dining room and shingled exterior of Tavern by the Sea"
                slot="The building"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Patios ---------- */}
      <Section className="relative grain bg-sand/50">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Where to sit"
            title="Two patios and a bar, all of them facing the water"
            blurb="Take the upper deck for the long view, the lower for the sound of it. Both are seasonal and both fill up — a table is worth calling ahead for."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {patios.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.1}>
              <Link href={p.href} className="group block">
                <div className="relative aspect-4/5 overflow-hidden">
                  <Photo
                    src={photo(p.src)}
                    alt={p.title}
                    slot={p.slot}
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <h3 className="font-display absolute inset-x-6 bottom-5 text-3xl text-cream">{p.title}</h3>
                </div>
                <p className="mt-5 leading-relaxed text-ink/65 text-pretty">{p.copy}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Menu highlights ---------- */}
      <Section className="relative grain-light wash-deep bg-brand-deep text-cream">
        <Reveal>
          <SectionHeading
            align="center"
            tone="cream"
            eyebrow="From the kitchen"
            title="Charcoal, lemon, olive oil, salt"
            blurb="A short list of things we would be sad to take off the menu."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {dishes.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.1} className="text-center">
              <div className="relative mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-full">
                <Photo src={photo(d.src)} alt={d.name} slot={d.slot} sizes="(min-width: 640px) 260px, 80vw" />
              </div>
              <h3 className="font-display mt-7 text-2xl">{d.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65 text-pretty">{d.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex justify-center">
            <Button href="/menu" variant="ghost">
              See the full menu
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ---------- Visit ---------- */}
      <Section className="bg-cream">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Plan a visit" title="Come find us in Wickford" />

            <dl className="mt-10 space-y-8">
              <div>
                <dt className="eyebrow flex items-center gap-3 text-ink/50">
                  <MapPin className="shrink-0 text-brass" size={18} aria-hidden />
                  Address
                </dt>
                <dd className="mt-3 pl-8">
                  <a href={mapsLinkUrl} target="_blank" rel="noreferrer" className="text-lg hover:text-brand">
                    {addressLine}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow flex items-center gap-3 text-ink/50">
                  <Clock className="shrink-0 text-brass" size={18} aria-hidden />
                  Hours
                </dt>
                <dd className="mt-3 space-y-1 pl-8">
                  {site.hours.map((h) => (
                    <p key={h.days} className="text-ink/75">
                      <span className="text-ink">{h.days}</span> · {h.time}
                    </p>
                  ))}
                  <p className="pt-2 text-sm text-ink/50 text-pretty">{site.hoursNote}</p>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <ReserveButton />
              <OrderButton />
              <Button href="/contact" variant="outline">
                Contact & private events
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full min-h-[420px] overflow-hidden bg-sand">
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

      {/* ---------- Closer ---------- */}
      <Section className="relative grain bg-sand/50 text-center">
        <Reveal>
          <ScallopMark className="mx-auto h-10 w-10 text-brand/40" />
          <p className="font-display mx-auto mt-8 max-w-3xl text-3xl leading-snug text-balance sm:text-4xl">
            &ldquo;The best seat in Wickford, and the kitchen knows it.&rdquo;
          </p>
          <p className="eyebrow mt-6 text-ink/45">A regular, since the first summer</p>
        </Reveal>
      </Section>
    </>
  );
}
