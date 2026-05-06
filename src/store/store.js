// ============================================================
//  HOW MOU KHOW MOMO — Central Data Store
//  Update prices and menu items here. All pages auto-update.
// ============================================================

export const SITE_INFO = {
  name: "How Mou Khow Momo",
  tagline: "Midnapore's Favourite Momo Stall",
  description:
    "Authentic handcrafted momos served hot in Midnapore, West Bengal. From steamed to pan-fried, chilli to butter masala — every bite is a burst of flavour.",
  phone: "8016304918",
  email: "howmoukhowmomo@gmail.com",
  address: "Panchur Chawk, Head Post Office Road, Dharma, Midnapore – 721101, West Bengal",
  city: "Midnapore",
  state: "West Bengal",
  pincode: "721101",
  googleMapLink: "https://maps.app.goo.gl/A8MEkNGjoE6q2XSC8",
  openHours: "11:00 AM – 10:00 PM",
  openDays: "Monday – Sunday",
  socialLinks: {
    instagram: "#",
    facebook: "#",
    whatsapp: "https://wa.me/918016304918",
  },
};

// ─── MENU CATEGORIES ────────────────────────────────────────
// Each item has: name, half (5 pcs), full (8 pcs), tag (optional)
// tag options: "bestseller" | "musttry" | "vegonly" | "new"
// image: path relative to /public/images/

export const MENU = [
  {
    category: "Steamed Momos",
    description: "Classic soft steamed momos, served with our secret red chutney.",
    image: "/images/steamed.png",
    items: [
      { name: "Veggie Momo", half: 55, full: 85, tag: "vegonly" },
      { name: "Chicken Momo", half: 65, full: 100, tag: "bestseller" },
      { name: "Paneer Momo", half: 65, full: 100 },
    ],
  },
  {
    category: "Kurkure Momos",
    description: "Crispy outside, juicy inside — the crunch you cannot resist.",
    image: "/images/kurkure.png",
    items: [
      { name: "Veggie Kurkure", half: 65, full: 100 },
      { name: "Paneer Kurkure", half: 70, full: 110 },
      { name: "Chicken Kurkure", half: 75, full: 115 },
    ],
  },
  {
    category: "Cheese Momos",
    description: "Oozing cheese filling — the ultimate indulgence.",
    image: "/images/kurkure.png",
    items: [
      { name: "Veggie Cheese", half: 75, full: 115, tag: "musttry" },
      { name: "Paneer Cheese", half: 80, full: 120 },
      { name: "Chicken Cheese", half: 85, full: 125, tag: "bestseller" },
    ],
  },
  {
    category: "Crunchy Momos",
    description: "Double-fried for extra crunch, tossed in special seasoning.",
    image: "/images/fried.png",
    items: [
      { name: "Veggie Crunchy", half: 70, full: 110 },
      { name: "Paneer Crunchy", half: 75, full: 115 },
      { name: "Chicken Crunchy", half: 80, full: 120 },
    ],
  },
  {
    category: "Pan Fried Momos",
    description: "Golden pan-fried perfection — available in Schezwan or Tomato sauce.",
    image: "/images/panfried.png",
    items: [
      { name: "Veggie Pan Fried (Schezwan)", half: 75, full: 115 },
      { name: "Veggie Pan Fried (Tomato)", half: 70, full: 110, tag: "vegonly" },
      { name: "Paneer Pan Fried (Schezwan)", half: 80, full: 120 },
      { name: "Paneer Pan Fried (Tomato)", half: 75, full: 115 },
      { name: "Chicken Pan Fried (Schezwan)", half: 85, full: 125, tag: "musttry" },
      { name: "Chicken Pan Fried (Tomato)", half: 80, full: 120 },
    ],
  },
  {
    category: "Fried Momos",
    description: "Deep fried to golden brown — simple and delicious.",
    image: "/images/fried.png",
    items: [
      { name: "Veggie Fried", half: 55, full: 85, tag: "vegonly" },
      { name: "Paneer Fried", half: 60, full: 90 },
      { name: "Chicken Fried", half: 65, full: 100 },
    ],
  },
  {
    category: "Chilli Momos",
    description: "Bold, spicy, tossed in fiery chilli sauce. Not for the faint-hearted.",
    image: "/images/chilli.png",
    items: [
      { name: "Veg Chilli", half: 75, full: 115 },
      { name: "Paneer Chilli", half: 80, full: 120, tag: "musttry" },
      { name: "Chicken Chilli", half: 85, full: 125, tag: "bestseller" },
    ],
  },
  {
    category: "Butter Masala Momos",
    description: "Rich, creamy butter masala gravy poured over perfectly cooked momos.",
    image: "/images/butter.png",
    items: [
      { name: "Veg Butter", half: 75, full: 115, tag: "musttry" },
      { name: "Paneer Butter", half: 80, full: 120 },
      { name: "Chicken Butter", half: 85, full: 125, tag: "bestseller" },
    ],
  },
];

// ─── BURGERS ─────────────────────────────────────────────────
export const BURGERS = [
  { name: "Veggie Momo Burger", price: 60, tag: "vegonly", image: "/images/steamed.png" },
  { name: "Chicken Momo Burger", price: 70, tag: "bestseller", image: "/images/panfried.png" },
];

// ─── MUST-TRY PICKS ──────────────────────────────────────────
export const MUST_TRY = [
  {
    name: "Butter Masala Chicken Momo",
    category: "Butter Masala",
    half: 85,
    full: 125,
    description:
      "Our signature dish — juicy chicken momos drowning in our house-special butter masala gravy.",
    image: "/images/butter.png",
    badge: "#1 Pick",
  },
  {
    name: "Chicken Chilli Momo",
    category: "Chilli Momos",
    half: 85,
    full: 125,
    description:
      "Fiery wok-tossed chicken momos that set your taste buds ablaze. Addictively spicy.",
    image: "/images/chilli.png",
    badge: "Spicy Hit",
  },
  {
    name: "Cheese Kurkure Momo",
    category: "Cheese + Kurkure",
    half: 85,
    full: 125,
    description:
      "The crunch of kurkure meets the pull of melted cheese. Ultimate street-food experience.",
    image: "/images/kurkure.png",
    badge: "Fan Favourite",
  },
  {
    name: "Chicken Momo Burger",
    category: "Burger",
    price: 70,
    description:
      "A momo patty nestled in a soft bun — Midnapore's most unique street fusion!",
    image: "/images/panfried.png",
    badge: "Unique",
  },
];

// ─── CUSTOMER REVIEWS ────────────────────────────────────────
export const REVIEWS = [
  {
    name: "Souvik Das",
    location: "Midnapore",
    rating: 5,
    text: "Best momos in the whole of Midnapore! The butter masala chicken is absolutely divine. I come here at least twice a week.",
    avatar: "SD",
    date: "March 2024",
  },
  {
    name: "Priya Mondal",
    location: "Kharagpur",
    rating: 5,
    text: "Drove all the way from Kharagpur for these momos and it was worth every kilometre. The cheese momos are insanely good!",
    avatar: "PM",
    date: "February 2024",
  },
  {
    name: "Rahul Ghosh",
    location: "Midnapore",
    rating: 5,
    text: "The chilli momos here are on another level. Perfect spice balance, generous portions, and super affordable. 10/10!",
    avatar: "RG",
    date: "January 2024",
  },
  {
    name: "Ananya Roy",
    location: "Kolkata",
    rating: 4,
    text: "Visited during a road trip. The momo burger is a genius idea — never seen that before. Will definitely come back!",
    avatar: "AR",
    date: "December 2023",
  },
  {
    name: "Debashis Patra",
    location: "Midnapore",
    rating: 5,
    text: "Local gem! Fresh ingredients, perfectly steamed momos, and the best red chutney in town. Support local businesses!",
    avatar: "DP",
    date: "November 2023",
  },
  {
    name: "Suman Biswas",
    location: "Jhargram",
    rating: 5,
    text: "Heard about this place from friends and finally visited. The pan fried momos in schezwan sauce are absolutely incredible!",
    avatar: "SB",
    date: "October 2023",
  },
];

// ─── NAV LINKS ───────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "Location", path: "/location" },
];
