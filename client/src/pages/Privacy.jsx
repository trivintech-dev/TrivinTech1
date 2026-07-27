import CmsContentPage from "../components/CmsContentPage.jsx";
import AboutHeroBackground from "../components/ui/AboutHeroBackground.jsx";

const fallbacks = {
  hero: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description: "How TRIVIN collects, uses, and protects personal information when you use our website and services.",
    primaryActionLabel: "Contact us",
    primaryActionHref: "/contact",
    secondaryActionLabel: "Terms of use",
    secondaryActionHref: "/terms"
  },
  intro: {
    subtitle: "Your data",
    title: "We respect your privacy",
    body: "This policy explains what information we may collect, why we collect it, and the choices available to you. By using our website or contacting us, you agree to the practices described here."
  },
  sections: [
    {
      title: "Information we collect",
      body: "We may collect information you provide directly, such as your name, email address, phone number, company details, and project messages when you submit forms or contact our team.",
      items: [
        "Contact and inquiry details from forms",
        "Account profile details if you register",
        "Basic usage data such as pages visited and device type"
      ]
    },
    {
      title: "How we use information",
      body: "We use personal information to respond to inquiries, deliver services, improve our website, communicate updates, and maintain security.",
      items: [
        "Respond to sales and support requests",
        "Provide contracted product and engineering services",
        "Improve site performance and content quality"
      ]
    },
    {
      title: "Sharing and retention",
      body: "We do not sell personal information. We may share data with trusted processors who help us operate our business, or when required by law. We retain information only as long as needed for the purposes described in this policy.",
      items: []
    },
    {
      title: "Your choices",
      body: "You may request access, correction, or deletion of personal information by contacting us. You can also opt out of non-essential marketing communications at any time.",
      items: []
    }
  ],
  cta: {
    heading: "Questions about privacy?",
    body: "Email our team and we will help with any privacy-related request.",
    ctaLabel: "Contact us",
    ctaHref: "/contact"
  }
};

const Privacy = () => <CmsContentPage page="privacy" fallbacks={fallbacks} background={<AboutHeroBackground />} />;

export default Privacy;
