import { HandHeart, GraduationCap, Sun } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ApplicationForm from "@/components/ApplicationForm";
import { Section, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = {
  title: "Join Our Team",
  description: `Work at Tavern by the Sea in ${site.town}. Front of house, kitchen and bar roles on the water, since ${site.established}.`,
  alternates: { canonical: "/careers" },
};

const perks = [
  {
    icon: HandHeart,
    title: "A room worth working in",
    copy: "Two patios, a harbour, and a team that has largely stayed. Shift meals are cooked properly, not scraped together.",
  },
  {
    icon: GraduationCap,
    title: "You will learn something",
    copy: "Whole fish over charcoal, a proper ladolemono, an actual wine list. Cooks here leave knowing more than they arrived with.",
  },
  {
    icon: Sun,
    title: "Seasonal or year-round",
    copy: "Summer runs hard and we hire for it. But the dining room fills on a rainy February Tuesday too, and we want people who stay.",
  },
];

// `configured` is read at render time. Without this the page prerenders at build
// and the "not connected" banner would survive adding RESEND_API_KEY later.
export const dynamic = "force-dynamic";

export default function CareersPage() {
  // Read on the server so we can tell the applicant up front, rather than let
  // them type a whole application into a form that cannot deliver it.
  const configured = Boolean(process.env.RESEND_API_KEY);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join our team"
        blurb="We are usually looking for good people — on the line, behind the bar, and out on the patios."
        src="/images/upper-patio.jpg"
      />

      <Section className="bg-cream">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why here"
            title="Twenty years, and still the best view in Wickford"
          />
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <Icon className="text-brass" size={26} aria-hidden />
              <h3 className="font-display mt-6 text-2xl">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink/65 text-pretty">{copy}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="relative grain bg-sand/40">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              align="center"
              eyebrow="Apply"
              title="Tell us about yourself"
              blurb="No cover letter required. A few honest sentences will tell us more than a page of formatting."
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-2xl">
            <ApplicationForm
              configured={configured}
              careersEmail={site.careersEmail}
              phone={site.phone}
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
