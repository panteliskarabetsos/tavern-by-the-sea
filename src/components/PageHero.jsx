import Photo from "./Photo";
import Reveal from "./Reveal";
import { Wave } from "./Logo";
import { photo } from "@/lib/photos";

/** Short hero for interior pages — sits under the fixed header. */
export default function PageHero({ eyebrow, title, blurb, src }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pt-20">
      <Photo src={photo(src)} alt="" priority sizes="100vw" watermark={false} />
      <div className="page-scrim absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 text-cream sm:px-8 sm:pb-20">
        <Reveal y={16}>
          {eyebrow && <p className="eyebrow text-seafoam">{eyebrow}</p>}
          <h1 className="font-display mt-4 text-5xl leading-[1.02] tracking-tight text-balance sm:text-7xl">
            {title}
          </h1>
          <Wave className="mt-6 h-2 w-24 text-seafoam/70" />
          {blurb && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 text-pretty">{blurb}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
