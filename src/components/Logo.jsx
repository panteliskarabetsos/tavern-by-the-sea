// Scallop mark: an ellipse arc scalloped into 7 lobes, flanks tapering to a
// flat hinge with ears. Ribs radiate from the hinge and are cut as real holes
// (fill-rule="evenodd") so the mark sits on any background.
const MARK_PATH =
  "M 7.57 39.55 Q 4.78 32.96 6.52 26.05 Q 7.71 19.02 12.94 14 Q 17.76 8.6 24.96 6.93 Q 32 4.75 39.04 6.93 Q 46.24 8.6 51.06 14 Q 56.29 19.02 57.48 26.05 Q 59.22 32.96 56.43 39.55 C 55 45 41.5 49 40.5 51.4 A 1.6 1.6 0 0 1 38.9 53 L 25.1 53 A 1.6 1.6 0 0 1 23.5 51.4 C 22.5 49 9 45 7.57 39.55 Z M 26.74 48.66 L 10.75 27.17 A 2.5 2.5 0 0 0 6.94 30.41 L 25.6 49.63 A 0.75 0.75 0 0 0 26.74 48.66 Z M 28.96 47.49 L 16.7 16.24 A 2.5 2.5 0 0 0 12.15 18.31 L 27.6 48.11 A 0.75 0.75 0 0 0 28.96 47.49 Z M 31.46 46.98 L 27.94 10.14 A 2.5 2.5 0 0 0 22.99 10.85 L 29.98 47.2 A 0.75 0.75 0 0 0 31.46 46.98 Z M 34.02 47.2 L 41.01 10.85 A 2.5 2.5 0 0 0 36.06 10.14 L 32.54 46.98 A 0.75 0.75 0 0 0 34.02 47.2 Z M 36.4 48.11 L 51.85 18.31 A 2.5 2.5 0 0 0 47.3 16.24 L 35.04 47.49 A 0.75 0.75 0 0 0 36.4 48.11 Z M 38.4 49.63 L 57.06 30.41 A 2.5 2.5 0 0 0 53.25 27.17 L 37.26 48.66 A 0.75 0.75 0 0 0 38.4 49.63 Z";

export function ScallopMark({ className = "", title }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      <path fillRule="evenodd" clipRule="evenodd" d={MARK_PATH} />
    </svg>
  );
}

/**
 * The full lockup. `stacked` centres the mark above the wordmark (hero, footer);
 * the default sits them side by side (header).
 *
 * `wordmarkAs="h1"` renders the wordmark as the page heading — pass it once per
 * page (the home hero) so the site's most important page has a real <h1>.
 */
export function Logo({ stacked = false, showTown = true, wordmarkAs: Wordmark = "span", className = "" }) {
  if (stacked) {
    return (
      <span className={`flex flex-col items-center gap-4 ${className}`}>
        <ScallopMark className="w-14 h-14" />
        <span className="flex flex-col items-center gap-2.5">
          <Wordmark className="font-display uppercase leading-none tracking-[0.16em] text-[clamp(1.75rem,5.5vw,3.25rem)]">
            Tavern by the Sea
          </Wordmark>
          <Wave className="w-24 h-2 opacity-60" />
          {/* Opaque on purpose: at 11px over a photograph, translucent type blends
              toward whatever is behind it and loses its own contrast. */}
          {showTown && <span className="eyebrow">Wickford, Rhode Island · Est. 2006</span>}
        </span>
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <ScallopMark className="w-8 h-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display uppercase tracking-[0.14em] text-[15px] sm:text-[17px]">
          Tavern by the Sea
        </span>
        {showTown && (
          <span className="eyebrow mt-1 text-[9px] opacity-60">Est. 2006 · Wickford, RI</span>
        )}
      </span>
    </span>
  );
}

export function Wave({ className = "" }) {
  return (
    <svg viewBox="0 0 100 8" className={className} aria-hidden="true" fill="none">
      <path
        d="M0 4 C 8 0, 17 0, 25 4 S 42 8, 50 4 S 67 0, 75 4 S 92 8, 100 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
