import type { Author, Category } from "@/types";

export const categories: Category[] = [
  { id: "1", slug: "diplomacy", name: "Diplomacy", description: "Statecraft, negotiations, and diplomatic relations", showOnHomepage: true, homepageOrder: 1 },
  { id: "2", slug: "foreign-policy", name: "Foreign Policy", description: "Policy analysis and strategic decisions", showOnHomepage: true, homepageOrder: 2 },
  { id: "3", slug: "economy", name: "Economy", description: "Global trade, finance, and economic diplomacy" },
  { id: "4", slug: "security", name: "Security", description: "Defense, intelligence, and geopolitical security" },
  { id: "5", slug: "climate", name: "Climate", description: "Climate diplomacy and environmental policy" },
  { id: "6", slug: "opinion", name: "Opinion", description: "Editorial perspectives and commentary", showOnHomepage: true, homepageOrder: 4 },
  { id: "7", slug: "analysis", name: "Analysis", description: "In-depth analytical reporting", showOnHomepage: true, homepageOrder: 3 },
  { id: "8", slug: "explainers", name: "Explainers", description: "Clear explanations of complex issues" },
  { id: "9", slug: "intelligence", name: "Intelligence", description: "Strategic intelligence and assessments" },
  { id: "10", slug: "nepal-world", name: "Nepal & The World", description: "Nepal's place in global affairs" },
];

export const authors: Author[] = [
  {
    id: "1",
    slug: "anisha-sharma",
    name: "Dr. Anisha Sharma",
    title: "Senior Diplomatic Correspondent",
    bio: "Dr. Sharma covers South Asian diplomacy and multilateral institutions. Former Fulbright scholar at Georgetown University's School of Foreign Service.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    twitter: "@anishasharma",
    expertise: ["Diplomacy", "SAARC", "Multilateralism"],
    articleCount: 142,
  },
  {
    id: "2",
    slug: "rajesh-thapa",
    name: "Rajesh Thapa",
    title: "Geopolitics Editor",
    bio: "Rajesh Thapa is KTM Affairs' Geopolitics Editor, specializing in Himalayan geopolitics, China-India dynamics, and Nepal's strategic positioning.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    twitter: "@rajeshthapa",
    expertise: ["Geopolitics", "China", "India"],
    articleCount: 98,
  },
  {
    id: "3",
    slug: "elena-voss",
    name: "Elena Voss",
    title: "International Economics Correspondent",
    bio: "Elena Voss reports on global trade, development finance, and economic diplomacy from Kathmandu and Geneva.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    linkedin: "elena-voss",
    expertise: ["Trade", "Development", "IMF"],
    articleCount: 76,
  },
  {
    id: "4",
    slug: "michael-chen",
    name: "Michael Chen",
    title: "Security & Intelligence Analyst",
    bio: "Michael Chen is a former intelligence analyst covering defense policy, cyber security, and regional security architectures.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    expertise: ["Security", "Intelligence", "Cyber"],
    articleCount: 54,
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getAuthorBySlug(slug: string) {
  return authors.find((a) => a.slug === slug);
}
