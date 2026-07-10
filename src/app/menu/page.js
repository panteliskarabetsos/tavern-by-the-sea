import Reveal from "@/components/Reveal";
import { Wave } from "@/components/Logo";
import { ReserveButton, Section } from "@/components/ui";
import PageHero from "@/components/PageHero";
import { menu, drinks, menuNote } from "@/lib/menu";

export const metadata = {
  title: "Menu",
  description:
    "Meze, fish from Point Judith, charcoal-grilled lamb, and a Greek-leaning wine list. The menu at Tavern by the Sea, Wickford, Rhode Island.",
  alternates: { canonical: "/menu" },
};

const sections = [...menu, ...drinks];

function Price({ value }) {
  if (value == null) return <span className="italic text-ink/45">market</span>;
  return (
    <span>
      <span className="text-ink/40">$</span>
      {value}
    </span>
  );
}

function MenuSection({ section }) {
  return (
    <section id={section.id} className="scroll-mt-32">
      <header>
        <h2 className="font-display text-4xl tracking-tight sm:text-5xl">{section.title}</h2>
        <Wave className="mt-4 h-2 w-16 text-brass/70" />
        {section.blurb && <p className="mt-4 max-w-xl text-ink/60 text-pretty">{section.blurb}</p>}
      </header>

      <ul className="mt-10 space-y-7">
        {section.items.map((item) => (
          <li key={item.name}>
            <div className="flex items-baseline gap-4">
              <h3 className="font-display text-2xl leading-none">{item.name}</h3>
              {item.tag && (
                <span className="eyebrow rounded-full bg-brass/12 px-2.5 py-1 text-[9px] text-brass">
                  {item.tag}
                </span>
              )}
              <span aria-hidden className="h-px flex-1 translate-y-[-2px] border-b border-dotted border-ink/25" />
              <span className="font-display text-xl tabular-nums text-ink/80">
                <Price value={item.price} />
              </span>
            </div>
            {item.desc && <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink/55">{item.desc}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Kitchen & bar"
        title="The Menu"
        blurb="Greek at the root, New England on the plate. Everything below has been on a table facing this water."
        src="/images/dish-branzino.jpg"
      />

      <Section className="bg-cream">
        <div className="grid gap-16 lg:grid-cols-[200px_1fr] lg:gap-20">
          {/* Sticky in-page nav */}
          <nav aria-label="Menu sections" className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-ink/40">Jump to</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 lg:flex-col lg:gap-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink/60 transition-colors hover:text-brand">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-24">
            {menu.map((section, i) => (
              <Reveal key={section.id} delay={Math.min(i, 2) * 0.05}>
                <MenuSection section={section} />
              </Reveal>
            ))}

            <Reveal>
              <div className="rule-fade h-px" />
              <p className="eyebrow mt-16 text-brass">The Bar</p>
              <p className="font-display mt-3 max-w-lg text-3xl leading-snug text-balance">
                Poured until an hour past the kitchen, on both patios.
              </p>
            </Reveal>

            {drinks.map((section, i) => (
              <Reveal key={section.id} delay={Math.min(i, 2) * 0.05}>
                <MenuSection section={section} />
              </Reveal>
            ))}

            <Reveal>
              <p className="border-t border-ink/10 pt-8 text-sm leading-relaxed text-ink/50 text-pretty">
                {menuNote}
              </p>
              <div className="mt-10">
                <ReserveButton />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
