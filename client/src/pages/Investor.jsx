import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import InvestorHeroBackground from "../components/ui/InvestorHeroBackground.jsx";
import usePageContent from "../hooks/usePageContent.js";
import useSiteSettings from "../hooks/useSiteSettings.js";

const fallbacks = {
  hero: {
    eyebrow: "Investor relations",
    title: "A dedicated view into TRIVIN's growth, financial position, and strategy.",
    description:
      "Review our operating model, growth drivers, reporting materials, and investor resources in one place.",
    primaryActionLabel: "Investment highlights",
    primaryActionHref: "#investment-highlights",
    secondaryActionLabel: "Financial reports",
    secondaryActionHref: "#financial-reports"
  },
  overview: {
    subtitle: "Overview",
    title: "Company overview",
    body: "TRIVIN provides product design, engineering, and platform support services for teams that need to launch faster and operate more reliably. Our model is built to create recurring client relationships, expand engagement depth, and support long-term value creation."
  },
  highlights: [
    { text: "Recurring services revenue with a growing base of retained clients." },
    { text: "Delivery model that combines strategy, design, and engineering in one flow." },
    { text: "Strong focus on operational discipline, quality, and margin improvement." },
    { text: "Leadership team aligned around product thinking and customer outcomes." }
  ],
  kpis: [
    { value: "$4.2M", label: "Annual revenue" },
    { value: "85%", label: "Customer retention" },
    { value: "120+", label: "Projects delivered" }
  ],
  financialReports: [{ title: "Q1 report (PDF)" }, { title: "Annual report (PDF)" }, { title: "Shareholder letter (PDF)" }],
  timeline: [
    { year: "2016", description: "Company founded and first client engagements launched." },
    { year: "2019", description: "Broadened into cloud delivery and managed services." },
    { year: "2023", description: "Reached a stronger recurring revenue mix and larger delivery capacity." }
  ],
  team: [
    { name: "Aisha Khan", title: "CEO", imageUrl: "", imagePublicId: "" },
    { name: "Ravi Patel", title: "Head of Engineering", imageUrl: "", imagePublicId: "" },
    { name: "Maya Chen", title: "Design Lead", imageUrl: "", imagePublicId: "" }
  ],
  faqs: [
    {
      question: "How can I request the latest investor deck?",
      answer: "Use the investor contact channel below and we will share the current materials."
    },
    {
      question: "Do you publish regular financial updates?",
      answer: "Yes. Quarterly reports and major announcements are posted in the resources section."
    }
  ],
  marketOpportunity: {
    subtitle: "Market",
    title: "Market opportunity",
    body: "We operate in the expanding market for product engineering, cloud modernization, and managed digital services. Demand is driven by teams that want a faster path from roadmap to production without adding internal complexity."
  },
  productInnovation: {
    subtitle: "Product",
    title: "Product innovation",
    body: "Ongoing investment in automation, reusable delivery patterns, and developer experience helps us improve margins while increasing speed and consistency for clients."
  },
  funding: {
    subtitle: "Funding",
    title: "Funding information",
    body: "Seed-stage history, current financing status, and future capital planning can be shared through investor relations materials as needed."
  },
  investorResources: [
    { text: "Investor deck and presentations" },
    { text: "Governance and policy documents" },
    { text: "Annual letters and quarterly updates" }
  ],
  stock: {
    subtitle: "Stock",
    title: "Stock information",
    body: "If and when public market information applies, this section can include ticker details, market data, and filings. Until then, the page can present private-company funding and cap table information."
  },
  esg: {
    subtitle: "ESG",
    title: "ESG and sustainability",
    body: "We focus on responsible business practices, inclusive teams, and sustainable delivery processes that reduce waste and support long-term operating discipline."
  },
  news: [{ text: "Latest company announcement and product milestone" }, { text: "Quarterly update and business summary" }],
  finalCta: {
    heading: "Stay connected",
    body: "Reach out for investor materials, reporting requests, or to start a conversation.",
    ctaLabel: "Contact investor relations",
    ctaHref: "/contact"
  }
};

const Investor = () => {
  const { content } = usePageContent("investor", fallbacks);
  const { settings } = useSiteSettings();

  const hero = content.hero || fallbacks.hero;
  const overview = content.overview || fallbacks.overview;
  const highlights = content.highlights?.length ? content.highlights : fallbacks.highlights;
  const kpis = content.kpis?.length ? content.kpis : fallbacks.kpis;
  const reports = content.financialReports?.length ? content.financialReports : fallbacks.financialReports;
  const timeline = content.timeline?.length ? content.timeline : fallbacks.timeline;
  const team = content.team?.length ? content.team : fallbacks.team;
  const faqs = content.faqs?.length ? content.faqs : fallbacks.faqs;
  const market = content.marketOpportunity || fallbacks.marketOpportunity;
  const product = content.productInnovation || fallbacks.productInnovation;
  const funding = content.funding || fallbacks.funding;
  const resources = content.investorResources?.length ? content.investorResources : fallbacks.investorResources;
  const stock = content.stock || fallbacks.stock;
  const esg = content.esg || fallbacks.esg;
  const news = content.news?.length ? content.news : fallbacks.news;
  const finalCta = content.finalCta || fallbacks.finalCta;
  const investorEmail = settings.contact?.investorEmail || "investor@trivin.example";

  return (
    <div className="space-y-12 pt-28 sm:pt-32 lg:pt-40">
      <HeroBanner
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primaryAction={
          <a href={hero.primaryActionHref || "#investment-highlights"} className="button-primary">
            {hero.primaryActionLabel || "Investment highlights"}
          </a>
        }
        secondaryAction={
          <a href={hero.secondaryActionHref || "#financial-reports"} className="button-outline">
            {hero.secondaryActionLabel || "Financial reports"}
          </a>
        }
        background={<InvestorHeroBackground />}
      />

      <main className="mx-auto max-w-6xl px-4">
        <section id="company-overview" className="mb-8">
          <SectionHeading subtitle={overview.subtitle} title={overview.title} />
          <p className="text-sm text-gray-600">{overview.body}</p>
        </section>

        <section id="investment-highlights" className="mb-8">
          <SectionHeading subtitle="Highlights" title="Investment highlights" />
          <ul className="grid gap-4 text-sm text-gray-600 md:grid-cols-2">
            {highlights.map((item) => (
              <li key={item.text || item}>{item.text || item}</li>
            ))}
          </ul>
        </section>

        <section id="kpis" className="mb-8">
          <SectionHeading subtitle="KPIs" title="Key performance indicators" />
          <div className="grid gap-6 sm:grid-cols-3">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                <div className="font-heading text-3xl font-semibold">{kpi.value}</div>
                <div className="text-sm text-gray-600">{kpi.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="financial-reports" className="mb-8">
          <SectionHeading subtitle="Reports" title="Financial reports" />
          <p className="text-sm text-gray-600">Download the latest reporting materials and published statements below.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {reports.map((report) => (
              <a key={report.title || report.label || report} className="button-outline" href={report.href || "#"}>
                {report.title || report.label || report}
              </a>
            ))}
          </div>
        </section>

        <section id="growth-timeline" className="mb-8">
          <SectionHeading subtitle="History" title="Growth timeline" />
          <ol className="space-y-4 text-sm text-gray-600">
            {timeline.map((event) => (
              <li key={event.year}>
                <strong>{event.year}:</strong> {event.description}
              </li>
            ))}
          </ol>
        </section>

        <section id="leadership" className="mb-8">
          <SectionHeading subtitle="Team" title="Leadership team" />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {team.map((person) => {
              const photo = person.imageUrl || person.photo || person.avatar;
              const initials = (person.name || "")
                .split(" ")
                .filter(Boolean)
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={person.name}
                  className="rounded-lg border border-gray-100/15 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-gray-100/15 bg-mist">
                    {photo ? (
                      <img src={photo} alt={person.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold text-ink">{initials || "?"}</span>
                    )}
                  </div>
                  <h4 className="font-heading font-semibold text-ink">{person.name}</h4>
                  <p className="mt-1 text-sm text-gray-600">{person.title || person.role}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="market-opportunity" className="mb-8">
          <SectionHeading subtitle={market.subtitle} title={market.title} />
          <p className="text-sm text-gray-600">{market.body}</p>
        </section>

        <section id="product-innovation" className="mb-8">
          <SectionHeading subtitle={product.subtitle} title={product.title} />
          <p className="text-sm text-gray-600">{product.body}</p>
        </section>

        <section id="funding" className="mb-8">
          <SectionHeading subtitle={funding.subtitle} title={funding.title} />
          <p className="text-sm text-gray-600">{funding.body}</p>
        </section>

        <section id="investor-resources" className="mb-8">
          <SectionHeading subtitle="Resources" title="Investor resources" />
          <ul className="space-y-2 text-sm text-gray-600">
            {resources.map((item) => (
              <li key={item.text || item}>{item.text || item}</li>
            ))}
          </ul>
        </section>

        <section id="stock" className="mb-8">
          <SectionHeading subtitle={stock.subtitle} title={stock.title} />
          <p className="text-sm text-gray-600">{stock.body}</p>
        </section>

        <section id="esg" className="mb-8">
          <SectionHeading subtitle={esg.subtitle} title={esg.title} />
          <p className="text-sm text-gray-600">{esg.body}</p>
        </section>

        <section id="news" className="mb-8">
          <SectionHeading subtitle="News" title="News and press releases" />
          <ul className="space-y-2 text-sm text-gray-600">
            {news.map((item) => (
              <li key={item.text || item}>{item.text || item}</li>
            ))}
          </ul>
        </section>

        <section id="faqs" className="mb-8">
          <SectionHeading subtitle="FAQs" title="Investor FAQs" />
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-lg border border-gray-100/15 bg-white p-5 shadow-sm">
                <p className="font-semibold text-ink">{item.question}</p>
                <p className="mt-2 text-sm leading-7 text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="investor-contact" className="mb-8">
          <SectionHeading subtitle="Contact" title="Investor contact" />
          <p className="text-sm text-gray-600">Email: {investorEmail}</p>
        </section>

        <section id="final-cta" className="mb-20">
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
            <h3 className="font-heading text-xl font-semibold">{finalCta.heading}</h3>
            <p className="mt-2 text-sm text-gray-600">{finalCta.body}</p>
            <div className="mt-4">
              <Link to={finalCta.ctaHref || "/contact"} className="button-primary">
                {finalCta.ctaLabel || "Contact investor relations"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Investor;
