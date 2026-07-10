import { Sun, Anchor, Wine } from "lucide-react";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Wave } from "@/components/Logo";
import { ReserveButton, Section } from "@/components/ui";
import { site } from "@/lib/site";
import { photo } from "@/lib/photos";

export const metadata = {
  title: "The Patios & Bar",
  description:
    "Two waterfront patios and a full bar in Wickford, Rhode Island. The upper patio for the long view, the lower for the sound of the water.",
  alternates: { canonical: "/patios" },
};

const spaces = [
  {
    id: "upper",
    icon: Sun,
    eyebrow: "Upstairs",
    title: "The Upper Patio",
    src: "/images/upper-patio.jpg",
    slot: "Upper patio — awning and umbrellas",
    copy: [
      "The deck runs the length of the building under the green-and-white awning, a full storey above the cove. From here you can see the whole harbour: the moored boats, the stone seawall, the herons working the shallows at low tide.",
      "It catches the afternoon sun and holds it. Come at six in July and the light comes off the water sideways, gold, straight onto the table.",
    ],
    facts: ["Seats 48", "Awning-covered", "Best at sunset"],
  },
  {
    id: "lower",
    icon: Anchor,
    eyebrow: "Down at the waterline",
    title: "The Lower Patio",
    src: "/images/lower-patio.jpg",
    slot: "Lower patio — at the water's edge",
    copy: [
      "One flight down and you are level with the water. Umbrellas, the rail, and the cove three feet beyond it. Boats slide past close enough to nod at.",
      "It is the quieter of the two, and the one people ask for by name. If you want to hear the halyards ringing while you eat, this is the table.",
    ],
    facts: ["Seats 36", "Water's edge", "Dog friendly"],
  },
  {
    id: "bar",
    icon: Wine,
    eyebrow: "All year",
    title: "The Bar",
    src: "/images/bar.jpg",
    slot: "The bar",
    copy: [
      "Inside, out of the wind, with the windows thrown open when the weather allows. Assyrtiko from Santorini, ouzo poured cold and cloudy, a martini made properly and served very, very cold.",
      "First come, first served — no reservation needed. The kitchen sends out meze until close.",
    ],
    facts: ["Walk-ins only", "Open year-round", "Full meze menu"],
  },
];

export default function PatiosPage() {
  return (
    <>
      <PageHero
        eyebrow="Where to sit"
        title="Two patios, one cove"
        blurb="Both face the water. Choosing between them is the only difficult thing about eating here."
        src="/images/hero-aerial.jpg"
      />

      {spaces.map((space, i) => {
        const Icon = space.icon;
        const flipped = i % 2 === 1;
        return (
          <Section key={space.id} id={space.id} className={i % 2 ? "relative grain bg-sand/40" : "bg-cream"}>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={flipped ? "lg:order-2" : ""}>
                <div className="relative aspect-4/3 overflow-hidden">
                  <Photo
                    src={photo(space.src)}
                    alt={space.title}
                    slot={space.slot}
                    sizes="(min-width: 1024px) 50vw, 90vw"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1} className={flipped ? "lg:order-1" : ""}>
                <Icon className="text-brass" size={26} aria-hidden />
                <p className="eyebrow mt-6 text-brass">{space.eyebrow}</p>
                <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">{space.title}</h2>
                <Wave className="mt-5 h-2 w-20 text-brass/70" />

                <div className="mt-7 space-y-5">
                  {space.copy.map((p) => (
                    <p key={p.slice(0, 24)} className="leading-relaxed text-ink/65 text-pretty">
                      {p}
                    </p>
                  ))}
                </div>

                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                  {space.facts.map((f) => (
                    <li key={f} className="eyebrow rounded-full border border-ink/15 px-4 py-2 text-ink/55">
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Section>
        );
      })}

      <Section className="relative grain-light wash-deep bg-brand-deep text-center text-cream">
        <Reveal>
          <p className="eyebrow text-seafoam">Before you come</p>
          <p className="font-display mx-auto mt-6 max-w-2xl text-3xl leading-snug text-balance sm:text-4xl">
            {site.hoursNote}
          </p>
          <div className="mt-10 flex justify-center">
            <ReserveButton variant="ghost" />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
