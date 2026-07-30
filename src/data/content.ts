import "server-only";
import type {
  Embassy,
  Ambassador,
  Organization,
  Event,
  Podcast,
  Video,
  SocialVideo,
  MagazineIssue,
} from "@/types";
import { ensureSeeded } from "@/lib/cms/seed";
import { readCollection } from "@/lib/cms/store";
import { resolveImageUrl, resolveImageUrls } from "@/lib/images";

async function load<T>(collection: Parameters<typeof readCollection>[0]): Promise<T[]> {
  await ensureSeeded();
  return readCollection<T>(collection);
}

function normalizeEmbassy(e: Embassy): Embassy {
  return { ...e, heroImage: resolveImageUrl(e.heroImage), gallery: resolveImageUrls(e.gallery) };
}

function normalizeAmbassador(a: Ambassador): Ambassador {
  return { ...a, photo: resolveImageUrl(a.photo) };
}

function normalizeOrganization(o: Organization): Organization {
  return {
    ...o,
    logo: resolveImageUrl(o.logo),
    heroImage: resolveImageUrl(o.heroImage),
  };
}

function normalizeEvent(e: Event): Event {
  return { ...e, image: resolveImageUrl(e.image) };
}

function normalizePodcast(p: Podcast): Podcast {
  return { ...p, image: resolveImageUrl(p.image) };
}

function normalizeVideo(v: Video): Video {
  return { ...v, thumbnail: resolveImageUrl(v.thumbnail) };
}

function normalizeSocialVideo(v: SocialVideo): SocialVideo {
  return { ...v, thumbnail: resolveImageUrl(v.thumbnail) };
}

function normalizeMagazine(m: MagazineIssue): MagazineIssue {
  return { ...m, coverImage: resolveImageUrl(m.coverImage) };
}

export async function getEmbassies() {
  return (await load<Embassy>("embassies")).map(normalizeEmbassy);
}

export async function getAmbassadors() {
  return (await load<Ambassador>("ambassadors")).map(normalizeAmbassador);
}

export async function getOrganizations() {
  return (await load<Organization>("organizations")).map(normalizeOrganization);
}

export async function getEvents() {
  return (await load<Event>("events")).map(normalizeEvent);
}

export async function getPodcasts() {
  return (await load<Podcast>("podcasts")).map(normalizePodcast);
}

export async function getVideos() {
  return (await load<Video>("videos")).map(normalizeVideo);
}

export async function getSocialVideos() {
  return (await load<SocialVideo>("social-videos")).map(normalizeSocialVideo);
}

export async function getMagazineIssues() {
  return (await load<MagazineIssue>("magazine-issues")).map(normalizeMagazine);
}

export async function getEmbassyBySlug(slug: string) {
  return (await getEmbassies()).find((e) => e.slug === slug);
}

export async function getAmbassadorBySlug(slug: string) {
  return (await getAmbassadors()).find((a) => a.slug === slug);
}

export async function getOrganizationBySlug(slug: string) {
  return (await getOrganizations()).find((o) => o.slug === slug);
}

export async function getEventBySlug(slug: string) {
  return (await getEvents()).find((e) => e.slug === slug);
}

export async function getPodcastBySlug(slug: string) {
  return (await getPodcasts()).find((p) => p.slug === slug);
}

export async function getVideoBySlug(slug: string) {
  return (await getVideos()).find((v) => v.slug === slug);
}

export async function getSocialVideoBySlug(slug: string) {
  return (await getSocialVideos()).find((v) => v.slug === slug);
}

export async function getMagazineIssueBySlug(slug: string) {
  return (await getMagazineIssues()).find((m) => m.slug === slug);
}
