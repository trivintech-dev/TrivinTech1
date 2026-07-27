import CmsContentPage from "../components/CmsContentPage.jsx";
import ServiceHeroBackground from "../components/ui/ServiceHeroBackground.jsx";

const fallbacks = {
  hero: {
    eyebrow: "Blog",
    title: "Ideas, delivery lessons, and product insights from the TRIVIN team.",
    description:
      "Practical articles on product strategy, engineering, design systems, and building software that scales.",
    primaryActionLabel: "Talk to us",
    primaryActionHref: "/contact",
    secondaryActionLabel: "View services",
    secondaryActionHref: "/services"
  },
  intro: {
    subtitle: "Insights",
    title: "Fresh thinking for teams that ship",
    body: "Browse our latest writing on discovery, delivery, cloud, and the habits that keep product teams moving with clarity."
  },
  posts: [
    {
      title: "How to run a focused discovery sprint",
      category: "Product",
      summary: "A practical checklist for aligning goals, risks, and success metrics before build work starts.",
      date: "Mar 2026",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Design systems that survive real delivery",
      category: "Design",
      summary: "How to keep UI consistency without slowing teams down when deadlines get tight.",
      date: "Feb 2026",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Cloud choices for early-stage products",
      category: "Cloud",
      summary: "A calm way to pick infrastructure that supports growth without overengineering day one.",
      date: "Jan 2026",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
    }
  ],
  cta: {
    heading: "Want help applying these ideas?",
    body: "Share your roadmap and we will help you turn strategy into a clear delivery plan.",
    ctaLabel: "Contact TRIVIN",
    ctaHref: "/contact"
  }
};

const Blog = () => <CmsContentPage page="blog" fallbacks={fallbacks} background={<ServiceHeroBackground />} />;

export default Blog;
