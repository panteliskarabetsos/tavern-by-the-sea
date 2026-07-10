import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site, external, addressLine } from "@/lib/site";

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
  metadataBase: new URL("https://tavernbytheseari.com"),
  title: {
    default: `${site.name} — ${site.tagline} in ${site.town}`,
    template: `%s · ${site.name}`,
  },
  description: `Mediterranean cuisine on the water in Wickford, Rhode Island since 2006. Two waterfront patios, a full bar, and fish landed at Point Judith.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: `Waterfront Mediterranean dining in ${site.town}. Est. ${site.established}.`,
  },
  // No `alternates` here on purpose. App Router inherits metadata from parent
  // segments, so a root canonical of "/" would stamp every page as a duplicate
  // of the homepage. Each route declares its own.
};

// Rich result for local search — Google reads this for hours, address and menu.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: "Mediterranean",
  priceRange: "$$$",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHours: site.openingHoursSpec,
  hasMenu: "/menu",
  foundingDate: String(site.established),
  description: `Mediterranean cooking on the water at ${addressLine}.`,
  acceptsReservations: external.openTable.url,
  potentialAction: {
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
