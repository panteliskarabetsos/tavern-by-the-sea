import { siteUrl } from "@/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /careers renders dynamically only to read a server flag; nothing secret,
      // but its POST target is not a page — nothing to disallow.
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
