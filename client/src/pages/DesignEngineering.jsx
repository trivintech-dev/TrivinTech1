import CmsContentPage from "../components/CmsContentPage.jsx";
import ServiceHeroBackground from "../components/ui/ServiceHeroBackground.jsx";

const fallbacks = {
  hero: {
    eyebrow: "Services",
    title: "Design and engineering that ship polished products.",
    description:
      "UI/UX design, modern frontend and backend engineering, and quality delivery in one connected team.",
    primaryActionLabel: "Discuss your product",
    primaryActionHref: "/contact",
    secondaryActionLabel: "All services",
    secondaryActionHref: "/services"
  },
  intro: {
    subtitle: "Build",
    title: "Design meets reliable engineering",
    body: "We combine interface craft with solid architecture so your product feels great and stays maintainable as it grows."
  },
  highlights: [
    { title: "UI/UX design", description: "Wireframes, prototypes, and design systems that convert." },
    { title: "Full-stack engineering", description: "Web and app development with clean, scalable foundations." },
    { title: "Quality delivery", description: "Reviews, testing, and iterative releases you can trust." }
  ],
  sections: [
    {
      title: "How we work",
      body: "Design and engineering collaborate from day one. That reduces handoff friction and keeps product quality high through every sprint.",
      items: ["Product design and prototyping", "Frontend and API development", "QA and release support"]
    }
  ],
  cta: {
    heading: "Need a team that can design and build?",
    body: "Share your product goals and we will outline a delivery approach.",
    ctaLabel: "Get in touch",
    ctaHref: "/contact"
  }
};

const DesignEngineering = () => (
  <CmsContentPage page="design-engineering" fallbacks={fallbacks} background={<ServiceHeroBackground />} />
);

export default DesignEngineering;
