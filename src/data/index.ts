/**
 * CMS Collections — sample data layer for KTM Affairs.
 * Replace with a headless CMS (Sanity, Contentful, etc.) in production.
 */

export {
  getArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticles,
  getLatestArticles,
  searchArticles,
} from "./articles";
export {
  getAuthors,
  getCategories,
  getAuthorBySlug,
  getCategoryBySlug,
  getHomepageCategories,
} from "./authors";
export { getCountries, getCountryBySlug } from "./countries";
export {
  getEmbassies,
  getAmbassadors,
  getOrganizations,
  getEvents,
  getPodcasts,
  getVideos,
  getSocialVideos,
  getMagazineIssues,
  getEmbassyBySlug,
  getAmbassadorBySlug,
  getOrganizationBySlug,
  getEventBySlug,
  getPodcastBySlug,
  getVideoBySlug,
  getSocialVideoBySlug,
  getMagazineIssueBySlug,
} from "./content";
