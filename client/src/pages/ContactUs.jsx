import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Globe, Linkedin, Mail, MapPin, Phone, Zap } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/api.js";
import HeroBanner from "../components/HeroBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ContactHeroBackground from "../components/ui/ContactHeroBackground.jsx";
import usePageContent from "../hooks/usePageContent.js";
import useSiteSettings from "../hooks/useSiteSettings.js";
import { resolveIcon } from "../lib/iconMap.js";

const fallbacks = {
  hero: {
    eyebrow: "Contact us",
    title: "Let's build something amazing together.",
    description:
      "Have a project idea? Contact our team today and we'll help you shape the right plan, budget, and delivery path.",
    primaryActionLabel: "Send Message",
    primaryActionHref: "#contact-form",
    secondaryActionLabel: "Get Free Quote",
    secondaryActionHref: "#contact-form"
  },
  benefits: [
    { text: "Free Consultation" },
    { text: "Fast Response" },
    { text: "Dedicated Support" },
    { text: "Expert Developers" },
    { text: "Transparent Pricing" },
    { text: "Secure Delivery" }
  ],
  quickActions: [
    { title: "Book a Meeting", icon: "CalendarDays", href: "#contact-form", external: false },
    { title: "WhatsApp Support", icon: "MessageCircle", href: "https://wa.me/15551234567", external: true },
    { title: "Sales Inquiry", icon: "BriefcaseBusiness", href: "mailto:trivintech@gmail.com", external: false },
    { title: "Technical Support", icon: "Headset", href: "#faq", external: false }
  ],
  faqs: [
    {
      question: "How quickly do you respond?",
      answer: "We aim to reply within 1 to 2 business days with the next best step."
    },
    {
      question: "Do you work internationally?",
      answer: "Yes, we support clients across regions and can adapt to remote collaboration."
    },
    {
      question: "Can I request a custom quote?",
      answer: "Yes. Use the form and choose Get Free Quote so we can tailor the scope and pricing."
    },
    {
      question: "Do you sign NDA?",
      answer: "Yes, we can sign an NDA before discussing sensitive project details."
    }
  ],
  bottomCta: {
    title: "Ready to start your project?",
    subtitle: "CTA",
    ctaPrimary: "Schedule a Call",
    ctaSecondary: "Talk to Experts"
  },
  loginPrompt: {
    headline: "Want to track your inquiries?",
    body: "Login to view query history, responses, and status updates.",
    ctaLabel: "Login"
  }
};

const defaultSocials = [
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/trivintechnologies/" },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/trivin.ai?igsh=OGxjdnd1b3BqOTdh" },
  { platform: "facebook", label: "Facebook", href: "https://www.facebook.com" },
  { platform: "github", label: "GitHub", href: "https://github.com" }
];

const socialIconForPlatform = (platform) => {
  const key = (platform || "").toLowerCase();
  if (key.includes("linkedin")) return FaLinkedinIn;
  if (key.includes("instagram")) return FaInstagram;
  if (key.includes("facebook")) return FaFacebookF;
  if (key.includes("github")) return Github;
  return Linkedin;
};

const heroAction = (label, href, className) => {
  if (!label) return null;
  const target = href || "#contact-form";
  if (target.startsWith("/")) {
    return (
      <Link to={target} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={target} className={className}>
      {label}
    </a>
  );
};

const ContactUs = () => {
  const { user } = useAuth();
  const { content } = usePageContent("contact", fallbacks);
  const { settings } = useSiteSettings();
  const [status, setStatus] = useState(null);
  const [myQueries, setMyQueries] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceNeeded: "",
    budgetRange: "",
    message: ""
  });

  const hero = content.hero || fallbacks.hero;
  const benefits = content.benefits?.length ? content.benefits : fallbacks.benefits;
  const quickActions = content.quickActions?.length ? content.quickActions : fallbacks.quickActions;
  const faqs = content.faqs?.length ? content.faqs : fallbacks.faqs;
  const bottomCta = content.bottomCta || fallbacks.bottomCta;
  const loginPrompt = content.loginPrompt || fallbacks.loginPrompt;

  const contact = settings.contact || {};
  const phone = contact.phone || "+91 8979510012";
  const email = contact.email || "trivintech@gmail.com";
  const address = contact.address || "Kolkata, India";
  const workingHours = contact.workingHours || "Mon–Sat: 10 AM – 7 PM";
  const mapEmbedUrl =
    contact.mapEmbedUrl || "https://www.google.com/maps?q=Kolkata,India&output=embed";

  const socials = useMemo(() => {
    const fromSettings = settings.socials?.length ? settings.socials : defaultSocials;
    return fromSettings.map((item) => ({
      label: item.label || item.platform,
      href: item.href || item.url,
      icon: socialIconForPlatform(item.platform || item.label)
    }));
  }, [settings.socials]);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        const { data } = await api.get("/queries/me");
        setMyQueries(data.queries);
      } catch {
        // ignore
      }
    };

    load();
  }, [user]);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const submitInquiry = async (label) => {
    setStatus(null);

    const serviceNeeded = form.serviceNeeded.trim() || label;
    const message = form.message.trim();

    if (!form.fullName.trim() || !form.email.trim() || !serviceNeeded || message.length < 20) {
      setStatus({
        type: "error",
        text: "Please fill in name, email, service needed, and a message of at least 20 characters."
      });
      return;
    }

    try {
      await api.post("/contacts", {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        companyName: form.companyName.trim(),
        serviceNeeded,
        budgetRange: form.budgetRange.trim(),
        message,
        source: "contact-page"
      });
      setStatus({ type: "success", text: `${label} submitted successfully.` });
      setForm({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        serviceNeeded: "",
        budgetRange: "",
        message: ""
      });
    } catch (error) {
      setStatus({ type: "error", text: error?.response?.data?.message || "Submit failed" });
    }
  };

  return (
    <main className="space-y-12 pt-28 sm:pt-32 lg:pt-40">
      <HeroBanner
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        primaryAction={heroAction(
          hero.primaryActionLabel || hero.primaryLabel,
          hero.primaryActionHref || hero.primaryHref,
          "button-primary"
        )}
        secondaryAction={heroAction(
          hero.secondaryActionLabel || hero.secondaryLabel,
          hero.secondaryActionHref || hero.secondaryHref,
          "button-outline"
        )}
        background={<ContactHeroBackground />}
      />

      <section className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg sm:rounded-2xl border border-gray-100/15 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3 text-brand">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <h3 className="font-heading text-base sm:text-lg font-semibold text-ink">Phone Number</h3>
          </div>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600">{phone}</p>
        </div>
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand">
            <Mail className="h-5 w-5" />
            <h3 className="font-heading text-lg font-semibold text-ink">Email Address</h3>
          </div>
          <p className="mt-4 text-sm text-gray-600">{email}</p>
        </div>
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand">
            <MapPin className="h-5 w-5" />
            <h3 className="font-heading text-lg font-semibold text-ink">Office Address</h3>
          </div>
          <p className="mt-4 text-sm text-gray-600">{address}</p>
        </div>
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand">
            <Globe className="h-5 w-5" />
            <h3 className="font-heading text-lg font-semibold text-ink">Working Hours</h3>
          </div>
          <p className="mt-4 text-sm text-gray-600">{workingHours}</p>
        </div>
      </section>

      <section className="grid gap-4 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div id="contact-form" className="rounded-lg sm:rounded-2xl border border-gray-100/15 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
          <SectionHeading title="Contact form" subtitle="Lead generation" />
          <div className="grid gap-2 sm:gap-3 sm:gap-4 sm:grid-cols-2">
            <input
              value={form.fullName}
              onChange={updateField("fullName")}
              placeholder="Full Name"
              className="rounded-lg sm:rounded-xl border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm"
            />
            <input
              value={form.email}
              onChange={updateField("email")}
              type="email"
              placeholder="Email Address"
              className="rounded-lg sm:rounded-xl border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm"
            />
            <input
              value={form.phone}
              onChange={updateField("phone")}
              placeholder="Phone Number"
              className="rounded-lg sm:rounded-xl border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm"
            />
            <input
              value={form.companyName}
              onChange={updateField("companyName")}
              placeholder="Company Name"
              className="rounded-lg sm:rounded-xl border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm"
            />
            <input
              value={form.serviceNeeded}
              onChange={updateField("serviceNeeded")}
              placeholder="Service Needed"
              className="rounded-lg sm:rounded-xl border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm"
            />
            <input
              value={form.budgetRange}
              onChange={updateField("budgetRange")}
              placeholder="Budget Range"
              className="rounded-lg sm:rounded-xl border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm"
            />
          </div>
          <textarea
            value={form.message}
            onChange={updateField("message")}
            rows={5}
            placeholder="Message"
            className="mt-3 sm:mt-4 w-full rounded-lg sm:rounded-xl border border-gray-200 px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm"
          />
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
            <button type="button" onClick={() => submitInquiry("Send Message")} className="button-primary text-sm">
              Send Message
            </button>
            <button type="button" onClick={() => submitInquiry("Get Free Quote")} className="button-outline text-sm">
              Get Free Quote
            </button>
          </div>
          {status && (
            <p className={`mt-3 sm:mt-4 text-xs sm:text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
              {status.text}
            </p>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-lg sm:rounded-2xl border border-gray-100/15 bg-slate-950/40 p-4 sm:p-6 shadow-sm">
            <SectionHeading title="Quick inquiry cards" subtitle="Fast actions" />
            <div className="grid gap-2 sm:gap-3 sm:gap-4 sm:grid-cols-2">
              {quickActions.map(({ title, icon, href, external }) => {
                const Icon = resolveIcon(icon);
                return (
                  <a
                    key={title}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="rounded-lg sm:rounded-2xl border border-gray-100/15 bg-white p-3 sm:p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 text-brand">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-heading text-sm sm:text-base font-semibold text-ink">{title}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
            <SectionHeading title="Why contact us" subtitle="Benefits" />
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const text = benefit.text || benefit;
                return (
                  <div key={text} className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3 text-sm text-gray-700">
                    <Zap className="h-4 w-4 text-brand" />
                    {text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <SectionHeading title="Google map" subtitle="Location" />
          <div className="overflow-hidden rounded-2xl border border-gray-100/15">
            <iframe
              title="Office location"
              src={mapEmbedUrl}
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div id="faq" className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <SectionHeading title="FAQ" subtitle="Questions" />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl bg-mist p-4">
                <h3 className="font-heading text-base font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100/15 bg-slate-950/40 p-6 shadow-sm sm:p-8">
        <SectionHeading title={bottomCta.title} subtitle={bottomCta.subtitle || "CTA"} />
        <div className="flex flex-wrap gap-4">
          <a href="#contact-form" className="button-primary">
            {bottomCta.ctaPrimary || "Schedule a Call"}
          </a>
          <a href="#contact-form" className="button-outline">
            {bottomCta.ctaSecondary || "Talk to Experts"}
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
        <SectionHeading title="Social media links" subtitle="Follow us" />
        <div className="flex flex-wrap gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gray-100/15 bg-slate-950/5 px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
            >
              <Icon className="h-4 w-4 text-brand" />
              {label}
            </a>
          ))}
        </div>
      </section>

      {user ? (
        <section>
          <SectionHeading title="My queries" subtitle="History" />
          <div className="grid gap-4">
            {myQueries.length === 0 && <p className="text-gray-600">No queries yet.</p>}
            {myQueries.map((q) => (
              <div key={q._id} className="rounded-2xl border border-gray-100/15 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-ink">{q.subject}</div>
                    <div className="text-sm text-gray-600">{new Date(q.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-gray-500">{q.status}</div>
                </div>
                <p className="mt-2 text-gray-700">{q.message}</p>
                {q.response && (
                  <div className="mt-3 rounded-md bg-mist p-3 text-sm text-gray-700">
                    <strong>Response:</strong>
                    <div className="mt-1">{q.response}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl font-semibold text-ink">{loginPrompt.headline}</h2>
          <p className="mt-3 text-gray-600">{loginPrompt.body}</p>
          <Link to="/login" className="button-primary mt-6 inline-flex">
            {loginPrompt.ctaLabel || "Login"}
          </Link>
        </section>
      )}
    </main>
  );
};

export default ContactUs;
