import { ScallopMark } from "@/components/Logo";
import { Button } from "@/components/ui";

export const metadata = {
  title: "Page not found",
  // Next injects its own noindex for not-found; without this the root layout's
  // robots (index, follow) ALSO renders and the page emits two conflicting tags.
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-6 pt-20 text-center">
      <div>
        <ScallopMark className="mx-auto h-12 w-12 text-brand/40" />
        <p className="eyebrow mt-8 text-brass">404</p>
        <h1 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">This page slipped its mooring</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink/70 text-pretty">
          Whatever you were looking for is not here. The patios, happily, still are.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to the tavern</Button>
          <Button href="/menu" variant="outline">
            View the menu
          </Button>
        </div>
      </div>
    </section>
  );
}
