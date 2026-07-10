"use client";

import Image from "next/image";
import { useState } from "react";
import { ScallopMark } from "./Logo";

/**
 * Fills its (positioned) parent. Drop a real file at `src` under /public and it
 * appears; until then this falls back to a scallop-watermarked plate so the
 * layout is never a broken-image icon. See public/images/README.md.
 */
export default function Photo({
  src,
  alt,
  slot,
  priority = false,
  sizes = "100vw",
  className = "",
  // Heroes overlay their own centred content — the watermark would collide.
  watermark = true,
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    // An empty alt means the photo is decorative — don't announce the fallback.
    const decorative = !alt;
    return (
      <div
        className={`grain absolute inset-0 grid place-items-center bg-gradient-to-br from-cream via-sand to-seafoam-soft ${className}`}
        role={decorative ? "presentation" : "img"}
        aria-label={decorative ? undefined : alt}
      >
        {watermark && (
          <div className="flex flex-col items-center gap-3 px-6 text-center text-brand/35">
            <ScallopMark className="h-12 w-12" />
            {slot && <span className="eyebrow text-[10px]">{slot}</span>}
          </div>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
