import { getArticles } from "@/data/articles";

export async function GET() {
  const articles = await getArticles();
  const items = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 50)
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://ktmaffairs.com/article/${article.slug}</link>
      <guid>https://ktmaffairs.com/article/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${article.excerpt}]]></description>
      <category>${article.category.name}</category>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KTM Affairs</title>
    <link>https://ktmaffairs.com</link>
    <description>Where Nepal Meets the World — Premium international affairs journalism.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://ktmaffairs.com/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
