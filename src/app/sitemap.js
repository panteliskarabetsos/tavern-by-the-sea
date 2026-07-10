import { siteUrl } from "@/lib/site";

// Static marketing routes. Keep in sync with the app/ directory — there is no
// dynamic content to enumerate.
const routes = [
  { path: "/", priority: 1.0 },
  { path: "/menu", priority: 0.9 },
  { path: "/reservations", priority: 0.9 },
  { path: "/patios", priority: 0.8 },
  { path: "/gift-cards", priority: 0.7 },
  { path: "/story", priority: 0.6 },
  { path: "/careers", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap() {
  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
