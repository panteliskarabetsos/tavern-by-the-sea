import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { ScallopMark } from "@/components/Logo";
import { Button, Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";
import { photo } from "@/lib/photos";

export const metadata = {
  title: "Our Story",
  description: `Tavern by the Sea has cooked Mediterranean food on the water in Wickford, Rhode Island since ${site.established}.`,
  alternates: { canonical: "/story" },
};

const values = [
  {
    title: "The fish is local",
    copy: "Landed at Point Judith, most of it that morning. When the boats stay in, the menu changes. We would rather rewrite a menu than serve fish that has been travelling.",
  },
  {
    title: "The cooking is Greek",
    copy: "Charcoal, lemon, olive oil, salt, and restraint. The chef's grandmother would recognise every dish on the menu, if not every fish.",
  },
  {
    title: "The room is the harbour",
    copy: "We have never hung much on the walls. The windows do that work, and so does the water they look at.",
  },
];

const timeline = [
  { year: "2006", text: "Doors open in a shingled building at the end of West Main Street, with twelve tables and one patio." },
  { year: "2011", text: "The lower deck is built out to the seawall. It becomes the table everyone asks for." },
  { year: "2018", text: "The kitchen goes to charcoal. Whole fish, grilled over coals, arrives on the menu and never leaves." },
  { year: "Today", text: "Two patios, a full bar, and a dining room that still fills first on a rainy Tuesday in February." },
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow={`Est. ${site.established}`}
        title="Our Story"
        blurb="A tavern on the water in the oldest harbour village in Rhode Island, cooking the food of a sea five thousand miles away."
        src="/images/story.jpg"
      />

      <Section className="bg-cream">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="How it began"
              title="We came for the view and stayed for the regulars"
            />
            <div className="mt-8 space-y-5 leading-relaxed text-ink/65 text-pretty">
              <p>
                In 2006 this was a tired building with a good deck and an extraordinary view of Wickford Cove.
                The lease was signed on the strength of the water alone. The cooking came after — Greek, because
                that is the food the family knew, and because it turns out that the Aegean and Narragansett Bay
                want the same things from a fish: fire, lemon, oil, and no interference.
              </p>
              <p>
                Twenty years on, the same boats moor outside. Some of the same people sit at the bar. The menu has
                grown, the deck has doubled, and the kitchen has learned that the best thing it can do to a
                scallop landed that morning is very little.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-3/4 overflow-hidden rounded-t-[999px]">
              <Photo
                src={photo("/images/exterior.jpg")}
                alt="The shingled exterior of Tavern by the Sea from the water"
                slot="Exterior from the water"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Timeline ---------- */}
      <Section className="relative grain bg-sand/40">
        <Reveal>
          <SectionHeading align="center" eyebrow="Along the way" title="Twenty years, briefly" />
        </Reveal>

        <ol className="mx-auto mt-16 max-w-3xl">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <li className="flex gap-8 border-b border-ink/10 py-8 last:border-0 sm:gap-14">
                <span className="font-display w-20 shrink-0 text-2xl text-brass sm:w-28 sm:text-3xl">
                  {t.year}
                </span>
                <p className="leading-relaxed text-ink/70 text-pretty">{t.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------- Values ---------- */}
      <Section className="relative grain-light wash-deep bg-brand-deep text-cream">
        <Reveal>
          <SectionHeading
            align="center"
            tone="cream"
            eyebrow="What we hold to"
            title="Three things we do not negotiate"
          />
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <ScallopMark className="h-8 w-8 text-seafoam" />
              <h3 className="font-display mt-6 text-2xl">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-cream/65 text-pretty">{v.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex justify-center">
            <Button href="/menu" variant="ghost">
              See what we are cooking
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
