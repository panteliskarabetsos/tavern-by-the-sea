import fs from "node:fs";
import path from "node:path";

// Server-only. Resolves a /images/* path to itself if the file is really there,
// otherwise to null so <Photo> renders its placeholder without firing a request
// at the image optimizer. Drop a file into public/images and it lights up.
const DIR = path.join(process.cwd(), "public", "images");

function read() {
  try {
    return new Set(fs.readdirSync(DIR));
  } catch {
    return new Set();
  }
}

// Cache in production (the folder can't change); re-read in dev so a newly
// added photo appears without restarting the server.
const cached = process.env.NODE_ENV === "production" ? read() : null;

export function photo(src) {
  if (!src) return null;
  const names = cached ?? read();
  return names.has(src.replace(/^\/images\//, "")) ? src : null;
}
