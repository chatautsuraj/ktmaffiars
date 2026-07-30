import type { Article } from "@/types";
import { authors, categories } from "./authors";

const diplomacy = categories[0];
const foreignPolicy = categories[1];
const economy = categories[2];
const security = categories[3];
const climate = categories[4];
const opinion = categories[5];
const analysis = categories[6];
const explainers = categories[7];
const intelligence = categories[8];
const nepalWorld = categories[9];

export const articles: Article[] = [
  {
    id: "1",
    slug: "nepal-india-border-diplomacy-2026",
    title: "Nepal and India Navigate a New Chapter in Border Diplomacy",
    subtitle: "After years of tension, both nations signal willingness to institutionalize dialogue",
    excerpt: "Foreign ministers from Kathmandu and New Delhi convened in a landmark session aimed at resolving long-standing border disputes while expanding economic cooperation.",
    content: `<p>In a diplomatic breakthrough that analysts have described as the most significant bilateral engagement in a decade, Nepal and India have agreed to establish a permanent joint border commission with quarterly review mechanisms.</p>
<p>The agreement, reached after three days of intensive negotiations in Kathmandu, addresses concerns that have simmered since the 2015 blockade and subsequent territorial disputes in the Kalapani-Limpiyadhura region.</p>
<h2>A Framework for Resolution</h2>
<p>Under the new framework, both nations will deploy technical survey teams within 90 days to demarcate disputed areas using satellite imagery and historical cartographic evidence. A senior Nepali diplomat described the approach as "evidence-based diplomacy at its finest."</p>
<blockquote>"This is not about winning or losing territory. It is about building trust through transparency and mutual respect."</blockquote>
<p>The commission will include representatives from foreign ministries, survey departments, and local communities affected by border delineation. Civil society observers from both countries will have access to proceedings, a first in the bilateral relationship.</p>
<h2>Economic Dimensions</h2>
<p>Beyond territorial matters, the talks yielded substantial economic agreements. India committed to expediting the Pancheshwar Multipurpose Project, stalled for over two decades, and Nepal secured preferential access for hydropower exports to the Indian grid.</p>
<p>Trade data reveals the stakes: bilateral trade exceeded $9.8 billion in 2025, yet Nepal's trade deficit with India remains a persistent concern. The new agreements include provisions for increased Nepali exports of agricultural products and processed goods.</p>
<h2>Regional Implications</h2>
<p>Observers note that improved Nepal-India relations could reshape regional dynamics, particularly as China continues to expand its Belt and Road Initiative investments in Nepal. The diplomatic thaw may also influence SAARC revival efforts, dormant since 2016.</p>
<p>Prime Minister's Office sources indicate that a state visit to New Delhi is being planned for the autumn, potentially coinciding with the next SAARC summit if member states reach consensus on hosting arrangements.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&h=900&fit=crop",
    category: diplomacy,
    author: authors[0],
    publishedAt: "2026-07-04T08:00:00Z",
    readingTime: 8,
    tags: ["Nepal", "India", "Border", "Diplomacy"],
    isFeatured: true,
    isBreaking: true,
    pullQuotes: [
      "This is not about winning or losing territory. It is about building trust through transparency and mutual respect.",
    ],
  },
  {
    id: "2",
    slug: "china-bri-nepal-infrastructure-assessment",
    title: "Assessing China's BRI Investments in Nepal: Progress and Pitfalls",
    excerpt: "A comprehensive review of Belt and Road Initiative projects reveals both transformative infrastructure and mounting debt concerns.",
    content: `<p>China's Belt and Road Initiative has committed over $3.2 billion to Nepali infrastructure since 2017, making Nepal one of the initiative's most significant South Asian recipients relative to GDP.</p>
<p>From the Pokhara International Airport to cross-border railway feasibility studies, BRI projects have reshaped Nepal's physical and economic landscape. Yet questions persist about debt sustainability, environmental impact, and strategic dependencies.</p>
<h2>Project Portfolio</h2>
<p>The Trans-Himalayan Multi-Dimensional Connectivity Network remains the flagship initiative, encompassing road, rail, and digital infrastructure corridors connecting Kathmandu to Tibet Autonomous Region.</p>
<p>Independent assessments suggest that completed projects have reduced travel times by up to 40% on key trade routes, while generating approximately 12,000 direct construction jobs during peak implementation phases.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&h=900&fit=crop",
    category: analysis,
    author: authors[1],
    publishedAt: "2026-07-03T14:30:00Z",
    readingTime: 12,
    tags: ["China", "BRI", "Infrastructure", "Nepal"],
    isFeatured: true,
  },
  {
    id: "3",
    slug: "un-climate-summit-nepal-delegation",
    title: "Nepal's Delegation Sets Ambitious Agenda at UN Climate Summit",
    excerpt: "Led by the Minister for Forests and Environment, Nepal presents a comprehensive mountain nations climate framework.",
    content: `<p>Nepal's delegation arrived at the UN Climate Summit with an unprecedented proposal: a Mountain Nations Climate Compact that would establish binding commitments for high-altitude countries facing disproportionate climate impacts.</p>
<p>The framework draws on Nepal's experience as chair of the Least Developed Countries group and its pioneering work on loss and damage financing mechanisms.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
    category: climate,
    author: authors[2],
    publishedAt: "2026-07-03T10:00:00Z",
    readingTime: 6,
    tags: ["Climate", "UN", "Nepal", "Mountains"],
  },
  {
    id: "4",
    slug: "saarc-revival-prospects-2026",
    title: "Can SAARC Be Revived? Assessing Prospects for Regional Cooperation",
    excerpt: "After a decade of dormancy, renewed geopolitical shifts create an opening for South Asian regional integration.",
    content: `<p>The South Asian Association for Regional Cooperation has been effectively frozen since 2016, when cross-border tensions led India to boycott the Islamabad summit. Yet diplomatic whispers suggest member states are quietly exploring revival mechanisms.</p>
<p>BIMSTEC's rise as an alternative forum has not diminished SAARC's institutional infrastructure, which includes a secretariat, development fund, and established trade protocols awaiting activation.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
    category: foreignPolicy,
    author: authors[0],
    publishedAt: "2026-07-02T16:00:00Z",
    readingTime: 10,
    tags: ["SAARC", "South Asia", "Regionalism"],
    isFeatured: true,
  },
  {
    id: "5",
    slug: "himalayan-water-security-geopolitics",
    title: "Water Wars in the Himalayas: The Geopolitics of Transboundary Rivers",
    excerpt: "As glacial melt accelerates, competition for Himalayan water resources intensifies among riparian nations.",
    content: `<p>The Himalayas, often called the "Third Pole," contain the largest store of frozen water outside the polar regions. For the 1.9 billion people who depend on rivers originating here, water security is existential.</p>
<p>Nepal, positioned at the headwaters of the Ganges, Brahmaputra, and Indus systems, finds itself at the center of complex riparian negotiations involving India, China, and Bangladesh.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop",
    category: security,
    author: authors[3],
    publishedAt: "2026-07-02T09:00:00Z",
    readingTime: 14,
    tags: ["Water", "Himalayas", "Security", "Climate"],
  },
  {
    id: "6",
    slug: "nepal-fdi-attractiveness-report-2026",
    title: "Nepal Climbs FDI Rankings as Hydropower Sector Draws Global Investors",
    excerpt: "World Bank report highlights Nepal's improving investment climate and renewable energy potential.",
    content: `<p>Nepal has risen 23 positions in the World Bank's FDI Attractiveness Index, driven primarily by reforms in hydropower licensing and special economic zone development.</p>
<p>Foreign direct investment inflows reached $412 million in 2025, with European and Gulf sovereign wealth funds showing particular interest in run-of-river projects.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&h=900&fit=crop",
    category: economy,
    author: authors[2],
    publishedAt: "2026-07-01T12:00:00Z",
    readingTime: 7,
    tags: ["FDI", "Economy", "Hydropower", "Investment"],
  },
  {
    id: "7",
    slug: "us-nepal-strategic-partnership-framework",
    title: "Inside the New U.S.-Nepal Strategic Partnership Framework",
    excerpt: "The MCC compact and expanded security cooperation signal deepening American engagement in the Himalayas.",
    content: `<p>The United States and Nepal have formalized a Strategic Partnership Framework that extends beyond development assistance to encompass defense cooperation, technology transfer, and educational exchange programs.</p>
<p>The framework builds on the successful implementation of the Millennium Challenge Corporation compact, which has upgraded Nepal's electricity transmission infrastructure.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&h=900&fit=crop",
    category: diplomacy,
    author: authors[0],
    publishedAt: "2026-06-30T15:00:00Z",
    readingTime: 9,
    tags: ["United States", "Nepal", "MCC", "Partnership"],
  },
  {
    id: "8",
    slug: "explainer-quad-nepal-relevance",
    title: "Explainer: What the Quad Means for Nepal",
    excerpt: "Understanding the Quadrilateral Security Dialogue and its implications for Himalayan nations.",
    content: `<p>The Quad—comprising the United States, Japan, Australia, and India—has evolved from a humanitarian response mechanism to a comprehensive strategic partnership addressing Indo-Pacific security, technology, and climate challenges.</p>
<p>For Nepal, a landlocked nation between two Quad-adjacent powers, understanding this grouping's trajectory is essential for foreign policy planning.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=900&fit=crop",
    category: explainers,
    author: authors[1],
    publishedAt: "2026-06-29T11:00:00Z",
    readingTime: 5,
    tags: ["Quad", "Indo-Pacific", "Explainer"],
  },
  {
    id: "9",
    slug: "opinion-nepal-non-alignment-21st-century",
    title: "Opinion: Non-Alignment in the 21st Century — Nepal Must Define Its Own Path",
    excerpt: "As great power competition intensifies, Nepal's traditional non-aligned stance requires thoughtful modernization.",
    content: `<p>Nepal's foreign policy has long rested on the principle of non-alignment, a doctrine forged during the Cold War that served a young republic navigating between competing superpowers. But the geopolitical landscape of 2026 bears little resemblance to 1955.</p>
<p>The question is not whether Nepal should abandon non-alignment, but how to reinterpret it for an era of economic interdependence, climate crisis, and technological rivalry.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&h=900&fit=crop",
    category: opinion,
    author: authors[0],
    publishedAt: "2026-06-28T08:00:00Z",
    readingTime: 6,
    tags: ["Opinion", "Non-Alignment", "Foreign Policy"],
  },
  {
    id: "10",
    slug: "intelligence-assessment-indo-pacific-2026",
    title: "Intelligence Assessment: Indo-Pacific Power Shifts in Q2 2026",
    excerpt: "KTM Affairs Intelligence Unit presents its quarterly assessment of strategic developments across the Indo-Pacific.",
    content: `<p>This classified-adjacent assessment synthesizes open-source intelligence, diplomatic reporting, and expert analysis to provide policymakers with a comprehensive view of Indo-Pacific strategic dynamics.</p>
<p>Key findings indicate accelerating military modernization in the region, shifting trade patterns following supply chain diversification, and emerging climate-security nexuses in maritime Southeast Asia.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop",
    category: intelligence,
    author: authors[3],
    publishedAt: "2026-06-27T06:00:00Z",
    readingTime: 15,
    tags: ["Intelligence", "Indo-Pacific", "Assessment"],
    isPremium: true,
  },
  {
    id: "11",
    slug: "nepal-tourism-diplomacy-soft-power",
    title: "How Nepal Uses Tourism Diplomacy to Project Soft Power",
    excerpt: "From Everest expeditions to cultural festivals, tourism remains Nepal's most effective diplomatic instrument.",
    content: `<p>With over 1.2 million international visitors in 2025, Nepal's tourism sector generates more diplomatic capital than any formal treaty negotiation. Every trekker, pilgrim, and cultural tourist becomes an informal ambassador for Nepali values and hospitality.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=900&fit=crop",
    category: nepalWorld,
    author: authors[0],
    publishedAt: "2026-06-26T13:00:00Z",
    readingTime: 7,
    tags: ["Tourism", "Soft Power", "Nepal"],
  },
  {
    id: "12",
    slug: "eu-nepal-trade-agreement-negotiations",
    title: "EU-Nepal Trade Agreement Negotiations Enter Critical Phase",
    excerpt: "Enhanced market access for Nepali exports could transform the country's economic trajectory.",
    content: `<p>Negotiations for an Enhanced Partnership and Cooperation Agreement between the European Union and Nepal have entered their final phase, with both sides expressing optimism about reaching an accord by year-end.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=900&fit=crop",
    category: economy,
    author: authors[2],
    publishedAt: "2026-06-25T10:00:00Z",
    readingTime: 8,
    tags: ["EU", "Trade", "Nepal", "Economy"],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string) {
  return articles.filter((a) => a.category.slug === categorySlug);
}

export function getFeaturedArticles() {
  return articles.filter((a) => a.isFeatured);
}

export function getBreakingNews() {
  return articles.filter((a) => a.isBreaking);
}

export function getLatestArticles(limit = 10) {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 4) {
  return articles
    .filter((a) => a.id !== article.id && a.category.slug === article.category.slug)
    .slice(0, limit);
}

export function searchArticles(query: string) {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}
