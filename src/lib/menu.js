export const menuNote =
  "Our menu turns with the season and with what the boats bring in, so a dish or two may change without notice. Please tell your server about any allergies.";

export const menu = [
  {
    id: "meze",
    title: "Meze",
    blurb: "Small plates, made to be passed around the table.",
    items: [
      { name: "Grilled Octopus", price: 21, desc: "Charred tender, red wine vinegar, capers, oregano" },
      { name: "Whipped Feta", price: 14, desc: "Hot honey, Aleppo pepper, warm sesame pita" },
      { name: "Saganaki", price: 16, desc: "Pan-seared kefalograviera, flamed tableside, lemon" },
      { name: "Wickford Littlenecks", price: 18, desc: "White wine, garlic, chili, grilled bread" },
      { name: "Spanakopita", price: 13, desc: "Spinach, dill, three cheeses, hand-stretched phyllo" },
      { name: "Marinated Olives & Almonds", price: 9, desc: "Warm, with orange zest and thyme" },
      { name: "Dip Trio", price: 17, desc: "Tzatziki, taramosalata, roasted eggplant, pita" },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    items: [
      { name: "Horiatiki", price: 16, desc: "Tomato, cucumber, red onion, caper berries, feta slab" },
      { name: "Beet & Whipped Feta", price: 15, desc: "Roasted beets, pistachio, mint, orange" },
      { name: "Little Gem", price: 14, desc: "Ladolemono, shaved pecorino, oregano breadcrumb" },
    ],
  },
  {
    id: "sea",
    title: "From the Sea",
    blurb: "Fish comes up from Point Judith most mornings.",
    items: [
      { name: "Whole Branzino", price: 38, desc: "Grilled over coals, ladolemono, charred lemon", tag: "Signature" },
      { name: "Seared Scallops", price: 39, desc: "Fava purée, brown butter, capers, dill" },
      { name: "Grilled Swordfish", price: 36, desc: "Salsa verde, gigante beans, blistered tomato" },
      { name: "Seafood Orzo", price: 34, desc: "Shrimp, clams, mussels, saffron tomato broth" },
      { name: "Lobster Kritharaki", price: 46, desc: "Whole lobster, baked orzo, ouzo, feta" },
      { name: "Catch of the Day", price: null, desc: "Ask your server — priced daily" },
    ],
  },
  {
    id: "land",
    title: "From the Land",
    items: [
      { name: "Lamb Chops", price: 42, desc: "Oregano and garlic, lemon potatoes, tzatziki", tag: "Signature" },
      { name: "Chicken Souvlaki", price: 27, desc: "Charcoal-grilled, pita, pickled onion, skordalia" },
      { name: "Moussaka", price: 26, desc: "Eggplant, spiced beef, béchamel, baked to order" },
      { name: "Braised Short Rib", price: 34, desc: "Stifado spices, pearl onion, hilopites" },
      { name: "Dry-Aged Ribeye", price: 52, desc: "16oz, olive oil and sea salt, lemon-dressed greens" },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      { name: "Lemon Potatoes", price: 9 },
      { name: "Charred Broccolini", price: 10, desc: "Chili, garlic, lemon" },
      { name: "Gigante Beans", price: 9, desc: "Slow-baked in tomato and dill" },
      { name: "Grilled Pita", price: 5 },
    ],
  },
  {
    id: "sweets",
    title: "Sweets",
    items: [
      { name: "Baklava", price: 12, desc: "Walnut, honey, cinnamon ice cream" },
      { name: "Galaktoboureko", price: 12, desc: "Semolina custard, phyllo, orange syrup" },
      { name: "Loukoumades", price: 11, desc: "Honey doughnuts, sesame, crushed pistachio" },
      { name: "Olive Oil Cake", price: 11, desc: "Mascarpone, macerated berries" },
    ],
  },
];

export const drinks = [
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      { name: "Wickford Spritz", price: 15, desc: "Aperol, prosecco, grapefruit, sea salt" },
      { name: "Salt & Sea Margarita", price: 16, desc: "Blanco tequila, lime, orange, smoked salt rim" },
      { name: "Aegean Mule", price: 15, desc: "Vodka, ouzo, cucumber, ginger beer" },
      { name: "The Scallop", price: 17, desc: "Gin, dry vermouth, olive brine, lemon oil" },
      { name: "Ouzo Sour", price: 14, desc: "Ouzo, lemon, honey, egg white" },
    ],
  },
  {
    id: "wine",
    title: "Wine by the Glass",
    items: [
      { name: "Assyrtiko, Santorini", price: 16, desc: "Bone dry, saline, built for oysters" },
      { name: "Moschofilero, Peloponnese", price: 13, desc: "Rose petal, citrus, light" },
      { name: "Provençal Rosé", price: 14, desc: "Strawberry, herb, bracing" },
      { name: "Agiorgitiko, Nemea", price: 15, desc: "Plum, clove, soft tannin" },
      { name: "Prosecco", price: 12 },
    ],
  },
  {
    id: "beer",
    title: "Beer",
    items: [
      { name: "Narragansett Lager", price: 6 },
      { name: "Whalers Rise", price: 8 },
      { name: "Fiddlehead IPA", price: 9 },
      { name: "Mythos", price: 8 },
      { name: "Rotating Local Draft", price: null, desc: "Ask the bar" },
    ],
  },
];
