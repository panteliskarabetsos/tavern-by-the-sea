import { ImageResponse } from "next/og";

// One branded 1200×630 card for the whole site (inherited by every route).
// Generated rather than a static file so it needs no design asset and stays in
// sync with the palette. PNG output is the most scraper-compatible format.
export const alt = "Tavern by the Sea — Mediterranean cooking on the water in Wickford, Rhode Island";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK =
  "M 7.57 39.55 Q 4.78 32.96 6.52 26.05 Q 7.71 19.02 12.94 14 Q 17.76 8.6 24.96 6.93 Q 32 4.75 39.04 6.93 Q 46.24 8.6 51.06 14 Q 56.29 19.02 57.48 26.05 Q 59.22 32.96 56.43 39.55 C 55 45 41.5 49 40.5 51.4 A 1.6 1.6 0 0 1 38.9 53 L 25.1 53 A 1.6 1.6 0 0 1 23.5 51.4 C 22.5 49 9 45 7.57 39.55 Z M 26.74 48.66 L 10.75 27.17 A 2.5 2.5 0 0 0 6.94 30.41 L 25.6 49.63 A 0.75 0.75 0 0 0 26.74 48.66 Z M 28.96 47.49 L 16.7 16.24 A 2.5 2.5 0 0 0 12.15 18.31 L 27.6 48.11 A 0.75 0.75 0 0 0 28.96 47.49 Z M 31.46 46.98 L 27.94 10.14 A 2.5 2.5 0 0 0 22.99 10.85 L 29.98 47.2 A 0.75 0.75 0 0 0 31.46 46.98 Z M 34.02 47.2 L 41.01 10.85 A 2.5 2.5 0 0 0 36.06 10.14 L 32.54 46.98 A 0.75 0.75 0 0 0 34.02 47.2 Z M 36.4 48.11 L 51.85 18.31 A 2.5 2.5 0 0 0 47.3 16.24 L 35.04 47.49 A 0.75 0.75 0 0 0 36.4 48.11 Z M 38.4 49.63 L 57.06 30.41 A 2.5 2.5 0 0 0 53.25 27.17 L 37.26 48.66 A 0.75 0.75 0 0 0 38.4 49.63 Z";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0f4a53 0%, #14606b 100%)",
          color: "#fbf8f2",
          fontFamily: "Georgia, serif",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 64 64" fill="#9bd0d9">
          <path fillRule="evenodd" d={MARK} />
        </svg>
        <div
          style={{
            marginTop: 40,
            fontSize: 82,
            letterSpacing: 10,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Tavern by the Sea
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9bd0d9",
            display: "flex",
          }}
        >
          Wickford, Rhode Island · Est. 2006
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 26,
            color: "rgba(251,248,242,0.85)",
            display: "flex",
          }}
        >
          Mediterranean cooking on the water
        </div>
      </div>
    ),
    { ...size },
  );
}
