"use client";

import { useEffect, useRef, useState } from "react";
import { external } from "@/lib/site";

const WIDGET_SRC =
  `https://www.opentable.com/widget/reservation/canvas` +
  `?rid=${external.openTable.rid}` +
  `&type=standard&theme=standard&overlay=false&iframe=true` +
  `&domain=com&lang=en-US&newtab=true&ot_source=Restaurant%20website`;

/**
 * OpenTable's own loader script just injects this iframe, so we embed it
 * directly rather than pull in third-party JavaScript.
 *
 * The iframe is cross-origin, so we cannot inspect whether it rendered. If it
 * has not fired `load` shortly after mount — ad blockers and strict tracking
 * protection routinely block opentable.com — we surface the direct booking link
 * instead of leaving a blank rectangle.
 */
export default function OpenTableWidget() {
  const [state, setState] = useState("loading"); // loading | ready | blocked
  const frame = useRef(null);

  useEffect(() => {
    // If the iframe already loaded before hydration, `load` will never fire.
    if (frame.current?.dataset.loaded === "true") {
      setState("ready");
      return;
    }
    const timer = setTimeout(() => {
      setState((s) => (s === "ready" ? s : "blocked"));
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  if (state === "blocked") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-cream p-8 text-center">
        <p className="text-ink/70 text-pretty">
          The booking widget could not load — a browser extension or privacy setting is most
          likely blocking it.
        </p>
        <a
          href={external.openTable.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-7 py-3 text-[12px] font-medium tracking-[0.18em] text-cream uppercase transition-colors hover:bg-brand-deep"
        >
          Book on OpenTable
        </a>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-ink/10 bg-cream p-4">
      {state === "loading" && (
        <p className="eyebrow absolute text-ink/70" aria-hidden>
          Loading availability…
        </p>
      )}
      <iframe
        ref={frame}
        src={WIDGET_SRC}
        title="Book a table at Tavern by the Sea on OpenTable"
        onLoad={(e) => {
          e.currentTarget.dataset.loaded = "true";
          setState("ready");
        }}
        className={`relative h-[301px] w-[224px] border-0 transition-opacity duration-500 ${
          state === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
