import CmsContentPage from "../components/CmsContentPage.jsx";
import ServiceHeroBackground from "../components/ui/ServiceHeroBackground.jsx";

const fallbacks = {
  hero: {
    eyebrow: "Services",
    title: "Product discovery that turns ideas into a clear delivery plan.",
    description:
      "Workshops, research, and roadmap definition so your team builds the right product with confidence.",
    primaryActionLabel: "Start discovery",
    primaryActionHref: "/contact",
    secondaryActionLabel: "All services",
    secondaryActionHref: "/services"
  },
  intro: {
    subtitle: "Discovery",
    title: "Clarity before code",
    body: "Our discovery engagements help you validate goals, map users, reduce risk, and define a practical path from concept to first release."
  },
  highlights: [
    { title: "Kickoff workshops", description: "Align stakeholders on problem, outcomes, and constraints." },
    { title: "User and market signals", description: "Capture the evidence needed to prioritize with confidence." },
    { title: "Delivery roadmap", description: "Leave with scope, milestones, and a build-ready plan." }
  ],
  sections: [
    {
      title: "What’s included",
      body: "A focused discovery engagement typically covers problem framing, opportunity mapping, technical feasibility, and a recommended release plan.",
      items: ["Stakeholder interviews", "Journey and opportunity mapping", "Success metrics", "MVP scope recommendation"]
    },
    {
      title: "Best for",
      body: "Founders and product teams preparing to launch a new product, rebuild an existing system, or unlock a stuck roadmap.",
      items: []
    }
  ],
  cta: {
    heading: "Ready to define your next build?",
    body: "Tell us about your product goals and we will propose a discovery plan.",
    ctaLabel: "Book a call",
    ctaHref: "/contact"
  }
};

const ProductDiscovery = () => (
  <CmsContentPage page="product-discovery" fallbacks={fallbacks} background={<ServiceHeroBackground />} />
);

export default ProductDiscovery;
