import CmsContentPage from "../components/CmsContentPage.jsx";
import ServiceHeroBackground from "../components/ui/ServiceHeroBackground.jsx";

const fallbacks = {
  hero: {
    eyebrow: "Services",
    title: "Cloud and DevOps that keep products reliable.",
    description:
      "Infrastructure, deployment pipelines, monitoring, and operational care for modern applications.",
    primaryActionLabel: "Talk to an expert",
    primaryActionHref: "/contact",
    secondaryActionLabel: "All services",
    secondaryActionHref: "/services"
  },
  intro: {
    subtitle: "Cloud",
    title: "Stable platforms for growing products",
    body: "We help teams deploy confidently, reduce downtime, and run cloud environments that scale with demand."
  },
  highlights: [
    { title: "Cloud architecture", description: "Practical infrastructure designed for your stage and stack." },
    { title: "CI/CD pipelines", description: "Faster, safer releases with automated checks." },
    { title: "Monitoring and care", description: "Visibility and support after launch." }
  ],
  sections: [
    {
      title: "Engagement options",
      body: "Choose a one-time setup, a migration project, or ongoing cloud operations support.",
      items: ["Cloud setup and hardening", "Deployment automation", "Observability and incident readiness"]
    }
  ],
  cta: {
    heading: "Need stronger cloud operations?",
    body: "Tell us about your stack and we will recommend the right next step.",
    ctaLabel: "Contact us",
    ctaHref: "/contact"
  }
};

const CloudDevops = () => (
  <CmsContentPage page="cloud-devops" fallbacks={fallbacks} background={<ServiceHeroBackground />} />
);

export default CloudDevops;
