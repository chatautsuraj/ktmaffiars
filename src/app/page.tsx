import { HeroSection } from "@/components/home/hero-section";
import { BreakingTicker } from "@/components/home/breaking-ticker";
import { ArticleSection, SectionHeader } from "@/components/home/article-section";
import { MembershipSection } from "@/components/home/membership-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { getArticles } from "@/data/articles";
import { getHomepageCategories } from "@/data/authors";
import { getCountries } from "@/data/countries";
import { getEvents, getPodcasts, getVideos, getSocialVideos } from "@/data/content";
import Link from "next/link";
import { MediaThumb } from "@/components/home/media-thumb";
import { SocialVideoSlider } from "@/components/home/social-video-slider";
import { CountryCard } from "@/components/cards/country-card";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [articles, homepageCategories, countries, events, podcasts, videos, socialVideos] =
    await Promise.all([
      getArticles(),
      getHomepageCategories(),
      getCountries(),
      getEvents(),
      getPodcasts(),
      getVideos(),
      getSocialVideos(),
    ]);

  const heroArticle = articles.find((a) => a.isFeatured) || articles[0];
  const secondaryHero = articles.filter((a) => a.id !== heroArticle.id).slice(0, 5);
  const editorsPicks = articles.filter((a) => a.isFeatured).slice(0, 4);
  const latestNews = articles.slice(0, 6);
  const homepageCategorySections = homepageCategories
    .map((category) => ({
      category,
      articles: articles.filter((a) => a.category.slug === category.slug).slice(0, 3),
    }))
    .filter((section) => section.articles.length > 0);
  const socialVideosData = socialVideos.map((video) => ({ ...video }));
  const breaking =
    articles.filter((a) => a.isBreaking).slice(0, 5).length > 0
      ? articles.filter((a) => a.isBreaking).slice(0, 5)
      : articles.slice(0, 5);

  return (
    <>
      <BreakingTicker articles={breaking} />
      <HeroSection article={heroArticle} secondaryArticles={secondaryHero} />

      <ArticleSection
        title="Editor's Picks"
        subtitle="Curated by our editorial team"
        articles={editorsPicks}
        variant="featured"
        href="/category/analysis"
        muted
      />

      <ArticleSection
        title="Latest"
        articles={latestNews}
        href="/category/diplomacy"
        columns={3}
      />

      {homepageCategorySections.map(({ category, articles: categoryArticles }, index) => (
        <ArticleSection
          key={category.id}
          title={category.name}
          articles={categoryArticles}
          href={`/category/${category.slug}`}
          columns={3}
          muted={index % 2 === 0}
        />
      ))}

      <section className="section-y">
        <div className="container-editorial">
          <SectionHeader title="Countries" subtitle="Bilateral relations and diplomatic profiles" href="/countries" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.slice(0, 4).map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-border">
        <div className="container-editorial">
          <SectionHeader title="Embassy Watch" href="/embassies" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Embassy of India", slug: "indian-embassy-kathmandu", country: "India" },
              { name: "Embassy of China", slug: "chinese-embassy-kathmandu", country: "China" },
              { name: "U.S. Embassy", slug: "us-embassy-kathmandu", country: "United States" },
            ].map((embassy) => (
              <Link
                key={embassy.slug}
                href={`/embassy/${embassy.slug}`}
                className="card-elevated p-6 group"
              >
                <p className="section-label mb-2">{embassy.country}</p>
                <h3 className="font-serif text-xl font-semibold group-hover:text-gold transition-colors">{embassy.name}</h3>
                <p className="text-sm text-muted mt-2">Kathmandu, Nepal</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-light-gray/70 dark:bg-secondary/30">
        <div className="container-editorial">
          <SectionHeader title="Events, Podcasts & Videos" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-elevated p-6">
              <h3 className="font-serif text-lg font-bold mb-5">Events</h3>
              <div className="space-y-5">
                {events.map((event) => (
                  <Link key={event.id} href={`/events#${event.slug}`} className="block group">
                    <p className="text-xs text-gold font-semibold tracking-wider">{formatDate(event.date)}</p>
                    <p className="font-serif font-medium group-hover:text-gold transition-colors mt-1 leading-snug">{event.title}</p>
                  </Link>
                ))}
              </div>
              <Link href="/events" className="text-sm text-gold mt-5 inline-block hover:underline">All events →</Link>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-serif text-lg font-bold mb-5">Podcasts</h3>
              <div className="space-y-4">
                {podcasts.map((podcast) => (
                  <MediaThumb
                    key={podcast.id}
                    href={`/podcasts/${podcast.slug}`}
                    src={podcast.image}
                    alt={podcast.title}
                    title={podcast.title}
                    meta={podcast.duration}
                  />
                ))}
              </div>
              <Link href="/podcasts" className="text-sm text-gold mt-5 inline-block hover:underline">All podcasts →</Link>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-serif text-lg font-bold mb-5">Videos</h3>
              <div className="space-y-4">
                {videos.map((video) => (
                  <MediaThumb
                    key={video.id}
                    href={`/videos/${video.slug}`}
                    src={video.thumbnail}
                    alt={video.title}
                    title={video.title}
                    meta={video.duration}
                    aspect="video"
                  />
                ))}
              </div>
              <Link href="/videos" className="text-sm text-gold mt-5 inline-block hover:underline">All videos →</Link>
            </div>
          </div>
        </div>
      </section>

      <SocialVideoSlider videos={socialVideosData} />

      <NewsletterSection />
      <MembershipSection />
    </>
  );
}
