import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../JsonLd";
import SiteContact from "../../SiteContact";
import SiteHeader from "../../SiteHeader";
import { authorList, getInsightAuthor } from "../../content/authors";
import { insights } from "../../content/insights";
import { arabicInsightCards } from "../../content/insights-ar";
import { getRequestLocale } from "../../i18n";
import { localizedPath } from "../../locale";
import { localizedAlternates } from "../../seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

type AuthorPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return authorList.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getInsightAuthor(slug);
  if (!author) return {};
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";

  return {
    title: `${author.name} — ${isArabic ? author.roleAr : author.role}`,
    description: isArabic ? author.bioAr : author.bio,
    authors: [{ name: author.name, url: `${siteUrl}/authors/${author.slug}` }],
    alternates: localizedAlternates(`/authors/${author.slug}`, locale),
    openGraph: {
      type: "profile",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${siteUrl}${isArabic ? "/ar" : ""}/authors/${author.slug}`,
      title: author.name,
      description: isArabic ? author.bioAr : author.bio,
      images: [{ url: `${siteUrl}/team/${author.image}`, alt: author.name }],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getInsightAuthor(slug);
  if (!author) notFound();
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const articles = insights.filter((insight) => insight.author === author.slug);
  const authorUrl = `${siteUrl}${isArabic ? "/ar" : ""}/authors/${author.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: authorUrl,
    name: `${author.name} — ${isArabic ? author.roleAr : author.role}`,
    inLanguage: isArabic ? "ar-AE" : "en-AE",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/authors/${author.slug}#person`,
      name: author.name,
      jobTitle: author.role,
      description: isArabic ? author.bioAr : author.bio,
      image: `${siteUrl}/team/${author.image}`,
      url: authorUrl,
      knowsAbout: author.topics,
      worksFor: { "@id": `${siteUrl}/#organization` },
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#main-content">{isArabic ? "الانتقال إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader />
      <main id="main-content" className="inner-page-main author-page">
        <section className="author-profile-hero section-pad" aria-labelledby="author-name">
          <div className="author-profile-heading">
            <p className="section-kicker">{isArabic ? "كاتب وخبير" : "Author and practitioner"}</p>
            <h1 id="author-name">{author.name}</h1>
            <p>{isArabic ? author.roleAr : author.role}</p>
          </div>
          <figure>
            <Image
              src={publicAsset(`/team/${author.image}`)}
              alt={author.name}
              width={720}
              height={900}
              sizes="(max-width: 700px) calc(100vw - 40px), 34vw"
              priority
              unoptimized
            />
          </figure>
          <div className="author-profile-bio">
            <p>{isArabic ? author.bioAr : author.bio}</p>
            <ul aria-label={isArabic ? "مجالات الكتابة" : "Writing areas"}>
              {author.topics.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
            <Link href={localizedPath("/about#team", locale)}>{isArabic ? "تعرّف على فريق ون بونساي الخليج" : "Meet the OneBonsai Gulf team"} <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span></Link>
          </div>
        </section>

        <section className="author-articles section-pad" aria-labelledby="author-articles-title">
          <header>
            <p className="section-kicker">{isArabic ? "رؤى منشورة" : "Published insights"}</p>
            <h2 id="author-articles-title">{isArabic ? `مقالات ${author.name}` : `Articles by ${author.name}`}</h2>
          </header>
          <div>
            {articles.map((insight, index) => {
              const card = isArabic ? arabicInsightCards[insight.slug] : insight;
              return (
                <article key={insight.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{card.cluster} · {insight.readTime}</p>
                    <h3><Link href={localizedPath(`/insights/${insight.slug}`, locale)}>{card.title}</Link></h3>
                    <p>{card.description}</p>
                  </div>
                  <Link href={localizedPath(`/insights/${insight.slug}`, locale)} aria-label={isArabic ? `اقرأ ${card.title}` : `Read ${card.title}`}>{isArabic ? "اقرأ" : "Read"} <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span></Link>
                </article>
              );
            })}
          </div>
        </section>
        <SiteContact />
      </main>
    </>
  );
}
