import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site, external, addressLine, siteUrl, mapsLinkUrl } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // 58 chars — Google truncates around 60, and the old 82-char version lost
    // "...Wickford, Rhode Island", which is the part local queries match on.
    default: `${site.name} · Mediterranean & Seafood · Wickford, RI`,
    template: `%s · ${site.name}`,
  },
  description: `Mediterranean cuisine on the water in Wickford, Rhode Island since 2006. Two waterfront patios, a full bar, and fish landed at Point Judith.`,
  keywords: [
    "Tavern by the Sea",
    "Wickford restaurant",
    "Mediterranean restaurant Rhode Island",
    "waterfront dining Wickford",
    "seafood restaurant North Kingstown",
    "restaurants in Wickford RI",
  ],
  // No `title` here — omitting it lets each page's own <title> become its
  // og:title, so sharing /menu reads "Menu", not the homepage tagline.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    description: `Waterfront Mediterranean & seafood dining in ${site.town}. Est. ${site.established}.`,
  },
  twitter: {
    card: "summary_large_image",
    description: `Waterfront Mediterranean & seafood dining in ${site.town}.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // No `alternates` here on purpose. App Router inherits metadata from parent
  // segments, so a root canonical of "/" would stamp every page as a duplicate
  // of the homepage. Each route declares its own.
};

// Rich result for local search — Google reads this for hours, address, geo and
// menu. Only real, verified links go in `sameAs`; placeholders are excluded so
// we never point search engines at a dead profile.
const sameAs = [
  site.social.facebook,
  external.openTable.url,
  external.orderOnline,
].filter((u) => u && !/instagram\.com\/?$|facebook\.com\/?$/.test(u));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: site.name,
  url: siteUrl,
  image: [`${siteUrl}/images/hero-aerial.jpg`],
  description: `Mediterranean and seafood cooking on the water in ${site.town} since ${site.established}. Two waterfront patios, a full bar, and fish landed at Point Judith.`,
  servesCuisine: site.cuisine,
  priceRange: site.priceRange,
  telephone: site.phoneE164,
  email: site.email,
  currenciesAccepted: "USD",
  foundingDate: String(site.established),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  hasMap: mapsLinkUrl,
  areaServed: ["Wickford", "North Kingstown", "Narragansett", "South County, Rhode Island"],
  // Monday is intentionally omitted — days not listed read as closed.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:30",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:30",
      closes: "16:00",
    },
  ],
  hasMenu: `${siteUrl}/menu`,
  acceptsReservations: true,
  // Only features the site itself claims: the patios, the bar, Toast takeaway.
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Outdoor waterfront seating", value: true },
    { "@type": "LocationFeatureSpecification", name: "Full bar", value: true },
    { "@type": "LocationFeatureSpecification", name: "Takeout", value: true },
  ],
  sameAs,
  potentialAction: [
    {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: external.openTable.url,
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform",
        ],
      },
      result: { "@type": "FoodEstablishmentReservation", name: `Reserve at ${site.name}` },
    },
    {
      "@type": "OrderAction",
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModePickUp"],
      target: {
        "@type": "EntryPoint",
        urlTemplate: external.orderOnline,
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform",
        ],
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
