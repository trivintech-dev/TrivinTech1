import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AboutHeroBackground from "../components/ui/AboutHeroBackground.jsx";
import usePageContent from "../hooks/usePageContent.js";

const fallbacks = {
  hero: {
    eyebrow: "About us",
    title: "TRIVIN is a product and technology company built around execution, clarity, and long-term partnerships.",
    description:
      "We design, build, and support digital products with a delivery model that keeps strategy, engineering, and care tightly connected.",
    primaryActionLabel: "Our story",
    primaryActionHref: "#company-story",
    secondaryActionLabel: "Work with us",
    secondaryActionHref: "/contact"
  },
  story: {
    sectionSubtitle: "Who we are",
    sectionTitle: "Company story",
    body: "Founded to help teams ship with confidence, TRIVIN blends pragmatic engineering, product thinking, and design craft. We work across discovery, delivery, and ongoing improvement so our clients get one partner from idea to scale."
  },
  missionVisionValues: {
    mission: {
      heading: "Mission",
      body: "Help teams launch and evolve products with speed, reliability, and clear communication."
    },
    vision: {
      heading: "Vision",
      body: "Become the most trusted product delivery partner for ambitious organizations."
    },
    values: {
      heading: "Values",
      items: ["Own the outcome", "Communicate clearly", "Improve continuously"]
    }
  },
  howWeWork: [
    { label: "Discover", body: "We align on the problem, users, and outcomes." },
    { label: "Design", body: "We shape ideas into testable product plans and prototypes." },
    { label: "Build", body: "We ship incrementally with tight quality control." },
    { label: "Support", body: "We stay involved after launch to keep systems healthy." }
  ],
  culture: [
    { text: "Small, focused teams that move quickly without losing alignment." },
    { text: "Direct communication and honest expectations from day one." },
    { text: "Delivery that balances speed, quality, and maintainability." },
    { text: "Partnership that continues after launch instead of ending at handoff." }
  ],
  team: [
    { name: "Aisha Khan", role: "CEO" },
    { name: "Ravi Patel", role: "Head of Engineering" },
    { name: "Maya Chen", role: "Design Lead" }
  ],
  stats: [
    { value: "120+", label: "Projects delivered" },
    { value: "50+", label: "Happy clients" },
    { value: "99.9%", label: "Platform uptime SLA" }
  ],
  testimonial: {
    quote: "TRIVIN turned a rough concept into a reliable product with a clear delivery rhythm.",
    attribution: "- Product Lead, Acme Corp"
  },
  careersCta: {
    heading: "Join our team",
    body: "We are always looking for people who care about product quality and thoughtful delivery.",
    ctaLabel: "View careers",
    ctaHref: "/jobs"
  },
  contactCta: {
    heading: "Talk to us",
    body: "Have a product idea or a delivery challenge? We are ready to help.",
    ctaLabel: "Contact us",
    ctaHref: "/contact"
  }
};

const AboutUs = () => {
  const { content } = usePageContent("about", fallbacks);
  const hero = content.hero || fallbacks.hero;
  const story = content.story || fallbacks.story;
  const mv = content.missionVisionValues || fallbacks.missionVisionValues;
  const howWeWork = content.howWeWork?.length ? content.howWeWork : fallbacks.howWeWork;
  const culture = content.culture?.length ? content.culture : fallbacks.culture;
  const team = content.team?.length ? content.team : fallbacks.team;
  const stats = content.stats?.length ? content.stats : fallbacks.stats;
  const testimonial = content.testimonial || fallbacks.testimonial;
  const careersCta = content.careersCta || fallbacks.careersCta;
  const contactCta = content.contactCta || fallbacks.contactCta;

  return (
    <main className="space-y-12 pt-28 sm:pt-32 lg:pt-40">
      <HeroBanner
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primaryAction={
          <a href={hero.primaryActionHref || "#company-story"} className="button-primary">
            {hero.primaryActionLabel || "Our story"}
          </a>
        }
        secondaryAction={
          <Link to={hero.secondaryActionHref || "/contact"} className="button-outline">
            {hero.secondaryActionLabel || "Work with us"}
          </Link>
        }
        background={<AboutHeroBackground />}
      />

      <div className="mx-auto max-w-6xl px-4">
        <section id="company-story" className="prose mx-auto mb-8">
          <SectionHeading subtitle={story.sectionSubtitle} title={story.sectionTitle} />
          <p>{story.body}</p>
        </section>

        <section id="mission-values" className="mb-8">
          <SectionHeading subtitle="Purpose" title="Mission, vision, and values" />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <h3 className="font-semibold">{mv.mission?.heading || "Mission"}</h3>
              <p className="mt-2 text-sm text-gray-600">{mv.mission?.body}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <h3 className="font-semibold">{mv.vision?.heading || "Vision"}</h3>
              <p className="mt-2 text-sm text-gray-600">{mv.vision?.body}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <h3 className="font-semibold">{mv.values?.heading || "Values"}</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {(mv.values?.items || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="how-we-work" className="mb-8">
          <SectionHeading subtitle="Delivery model" title="How we work" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((step) => (
              <div key={step.label} className="rounded-lg border border-gray-100 bg-white p-6">
                <strong>{step.label}:</strong>
                <p className="mt-2 text-sm text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="culture" className="mb-8">
          <SectionHeading subtitle="Culture" title="What working with us feels like" />
          <ul className="grid gap-4 text-sm text-gray-600 md:grid-cols-2">
            {culture.map((item) => (
              <li key={item.text || item}>{item.text || item}</li>
            ))}
          </ul>
        </section>

        <section id="team" className="mb-8">
          <SectionHeading subtitle="Leadership" title="Team members" />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {team.map((person) => {
              const photo = person.imageUrl || person.photo || person.avatar;
              const initials = (person.name || "")
                .split(" ")
                .map((part) => part[0])
                .join("");

              return (
                <div key={person.name} className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                  <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                    {photo ? (
                      <img src={photo} alt={person.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold">{initials}</span>
                    )}
                  </div>
                  <h4 className="font-semibold">{person.name}</h4>
                  <p className="mt-1 text-sm text-gray-600">{person.role || person.title}</p>
                  {person.bio ? <p className="mt-2 text-xs leading-5 text-gray-500">{person.bio}</p> : null}
                  {person.linkedinUrl ? (
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-xs font-semibold text-cyan-600 hover:text-cyan-500"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section id="stats" className="mb-8">
          <SectionHeading subtitle="Impact" title="Company snapshot" />
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                <div className="font-heading text-3xl font-semibold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mb-8">
          <SectionHeading subtitle="Client voice" title="What clients say" />
          <blockquote className="rounded-lg border border-gray-100 bg-white p-6">
            <p className="text-sm text-gray-600">"{testimonial.quote}"</p>
            <cite className="mt-2 block text-xs text-gray-500">{testimonial.attribution}</cite>
          </blockquote>
        </section>

        <section id="careers-cta" className="mb-8">
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
            <h3 className="font-heading text-xl font-semibold">{careersCta.heading}</h3>
            <p className="mt-2 text-sm text-gray-600">{careersCta.body}</p>
            <div className="mt-4">
              <Link to={careersCta.ctaHref || "/jobs"} className="button-primary">
                {careersCta.ctaLabel || "View careers"}
              </Link>
            </div>
          </div>
        </section>

        <section id="contact-cta" className="mb-20">
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
            <h3 className="font-heading text-xl font-semibold">{contactCta.heading}</h3>
            <p className="mt-2 text-sm text-gray-600">{contactCta.body}</p>
            <div className="mt-4">
              <Link to={contactCta.ctaHref || "/contact"} className="button-primary">
                {contactCta.ctaLabel || "Contact us"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
