import CmsContentPage from "../components/CmsContentPage.jsx";
import AboutHeroBackground from "../components/ui/AboutHeroBackground.jsx";

const fallbacks = {
  hero: {
    eyebrow: "Legal",
    title: "Terms of Use",
    description: "The rules that apply when you browse the TRIVIN website or engage with our services.",
    primaryActionLabel: "Contact us",
    primaryActionHref: "/contact",
    secondaryActionLabel: "Privacy policy",
    secondaryActionHref: "/privacy"
  },
  intro: {
    subtitle: "Agreement",
    title: "Please read these terms carefully",
    body: "By accessing this website or requesting services from TRIVIN, you agree to these terms. If you do not agree, please stop using the site."
  },
  sections: [
    {
      title: "Use of the website",
      body: "You may use this website for lawful purposes only. You agree not to misuse the site, attempt unauthorized access, or disrupt our systems or content.",
      items: []
    },
    {
      title: "Services and proposals",
      body: "Information on this website is for general guidance. Project scope, timelines, and fees are confirmed only through a written proposal or agreement between you and TRIVIN.",
      items: []
    },
    {
      title: "Intellectual property",
      body: "Website content, branding, and materials belong to TRIVIN or our licensors unless otherwise stated. You may not copy or redistribute content without permission.",
      items: []
    },
    {
      title: "Limitation of liability",
      body: "To the fullest extent permitted by law, TRIVIN is not liable for indirect or consequential damages arising from use of this website. Service warranties are defined in separate client agreements.",
      items: []
    },
    {
      title: "Changes",
      body: "We may update these terms from time to time. Continued use of the website after changes means you accept the revised terms.",
      items: []
    }
  ],
  cta: {
    heading: "Need a custom agreement?",
    body: "For project contracts, NDAs, or partnership terms, reach out to our team.",
    ctaLabel: "Contact TRIVIN",
    ctaHref: "/contact"
  }
};

const Terms = () => <CmsContentPage page="terms" fallbacks={fallbacks} background={<AboutHeroBackground />} />;

export default Terms;
