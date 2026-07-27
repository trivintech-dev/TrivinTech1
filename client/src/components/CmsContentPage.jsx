import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading.jsx";
import HeroBanner from "./HeroBanner.jsx";
import usePageContent from "../hooks/usePageContent.js";

/**
 * Shared CMS-driven marketing page shell used by Blog, Privacy, Terms, and service topic pages.
 */
const CmsContentPage = ({ page, fallbacks, background }) => {
  const { content } = usePageContent(page, fallbacks);
  const hero = content.hero || fallbacks.hero || {};
  const intro = content.intro || fallbacks.intro || {};
  const sections = content.sections?.length ? content.sections : fallbacks.sections || [];
  const posts = content.posts?.length ? content.posts : fallbacks.posts || [];
  const highlights = content.highlights?.length ? content.highlights : fallbacks.highlights || [];
  const cta = content.cta || fallbacks.cta || null;

  const primaryHref = hero.primaryActionHref || hero.primaryHref || "/contact";
  const secondaryHref = hero.secondaryActionHref || hero.secondaryHref || "/services";
  const primaryLabel = hero.primaryActionLabel || hero.primaryLabel;
  const secondaryLabel = hero.secondaryActionLabel || hero.secondaryLabel;

  return (
    <main className="space-y-12 pt-28 sm:pt-32 lg:pt-40">
      <HeroBanner
        eyebrow={hero.eyebrow || ""}
        title={hero.title || ""}
        description={hero.description || ""}
        primaryAction={
          primaryLabel ? (
            primaryHref.startsWith("http") || primaryHref.startsWith("#") ? (
              <a href={primaryHref} className="button-primary">
                {primaryLabel}
              </a>
            ) : (
              <Link to={primaryHref} className="button-primary">
                {primaryLabel}
              </Link>
            )
          ) : null
        }
        secondaryAction={
          secondaryLabel ? (
            secondaryHref.startsWith("http") || secondaryHref.startsWith("#") ? (
              <a href={secondaryHref} className="button-outline">
                {secondaryLabel}
              </a>
            ) : (
              <Link to={secondaryHref} className="button-outline">
                {secondaryLabel}
              </Link>
            )
          ) : null
        }
        background={background}
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-16">
        {(intro.title || intro.body) && (
          <section>
            {(intro.subtitle || intro.title) && (
              <SectionHeading subtitle={intro.subtitle || "Overview"} title={intro.title || ""} />
            )}
            {intro.body && <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">{intro.body}</p>}
          </section>
        )}

        {highlights.length > 0 && (
          <section>
            <SectionHeading subtitle="Highlights" title="What you get" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title || item.text}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-heading text-base font-semibold text-ink">{item.title || "Highlight"}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.description || item.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {sections.length > 0 && (
          <section className="space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-heading text-xl font-semibold text-ink">{section.title}</h2>
                {section.body && <p className="mt-3 text-sm leading-7 text-gray-600 whitespace-pre-line">{section.body}</p>}
                {Array.isArray(section.items) && section.items.length > 0 && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}

        {posts.length > 0 && (
          <section>
            <SectionHeading subtitle="Latest" title="Articles" />
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.title} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  {post.image && (
                    <img src={post.image} alt={post.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
                  )}
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">{post.category || "Article"}</p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">{post.summary || post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>{post.date || ""}</span>
                    {post.readTime && <span>{post.readTime}</span>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {cta && (
          <section className="rounded-2xl border border-gray-100 bg-slate-950/5 p-8 text-center">
            <h2 className="font-heading text-2xl font-semibold text-ink">{cta.heading || cta.title}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600">{cta.body || cta.description}</p>
            {(cta.ctaLabel || cta.buttonLabel) && (
              <div className="mt-5">
                <Link to={cta.ctaHref || cta.buttonHref || "/contact"} className="button-primary">
                  {cta.ctaLabel || cta.buttonLabel}
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default CmsContentPage;
