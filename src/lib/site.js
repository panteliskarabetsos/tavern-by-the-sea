// Single source of truth for everything that shows up in more than one place.
export const site = {
  name: "Tavern by the Sea",
  tagline: "Mediterranean cooking on the water",
  established: 2006,
  town: "Wickford, Rhode Island",

  // Wickford is a village within North Kingstown — both names are correct, and
  // the OpenTable and Toast slugs use "north-kingstown" / the street address.
  address: {
    street: "16 West Main Street",
    locality: "Wickford",
    municipality: "North Kingstown",
    region: "RI",
    postalCode: "02852",
    country: "US",
  },

  phone: "(401) 294-5771",
  phoneHref: "tel:+14012945771",
  email: "hello@tavernbytheseari.com", // TODO(owner): confirm — not verified.
  careersEmail: "careers@tavernbytheseari.com", // TODO(owner): confirm.

  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  // Hours read off the restaurant's OpenTable listing, July 2026. Seasonal —
  // confirm before launch, and remember the patios open weather permitting.
  hours: [
    { days: "Monday", time: "Closed", closed: true },
    { days: "Tuesday – Saturday", time: "11:30am – 8:30pm" },
    { days: "Sunday", time: "11:30am – 4:00pm" },
  ],
  hoursNote:
    "The bar pours an hour past the kitchen. Patios are seasonal and open weather permitting.",

  // schema.org openingHours, kept next to the human-readable list above so the
  // two cannot drift apart unnoticed.
  openingHoursSpec: ["Tu-Sa 11:30-20:30", "Su 11:30-16:00"],
};

/**
 * Everything that leaves our domain. OpenTable's embeddable widget is keyed by a
 * numeric restaurant id (`rid`), not the vanity slug — 1098700 is read from the
 * `restref` parameter on the restaurant's own site.
 */
export const external = {
  openTable: {
    rid: "1098700",
    // Canonical booking page, used as the fallback whenever the widget is blocked.
    url: "https://www.opentable.com/r/tavern-by-the-sea-reservations-north-kingstown?restref=1098700&lang=en-US&ot_source=Restaurant%20website",
  },
  orderOnline: "https://www.toasttab.com/tavern-by-the-sea-16-west-main-street",
  giftCards: {
    buy: "https://order.toasttab.com/egiftcards/tavern-by-the-sea-16-west-main-street",
    balance: "https://www.toasttab.com/tavern-by-the-sea-16-west-main-street/findcard",
  },
  rewards: {
    signup: "https://www.toasttab.com/tavern-by-the-sea-16-west-main-street/rewardsSignup",
    lookup: "https://www.toasttab.com/tavern-by-the-sea-16-west-main-street/rewardsLookup",
  },
};

export const addressLine = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;

export const mapsQuery = encodeURIComponent(`${site.name}, ${addressLine}`);
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/patios", label: "The Patios" },
  { href: "/story", label: "Our Story" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/contact", label: "Contact" },
];

// The mobile panel repeats Reserve as a button, so it omits the Reservations link.
export const mobileNav = [...nav, { href: "/careers", label: "Join Our Team" }];

export const footerNav = [
  ...nav,
  { href: "/reservations", label: "Reservations" },
  { href: "/careers", label: "Join Our Team" },
];
