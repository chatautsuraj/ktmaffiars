import type { Embassy, Ambassador, Organization, Event, Podcast, Video, SocialVideo, MagazineIssue } from "@/types";

export const embassies: Embassy[] = [
  {
    id: "1",
    slug: "indian-embassy-kathmandu",
    name: "Embassy of India",
    country: "India",
    countrySlug: "india",
    type: "embassy",
    address: "Kapurdhara Marg, Lainchaur",
    city: "Kathmandu",
    phone: "+977-1-4410900",
    email: "eoiktm@mea.gov.in",
    website: "https://www.eoikathmandu.gov.in",
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=900&fit=crop",
    coordinates: { lat: 27.7231, lng: 85.324 },
    ambassadorSlug: "naveen-srivastava",
    established: "1947",
    visaInfo: "Indian nationals do not require visas. Nepali nationals may enter India with valid identification. Third-country nationals should apply through the VFS Global visa center.",
    cooperationProjects: [
      { title: "Pancheshwar Multipurpose Project", description: "Joint hydropower and irrigation project on Mahakali River.", status: "active", year: 2024 },
      { title: "Cross-Border Railway", description: "Railway connectivity between Jaynagar and Bardibas.", status: "active", year: 2023 },
      { title: "Digital Connectivity", description: "Fiber optic link between India and Nepal.", status: "completed", year: 2022 },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "2",
    slug: "chinese-embassy-kathmandu",
    name: "Embassy of the People's Republic of China",
    country: "China",
    countrySlug: "china",
    type: "embassy",
    address: "Baluwatar",
    city: "Kathmandu",
    phone: "+977-1-4411740",
    email: "chinaemb_np@mfa.gov.cn",
    website: "http://np.china-embassy.gov.cn",
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&h=900&fit=crop",
    coordinates: { lat: 27.7298, lng: 85.3297 },
    ambassadorSlug: "chen-song",
    established: "1955",
    visaInfo: "Chinese visas are processed through the embassy. Processing time is typically 4-5 business days for standard applications.",
    cooperationProjects: [
      { title: "Pokhara International Airport", description: "Modern international airport funded by Chinese EXIM Bank.", status: "completed", year: 2023 },
      { title: "Trans-Himalayan Railway", description: "Feasibility study for Kathmandu-Lhasa railway connection.", status: "active", year: 2024 },
    ],
    gallery: [],
  },
  {
    id: "3",
    slug: "us-embassy-kathmandu",
    name: "Embassy of the United States",
    country: "United States",
    countrySlug: "united-states",
    type: "embassy",
    address: "Maharajgunj",
    city: "Kathmandu",
    phone: "+977-1-4234000",
    email: "usembassykathmandu@state.gov",
    website: "https://np.usembassy.gov",
    heroImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&h=900&fit=crop",
    coordinates: { lat: 27.7389, lng: 85.337 },
    ambassadorSlug: "dean-thompson",
    established: "1959",
    visaInfo: "Non-immigrant visa applications are processed through the embassy. Interview appointments required for most categories.",
    cooperationProjects: [
      { title: "MCC Compact Implementation", description: "Electricity transmission and road maintenance projects.", status: "active", year: 2024 },
      { title: "USAID Health Programs", description: "Maternal and child health initiatives across provinces.", status: "active", year: 2025 },
    ],
    gallery: [],
  },
];

export const ambassadors: Ambassador[] = [
  {
    id: "1",
    slug: "naveen-srivastava",
    name: "Naveen Srivastava",
    title: "Ambassador of India to Nepal",
    country: "India",
    countrySlug: "india",
    embassySlug: "indian-embassy-kathmandu",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    bio: "Ambassador Srivastava is a career diplomat with over three decades of service. Prior to Kathmandu, he served as Joint Secretary for Nepal and Bhutan at the Ministry of External Affairs.",
    appointed: "2024-04-01",
    previousPosts: ["High Commissioner to Bangladesh", "Ambassador to Myanmar", "Joint Secretary, MEA"],
    languages: ["Hindi", "English", "Nepali"],
    speeches: [
      { title: "Address on Nepal-India Economic Partnership", date: "2026-03-15", excerpt: "The economic partnership between our nations has never been stronger..." },
    ],
  },
  {
    id: "2",
    slug: "chen-song",
    name: "Chen Song",
    title: "Ambassador of China to Nepal",
    country: "China",
    countrySlug: "china",
    embassySlug: "chinese-embassy-kathmandu",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    bio: "Ambassador Chen has extensive experience in South Asian affairs, having previously served in Pakistan and Sri Lanka.",
    appointed: "2023-01-15",
    previousPosts: ["Deputy Chief of Mission, Islamabad", "Counselor, Colombo"],
    languages: ["Mandarin", "English", "Nepali"],
  },
  {
    id: "3",
    slug: "dean-thompson",
    name: "Dean Thompson",
    title: "Ambassador of the United States to Nepal",
    country: "United States",
    countrySlug: "united-states",
    embassySlug: "us-embassy-kathmandu",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    bio: "Ambassador Thompson is a career Foreign Service officer with expertise in development policy and democratic governance.",
    appointed: "2022-09-01",
    previousPosts: ["Principal Deputy Assistant Secretary, South Asia", "Deputy Chief of Mission, Tbilisi"],
    languages: ["English", "Russian", "Georgian"],
  },
];

export const organizations: Organization[] = [
  {
    id: "1",
    slug: "united-nations",
    name: "United Nations",
    acronym: "UN",
    type: "Multilateral",
    founded: "1945",
    headquarters: "New York, USA",
    members: 193,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/320px-Flag_of_the_United_Nations.svg.png",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
    overview: "The United Nations is the world's preeminent intergovernmental organization, dedicated to maintaining international peace and security, developing friendly relations among nations, and promoting social progress.",
    nepalRole: "Nepal has been an active UN member since 1955, contributing over 140,000 peacekeepers to UN missions and currently serving on the UN Human Rights Council.",
    keyInitiatives: ["UNDP Nepal Country Programme", "UN Peacekeeping Operations", "SDG Implementation", "Climate Action Framework"],
    website: "https://www.un.org",
  },
  {
    id: "2",
    slug: "world-bank",
    name: "World Bank Group",
    acronym: "WB",
    type: "Financial Institution",
    founded: "1944",
    headquarters: "Washington, D.C., USA",
    members: 189,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/World_Bank_Group_logo.svg/320px-World_Bank_Group_logo.svg.png",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop",
    overview: "The World Bank Group provides financial and technical assistance to developing countries for development programs aimed at reducing poverty and building shared prosperity.",
    nepalRole: "Nepal has received over $6 billion in World Bank financing since joining in 1963, with current focus on energy, transport, and disaster resilience.",
    keyInitiatives: ["Nepal Energy Sector Reform", "Road Connectivity Project", "Disaster Risk Management", "Education Quality Reform"],
    website: "https://www.worldbank.org",
  },
  {
    id: "3",
    slug: "saarc",
    name: "South Asian Association for Regional Cooperation",
    acronym: "SAARC",
    type: "Regional Organization",
    founded: "1985",
    headquarters: "Kathmandu, Nepal",
    members: 8,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/SAARC_logo.svg/320px-SAARC_logo.svg.png",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
    overview: "SAARC is a regional intergovernmental organization comprising eight South Asian nations, promoting economic and regional integration.",
    nepalRole: "As SAARC's permanent secretariat host since 1987, Nepal plays a central role in regional cooperation architecture, though the organization has been largely dormant since 2016.",
    keyInitiatives: ["SAARC Development Fund", "South Asian Free Trade Area", "Regional Food Security", "Climate Change Initiative"],
    website: "https://www.saarc-sec.org",
  },
  {
    id: "4",
    slug: "bimstec",
    name: "Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation",
    acronym: "BIMSTEC",
    type: "Regional Organization",
    founded: "1997",
    headquarters: "Dhaka, Bangladesh",
    members: 7,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BIMSTEC_logo.svg/320px-BIMSTEC_logo.svg.png",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
    overview: "BIMSTEC connects South and Southeast Asia through economic and technical cooperation across 14 priority sectors.",
    nepalRole: "Nepal joined BIMSTEC in 2004 and has been an active participant, particularly in energy, tourism, and counter-terrorism cooperation.",
    keyInitiatives: ["Energy Grid Interconnection", "Tourism Circuit Development", "Counter-Terrorism Framework", "Trade Facilitation"],
    website: "https://www.bimstec.org",
  },
  {
    id: "5",
    slug: "imf",
    name: "International Monetary Fund",
    acronym: "IMF",
    type: "Financial Institution",
    founded: "1944",
    headquarters: "Washington, D.C., USA",
    members: 190,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/IMF_logo.svg/320px-IMF_logo.svg.png",
    heroImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&h=900&fit=crop",
    overview: "The IMF works to foster global monetary cooperation, secure financial stability, facilitate international trade, and reduce poverty worldwide.",
    nepalRole: "Nepal has been an IMF member since 1961. The Fund has supported Nepal through Extended Credit Facility arrangements and technical assistance on fiscal policy and financial sector reform.",
    keyInitiatives: ["Extended Credit Facility Programme", "Fiscal Transparency Assessment", "Financial Sector Stability Review", "Climate Policy Diagnostic"],
    website: "https://www.imf.org",
  },
];

export const events: Event[] = [
  {
    id: "1",
    slug: "himalayan-diplomacy-summit-2026",
    title: "Himalayan Diplomacy Summit 2026",
    description: "Annual gathering of diplomats, policymakers, and scholars focused on Himalayan geopolitics and cooperation.",
    date: "2026-09-15",
    endDate: "2026-09-17",
    location: "Kathmandu, Nepal",
    type: "Summit",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    registrationUrl: "#",
  },
  {
    id: "2",
    slug: "south-asia-economic-forum",
    title: "South Asia Economic Forum",
    description: "Regional economic dialogue featuring finance ministers and central bank governors.",
    date: "2026-10-22",
    location: "New Delhi, India",
    type: "Forum",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    slug: "climate-diplomacy-workshop",
    title: "Climate Diplomacy Workshop for Mountain Nations",
    description: "Technical workshop on climate negotiation strategies for Himalayan and Andean nations.",
    date: "2026-08-05",
    location: "Virtual",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    isVirtual: true,
  },
];

export const podcasts: Podcast[] = [
  {
    id: "1",
    slug: "diplomatic-circuit-ep42",
    title: "The Diplomatic Circuit: Nepal's Balancing Act",
    description: "How Nepal navigates relations between India, China, and the United States in an era of great power competition.",
    duration: "45:32",
    publishedAt: "2026-07-01T10:00:00Z",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop",
    episode: 42,
    season: 3,
    guests: ["Dr. Anisha Sharma", "Prof. S.D. Muni"],
  },
  {
    id: "2",
    slug: "global-brief-ep18",
    title: "Global Brief: SAARC at a Crossroads",
    description: "Can South Asian regional cooperation be revived? Experts weigh in on prospects and pathways.",
    duration: "38:15",
    publishedAt: "2026-06-25T10:00:00Z",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop",
    episode: 18,
    season: 2,
    guests: ["Rajesh Thapa"],
  },
];

export const videos: Video[] = [
  {
    id: "1",
    slug: "nepal-un-address-2026",
    title: "Nepal's Address to the UN General Assembly",
    description: "Full coverage of Nepal's address at the 81st UN General Assembly session.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    duration: "28:45",
    publishedAt: "2026-06-20T14:00:00Z",
    category: "Diplomacy",
  },
  {
    id: "2",
    slug: "himalayan-geopolitics-explained",
    title: "Himalayan Geopolitics Explained",
    description: "A visual explainer on the strategic significance of the Himalayan region.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop",
    duration: "12:30",
    publishedAt: "2026-06-15T10:00:00Z",
    category: "Explainers",
  },
];

export const socialVideos: SocialVideo[] = [
  {
    id: "1",
    slug: "un-assembly-highlights-youtube",
    title: "UN General Assembly Highlights",
    description: "Key moments from Nepal's delegation at the 81st UN General Assembly session.",
    thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg",
    platform: "youtube",
    platformHandle: "@KTMAffairs",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    publishedAt: "2026-07-05T12:00:00Z",
  },
  {
    id: "2",
    slug: "embassy-briefing-instagram",
    title: "Behind the Scenes: Embassy Briefing",
    description: "A quick look at our coverage of the Indian Embassy press briefing in Kathmandu.",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop",
    platform: "instagram",
    platformHandle: "@ktm.affairs",
    videoUrl: "https://www.instagram.com/reel/example/",
    publishedAt: "2026-07-02T09:30:00Z",
  },
  {
    id: "3",
    slug: "himalayan-geopolitics-tiktok",
    title: "Himalayan Geopolitics in 60 Seconds",
    description: "A rapid explainer on why the Himalayas matter in great-power competition.",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop",
    platform: "tiktok",
    platformHandle: "@ktmaffairs",
    videoUrl: "https://www.tiktok.com/@ktmaffairs/video/example",
    publishedAt: "2026-06-28T16:00:00Z",
  },
  {
    id: "4",
    slug: "saarc-summit-facebook",
    title: "SAARC at a Crossroads — Panel Clip",
    description: "Excerpt from our Facebook Live panel on the future of South Asian regional cooperation.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    platform: "facebook",
    platformHandle: "KTMAffairs",
    videoUrl: "https://www.facebook.com/KTMAffairs/videos/example",
    publishedAt: "2026-06-22T11:00:00Z",
  },
  {
    id: "5",
    slug: "diplomatic-circuit-youtube",
    title: "The Diplomatic Circuit: Nepal's Balancing Act",
    description: "Full episode clip on how Nepal navigates relations between India, China, and the United States.",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
    platform: "youtube",
    platformHandle: "@KTMAffairs",
    embedUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    publishedAt: "2026-06-18T14:00:00Z",
  },
];

export const magazineIssues: MagazineIssue[] = [
  {
    id: "1",
    slug: "july-2026",
    title: "The New Himalayan Order",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=800&fit=crop",
    publishedAt: "2026-07-01T00:00:00Z",
    description: "Special issue examining shifting power dynamics in the Himalayas and Nepal's strategic choices.",
    articles: ["nepal-india-border-diplomacy-2026", "himalayan-water-security-geopolitics", "china-bri-nepal-infrastructure-assessment"],
  },
  {
    id: "2",
    slug: "june-2026",
    title: "Climate Diplomacy",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop",
    publishedAt: "2026-06-01T00:00:00Z",
    description: "Mountain nations lead the charge on climate action and loss-and-damage financing.",
    articles: ["un-climate-summit-nepal-delegation"],
  },
];

export function getEmbassyBySlug(slug: string) {
  return embassies.find((e) => e.slug === slug);
}

export function getAmbassadorBySlug(slug: string) {
  return ambassadors.find((a) => a.slug === slug);
}

export function getOrganizationBySlug(slug: string) {
  return organizations.find((o) => o.slug === slug);
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getPodcastBySlug(slug: string) {
  return podcasts.find((p) => p.slug === slug);
}

export function getVideoBySlug(slug: string) {
  return videos.find((v) => v.slug === slug);
}

export function getSocialVideoBySlug(slug: string) {
  return socialVideos.find((v) => v.slug === slug);
}

export function getMagazineIssueBySlug(slug: string) {
  return magazineIssues.find((m) => m.slug === slug);
}
