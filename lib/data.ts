import type { Article, Country, Embassy, TickerItem } from "@/types";

export const SITE = {
  name: "KTM Affairs",
  tagline: "The world, examined.",
  description:
    "KTM Affairs is a premium international affairs platform covering diplomacy, foreign policy, and world news with rigorous, independent analysis.",
  url: "https://ktmaffairs.example.com",
};

export const NAV = [
  { label: "World", href: "/world" },
  { label: "Diplomacy", href: "/diplomacy" },
  { label: "Foreign Policy", href: "/foreign-policy" },
  { label: "Analysis", href: "/analysis" },
  { label: "Opinion", href: "/opinion" },
  { label: "Countries", href: "/countries" },
  { label: "Embassies", href: "/embassies" },
  { label: "Magazine", href: "/magazine" },
];

export const BREAKING_HEADLINES = [
  "G7 finance ministers convene emergency session on sovereign debt contagion",
  "Ceasefire monitors report violations along the eastern demarcation line",
  "ASEAN bloc unveils joint semiconductor supply-chain pact",
  "UN Security Council to vote on peacekeeping mandate renewal Thursday",
  "Central banks signal coordinated stance ahead of autumn summit",
  "Arctic Council convenes as ice-free shipping routes open earlier than forecast",
];

export const WORLD_CLOCKS: { city: string; tz: string }[] = [
  { city: "Washington", tz: "America/New_York" },
  { city: "London", tz: "Europe/London" },
  { city: "Brussels", tz: "Europe/Brussels" },
  { city: "Geneva", tz: "Europe/Zurich" },
  { city: "Moscow", tz: "Europe/Moscow" },
  { city: "New Delhi", tz: "Asia/Kolkata" },
  { city: "Kathmandu", tz: "Asia/Kathmandu" },
  { city: "Beijing", tz: "Asia/Shanghai" },
  { city: "Tokyo", tz: "Asia/Tokyo" },
];

export const RISK_TICKER: TickerItem[] = [
  { label: "Global Risk Index", value: "58.2", trend: "up" },
  { label: "Trade Tension Gauge", value: "41.6", trend: "down" },
  { label: "Sovereign Debt Watch", value: "72.9", trend: "up" },
  { label: "Conflict Barometer", value: "63.4", trend: "flat" },
  { label: "Energy Security Index", value: "49.1", trend: "down" },
  { label: "Cyber Threat Level", value: "66.8", trend: "up" },
];

const authorPool = [
  { name: "Helena Marceau", role: "Diplomatic Editor" },
  { name: "Arjun Thapa", role: "South Asia Correspondent" },
  { name: "Yusuf Demir", role: "Senior Analyst, Security" },
  { name: "Chidi Okoro", role: "Africa Bureau Chief" },
  { name: "Elena Vasquez", role: "Economics Editor" },
  { name: "Marcus Reyes", role: "Contributing Editor" },
  { name: "Naomi Sato", role: "East Asia Correspondent" },
];

const img = (id: string) => `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

export const ARTICLES: Article[] = [
  {
    slug: "un-security-council-arctic-mandate",
    section: "diplomacy",
    title: "Inside the Room: How the Security Council Rewrote the Arctic Mandate",
    dek: "A rare look at the closed-door negotiations that produced the Council's first climate-security resolution in a decade.",
    image: img("photo-1517483000871-1dbf64a6e1c2"),
    author: authorPool[0]!,
    publishedAt: "2026-07-03",
    words: 1850,
    tags: ["United Nations", "Arctic", "Security Council"],
    region: "Global",
    featured: true,
    premium: true,
  },
  {
    slug: "asean-semiconductor-pact",
    section: "foreign-policy",
    title: "ASEAN's Silicon Gambit: A Bloc-Wide Bet on Chip Sovereignty",
    dek: "Ten nations, one supply chain: why Southeast Asia is racing to insulate itself from the next chip war.",
    image: img("photo-1518770660439-4636190af475"),
    author: authorPool[6]!,
    publishedAt: "2026-07-02",
    words: 1400,
    tags: ["ASEAN", "Trade", "Technology"],
    region: "Asia-Pacific",
    featured: true,
  },
  {
    slug: "sahel-mediation-track-two",
    section: "diplomacy",
    title: "The Quiet Diplomats: Track-Two Talks Reshaping the Sahel",
    dek: "Away from cameras, a network of former officials and clerics is doing what formal diplomacy cannot.",
    image: img("photo-1451187580459-43490279c0fa"),
    author: authorPool[3]!,
    publishedAt: "2026-06-29",
    words: 1620,
    tags: ["Sahel", "Mediation", "Conflict"],
    region: "Africa",
  },
  {
    slug: "eurozone-debt-contagion",
    section: "world",
    title: "Debt Contagion Fears Grip Eurozone Periphery",
    dek: "Bond yields spike as investors question the credibility of the bloc's fiscal backstop.",
    image: img("photo-1444653614773-995cb1ef9efa"),
    author: authorPool[4]!,
    publishedAt: "2026-07-04",
    words: 980,
    tags: ["Eurozone", "Markets", "Debt"],
    region: "Europe",
    featured: true,
  },
  {
    slug: "south-china-sea-code-of-conduct",
    section: "foreign-policy",
    title: "Two Decades On, a Code of Conduct for the South China Sea Finally Nears Signature",
    dek: "Claimant states edge toward a binding framework, but the hardest clauses remain unresolved.",
    image: img("photo-1533105079780-92b9be482077"),
    author: authorPool[6]!,
    publishedAt: "2026-06-30",
    words: 1750,
    tags: ["South China Sea", "Maritime Law", "ASEAN"],
    region: "Asia-Pacific",
    premium: true,
  },
  {
    slug: "sanctions-architecture-review",
    section: "analysis",
    title: "The Sanctions Architecture Is Fraying. Can It Be Rebuilt?",
    dek: "A decade of overlapping sanctions regimes has produced diminishing returns and rising humanitarian costs.",
    image: img("photo-1454165804606-c3d57bc86b40"),
    author: authorPool[2]!,
    publishedAt: "2026-07-01",
    words: 2100,
    tags: ["Sanctions", "Economic Statecraft"],
    region: "Global",
    featured: true,
    premium: true,
  },
  {
    slug: "opinion-multilateralism-reform",
    section: "opinion",
    title: "Multilateralism Isn't Dying. It's Overdue for Reform",
    dek: "The postwar order was never meant to be static. Neither should our expectations of it.",
    image: img("photo-1529107386315-e1a2ed48a620"),
    author: authorPool[5]!,
    publishedAt: "2026-06-27",
    words: 1100,
    tags: ["Opinion", "Multilateralism"],
    region: "Global",
  },
  {
    slug: "opinion-energy-realignment",
    section: "opinion",
    title: "The Quiet Realignment: How Energy Security Is Redrawing Alliances",
    dek: "The pipelines of the next decade will matter as much as the treaties of the last.",
    image: img("photo-1466611653911-95081537e5b7"),
    author: authorPool[1]!,
    publishedAt: "2026-06-24",
    words: 1300,
    tags: ["Opinion", "Energy", "Alliances"],
    region: "Global",
  },
  {
    slug: "himalayan-water-diplomacy",
    section: "diplomacy",
    title: "Himalayan Water Diplomacy Enters a Fragile New Chapter",
    dek: "As glacial melt accelerates, upstream and downstream states are testing a new framework for shared rivers.",
    image: img("photo-1544735716-392fe2489ffa"),
    author: authorPool[1]!,
    publishedAt: "2026-06-20",
    words: 1550,
    tags: ["South Asia", "Water Security", "Climate"],
    region: "South Asia",
  },
  {
    slug: "analysis-de-dollarization",
    section: "analysis",
    title: "De-Dollarization, Decoded: What's Real and What's Rhetoric",
    dek: "Central banks are diversifying reserves, but the dollar's structural advantages remain formidable.",
    image: img("photo-1621761191319-c6fb62004040"),
    author: authorPool[4]!,
    publishedAt: "2026-06-18",
    words: 1900,
    tags: ["Currency", "Global Economy"],
    region: "Global",
    premium: true,
  },
  {
    slug: "world-nepal-himalayan-summit",
    section: "world",
    title: "Kathmandu to Host First Himalayan Climate Security Summit",
    dek: "Nepal positions itself as a neutral convening ground for a region increasingly defined by climate risk.",
    image: img("photo-1544967082-d9d25d867d66"),
    author: authorPool[1]!,
    publishedAt: "2026-07-05",
    words: 900,
    tags: ["Nepal", "Climate", "Summit"],
    region: "South Asia",
    featured: true,
  },
  {
    slug: "world-latin-america-trade-corridor",
    section: "world",
    title: "A New Trade Corridor Links Andean Ports to Asian Markets",
    dek: "Infrastructure financing from three continents converges on a single mountain pass.",
    image: img("photo-1518623489648-a173ef7824f3"),
    author: authorPool[5]!,
    publishedAt: "2026-06-26",
    words: 1050,
    tags: ["Latin America", "Trade", "Infrastructure"],
    region: "Americas",
  },
  {
    slug: "magazine-summer-2026-order",
    section: "magazine",
    title: "The Summer 2026 Issue: Who Writes the Rules Now?",
    dek: "Our quarterly print edition examines the contest over the next global rulebook — from trade to AI governance.",
    image: img("photo-1495020689067-958852a7765e"),
    author: authorPool[0]!,
    publishedAt: "2026-06-15",
    words: 400,
    tags: ["Magazine", "Global Order"],
    region: "Global",
  },
  {
    slug: "analysis-ai-governance-treaty",
    section: "analysis",
    title: "The Race to Write an AI Governance Treaty Before the Technology Outruns It",
    dek: "Negotiators are borrowing from arms-control precedent — but AI does not sit still for verification regimes.",
    image: img("photo-1485827404703-89b55fcc595e"),
    author: authorPool[2]!,
    publishedAt: "2026-06-22",
    words: 2000,
    tags: ["AI Governance", "Emerging Technology"],
    region: "Global",
    premium: true,
  },
];

export const COUNTRIES: Country[] = [
  {
    slug: "nepal",
    name: "Nepal",
    region: "South Asia",
    capital: "Kathmandu",
    flagEmoji: "🇳🇵",
    population: "30.5 million",
    government: "Federal parliamentary republic",
    gdp: "$44.4B",
    riskLevel: "Guarded",
    summary:
      "Wedged between two great powers, Nepal has cultivated a policy of balanced non-alignment while emerging as a convening ground for regional climate and water diplomacy.",
    headlineSlugs: ["himalayan-water-diplomacy", "world-nepal-himalayan-summit"],
    coordinates: { x: 68.5, y: 40 },
  },
  {
    slug: "united-states",
    name: "United States",
    region: "Americas",
    capital: "Washington, D.C.",
    flagEmoji: "🇺🇸",
    population: "341 million",
    government: "Federal presidential republic",
    gdp: "$28.8T",
    riskLevel: "Low",
    summary:
      "The world's largest economy and principal architect of the postwar multilateral order, now navigating renewed great-power competition and domestic political realignment.",
    headlineSlugs: ["analysis-de-dollarization", "sanctions-architecture-review"],
    coordinates: { x: 18, y: 36 },
  },
  {
    slug: "china",
    name: "China",
    region: "Asia-Pacific",
    capital: "Beijing",
    flagEmoji: "🇨🇳",
    population: "1.41 billion",
    government: "Unitary one-party socialist republic",
    gdp: "$19.4T",
    riskLevel: "Elevated",
    summary:
      "An increasingly assertive maritime and economic power reshaping supply chains, regional security architecture, and the terms of engagement across the Indo-Pacific.",
    headlineSlugs: ["south-china-sea-code-of-conduct", "asean-semiconductor-pact"],
    coordinates: { x: 74, y: 34 },
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    capital: "Berlin",
    flagEmoji: "🇩🇪",
    population: "84.5 million",
    government: "Federal parliamentary republic",
    gdp: "$4.7T",
    riskLevel: "Low",
    summary:
      "The European Union's industrial anchor, balancing energy security, fiscal discipline within the eurozone, and a recalibrated defense posture.",
    headlineSlugs: ["eurozone-debt-contagion"],
    coordinates: { x: 49, y: 24 },
  },
  {
    slug: "nigeria",
    name: "Nigeria",
    region: "Africa",
    capital: "Abuja",
    flagEmoji: "🇳🇬",
    population: "232 million",
    government: "Federal presidential republic",
    gdp: "$390B",
    riskLevel: "Elevated",
    summary:
      "Africa's most populous nation and a critical actor in Sahel security cooperation, energy markets, and regional economic integration.",
    headlineSlugs: ["sahel-mediation-track-two"],
    coordinates: { x: 47, y: 47 },
  },
  {
    slug: "india",
    name: "India",
    region: "South Asia",
    capital: "New Delhi",
    flagEmoji: "🇮🇳",
    population: "1.45 billion",
    government: "Federal parliamentary republic",
    gdp: "$4.1T",
    riskLevel: "Low",
    summary:
      "A rising economic and diplomatic power charting its own course through great-power competition while leading South Asian water and climate frameworks.",
    headlineSlugs: ["himalayan-water-diplomacy"],
    coordinates: { x: 66, y: 42 },
  },
  {
    slug: "brazil",
    name: "Brazil",
    region: "Americas",
    capital: "Brasília",
    flagEmoji: "🇧🇷",
    population: "216 million",
    government: "Federal presidential republic",
    gdp: "$2.2T",
    riskLevel: "Guarded",
    summary:
      "South America's largest economy and a pivotal voice on climate governance, trade corridors, and reform of multilateral financial institutions.",
    headlineSlugs: ["world-latin-america-trade-corridor"],
    coordinates: { x: 30, y: 62 },
  },
  {
    slug: "russia",
    name: "Russia",
    region: "Europe",
    capital: "Moscow",
    flagEmoji: "🇷🇺",
    population: "144 million",
    government: "Federal semi-presidential republic",
    gdp: "$2.1T",
    riskLevel: "High",
    summary:
      "A major military power whose relations with the Euro-Atlantic community remain the defining fault line of European security architecture.",
    headlineSlugs: [],
    coordinates: { x: 62, y: 20 },
  },
];

export const EMBASSIES: Embassy[] = [
  { country: "United States", city: "Kathmandu", ambassador: "Dean R. Thompson", address: "Maharajgunj, Kathmandu", phone: "+977-1-423-4000", type: "Embassy" },
  { country: "United Kingdom", city: "Kathmandu", ambassador: "Rob Fenn", address: "Lainchaur, Kathmandu", phone: "+977-1-441-0583", type: "Embassy" },
  { country: "China", city: "Kathmandu", ambassador: "Chen Song", address: "Baluwatar, Kathmandu", phone: "+977-1-441-9389", type: "Embassy" },
  { country: "India", city: "Kathmandu", ambassador: "Naveen Srivastava", address: "Lainchaur, Kathmandu", phone: "+977-1-441-0900", type: "Embassy" },
  { country: "Germany", city: "Kathmandu", ambassador: "Thorsten Hutter", address: "Gyaneshwar, Kathmandu", phone: "+977-1-441-2786", type: "Embassy" },
  { country: "Japan", city: "Kathmandu", ambassador: "Masamichi Saigo", address: "Panipokhari, Kathmandu", phone: "+977-1-442-6680", type: "Embassy" },
  { country: "European Union", city: "Kathmandu", ambassador: "Véronique Lorenzo", address: "Lazimpat, Kathmandu", phone: "+977-1-443-9265", type: "Mission" },
  { country: "Australia", city: "Kathmandu", ambassador: "Felicity Volk", address: "Bansbari, Kathmandu", phone: "+977-1-437-1678", type: "Embassy" },
  { country: "France", city: "Kathmandu", ambassador: "Frédéric Gérard Duvaux", address: "Lazimpat, Kathmandu", phone: "+977-1-441-2332", type: "Embassy" },
  { country: "Russia", city: "Kathmandu", ambassador: "Alexey Novikov", address: "Baluwatar, Kathmandu", phone: "+977-1-441-2155", type: "Embassy" },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesBySection(section: string) {
  return ARTICLES.filter((a) => a.section === section);
}

export function getRelated(article: Article, count = 3) {
  return ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.section === article.section || a.region === article.region)
  ).slice(0, count);
}

export function generateBody(article: Article): string[] {
  if (article.body) return article.body;
  return [
    `${article.dek} The story, pieced together from briefings, public records, and conversations with officials who requested anonymity to discuss sensitive matters, illustrates how quickly the terrain can shift once negotiators leave the conference room.`,
    `For much of the past year, the file sat quietly on the agenda of working-level talks, overshadowed by more urgent crises. That changed in the spring, when a shift in domestic politics in one of the principal capitals forced envoys to accelerate a timeline many had assumed would stretch into the next decade.`,
    `"The mechanics of this are straightforward. The politics are not," said one senior official close to the process, speaking on condition of anonymity. That tension — between technically sound proposals and the domestic constituencies that must ultimately approve them — recurs throughout the negotiating history.`,
    `Analysts caution against reading too much into any single meeting. Diplomatic processes of this scale typically advance in fits and starts, shaped as much by unrelated crises elsewhere as by the substance of the talks themselves. Still, the direction of travel is unmistakable.`,
    `What happens next will depend on a handful of variables: the durability of political will in the capitals involved, the willingness of third parties to underwrite compromise, and whether the institutional architecture built to manage implementation can withstand the first real test of a dispute.`,
    `KTM Affairs will continue to track this story as it develops, drawing on our network of correspondents and the research desk's ongoing analysis of primary-source documents.`,
  ];
}

export function getCountry(slug: string) {
  return COUNTRIES.find((c) => c.slug === slug);
}

