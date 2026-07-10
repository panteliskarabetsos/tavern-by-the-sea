import { Gift, Search, Sparkles, Ticket, ShoppingBag } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ScallopMark } from "@/components/Logo";
import { Button, OrderButton, Section, SectionHeading } from "@/components/ui";
import { site, external } from "@/lib/site";

export const metadata = {
  title: "Gift Cards & Rewards",
  description: `Buy a Tavern by the Sea gift card, check a balance, or join the rewards programme. Waterfront Mediterranean dining in ${site.town}.`,
  alternates: { canonical: "/gift-cards" },
};

const cards = [
  {
    icon: Gift,
    eyebrow: "Gift cards",
    title: "Give the table by the water",
    copy: "Digital gift cards arrive by email, in any amount, and never expire. They work on the patios, at the bar, and on takeaway orders.",
    actions: [
      { href: external.giftCards.buy, label: "Buy a gift card", variant: "solid" },
      { href: external.giftCards.balance, label: "Check a balance", variant: "outline", icon: Search },
    ],
  },
  {
    icon: Sparkles,
    eyebrow: "Rewards",
    title: "Loyalty has its perks",
    copy: "Earn points every time you eat with us — on the patio, at the bar, or at home. Points turn into food, and it costs nothing to join.",
    actions: [
      { href: external.rewards.signup, label: "Join the programme", variant: "solid" },
      { href: external.rewards.lookup, label: "Check your points", variant: "outline", icon: Ticket },
    ],
  },
];

export default function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift cards & rewards"
        title="Come back again"
        blurb="A gift card for someone who loves this water, and a rewards programme for those who never left."
        src="/images/bar.jpg"
      />

      <Section className="bg-cream">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <article className="flex h-full flex-col rounded-3xl border border-ink/10 bg-sand/30 p-9 sm:p-11">
                  <Icon className="text-brass" size={28} aria-hidden />
                  <p className="eyebrow mt-6 text-brass">{card.eyebrow}</p>
                  <h2 className="font-display mt-3 text-3xl leading-tight tracking-tight sm:text-4xl">
                    {card.title}
                  </h2>
                  <p className="mt-5 flex-1 leading-relaxed text-ink/65 text-pretty">{card.copy}</p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    {card.actions.map((a) => (
                      <Button key={a.label} href={a.href} variant={a.variant}>
                        {a.icon && <a.icon size={15} aria-hidden />}
                        {a.label}
                      </Button>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-ink/70 text-pretty">
            Gift cards and rewards are run through Toast, our point-of-sale provider. Those four
            links leave this site, and your card balance and points live in your Toast account —
            not with us.
          </p>
        </Reveal>
      </Section>

      {/* ---------- Order online ---------- */}
      <Section className="relative grain-light wash-deep bg-brand-deep text-cream">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <ShoppingBag className="text-seafoam" size={28} aria-hidden />
            <SectionHeading
              tone="cream"
              eyebrow="Takeaway"
              title="The whole menu, at your kitchen table"
              blurb="Order online and collect it at the door. The lemon potatoes travel better than you would think, and the whole branzino is worth the drive home."
            />
            <div className="mt-10">
              <OrderButton variant="ghost" />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="text-center">
            <ScallopMark className="mx-auto h-24 w-24 text-seafoam/25" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
