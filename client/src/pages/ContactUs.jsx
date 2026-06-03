import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Github, Globe, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, CalendarDays, Headset, BriefcaseBusiness, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/api.js";
import HeroBanner from "../components/HeroBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ContactHeroBackground from "../components/ui/ContactHeroBackground.jsx";

const ContactUs = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        const { data } = await api.get("/queries/me");
        setMyQueries(data.queries);
      } catch (error) {
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

    const subjectParts = [label, form.serviceNeeded, form.companyName].filter(Boolean);
    const subject = subjectParts.join(" • ") || label;
    const message = [
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Company: ${form.companyName}`,
      `Service Needed: ${form.serviceNeeded}`,
      `Budget Range: ${form.budgetRange}`,
      "",
      form.message
    ].join("\n");

    try {
      const { data } = await api.post("/queries", { subject, message });
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
      if (user) {
        setMyQueries((current) => [data.query, ...current]);
      }
    } catch (error) {
      setStatus({ type: "error", text: error?.response?.data?.message || "Submit failed" });
    }
  };

  const quickActions = [
    { title: "Book a Meeting", icon: CalendarDays, href: "#contact-form" },
    { title: "WhatsApp Support", icon: MessageCircle, href: "https://wa.me/15551234567", external: true },
    { title: "Sales Inquiry", icon: BriefcaseBusiness, href: "mailto:trivintech@gmail.com" },
    { title: "Technical Support", icon: Headset, href: "#faq" }
  ];

  const benefits = ["Free Consultation", "Fast Response", "Dedicated Support", "Expert Developers", "Transparent Pricing", "Secure Delivery"];

  const faqs = [
    { question: "How quickly do you respond?", answer: "We aim to reply within 1 to 2 business days with the next best step." },
    { question: "Do you work internationally?", answer: "Yes, we support clients across regions and can adapt to remote collaboration." },
    { question: "Can I request a custom quote?", answer: "Yes. Use the form and choose Get Free Quote so we can tailor the scope and pricing." },
    { question: "Do you sign NDA?", answer: "Yes, we can sign an NDA before discussing sensitive project details." }
  ];

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
    { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com", icon: Facebook },
    { label: "GitHub", href: "https://github.com", icon: Github }
  ];

  return (
    <div className="space-y-8 pt-20 sm:pt-24 lg:pt-32">
      <HeroBanner
        eyebrow="Contact us"
        title="Let’s build something amazing together."
        description="Have a project idea? Contact our team today and we’ll help you shape the right plan, budget, and delivery path."
        primaryAction={<a href="#contact-form" className="button-primary">Send Message</a>}
        secondaryAction={<a href="#contact-form" className="button-outline">Get Free Quote</a>}
        background={<ContactHeroBackground />}
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand"><Phone className="h-5 w-5" /><h3 className="font-heading text-lg font-semibold text-ink">Phone Number</h3></div>
          <p className="mt-4 text-sm text-gray-600">+91 8979510012</p>
        </div>
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand"><Mail className="h-5 w-5" /><h3 className="font-heading text-lg font-semibold text-ink">Email Address</h3></div>
          <p className="mt-4 text-sm text-gray-600">trivintech@gmail.com</p>
        </div>
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand"><MapPin className="h-5 w-5" /><h3 className="font-heading text-lg font-semibold text-ink">Office Address</h3></div>
          <p className="mt-4 text-sm text-gray-600">Kolkata, India</p>
        </div>
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand"><Globe className="h-5 w-5" /><h3 className="font-heading text-lg font-semibold text-ink">Working Hours</h3></div>
          <p className="mt-4 text-sm text-gray-600">Mon–Sat: 10 AM – 7 PM</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div id="contact-form" className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading title="Contact form" subtitle="Lead generation" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.fullName} onChange={updateField("fullName")} placeholder="Full Name" className="rounded-xl border border-gray-200 px-3 py-2" />
            <input value={form.email} onChange={updateField("email")} type="email" placeholder="Email Address" className="rounded-xl border border-gray-200 px-3 py-2" />
            <input value={form.phone} onChange={updateField("phone")} placeholder="Phone Number" className="rounded-xl border border-gray-200 px-3 py-2" />
            <input value={form.companyName} onChange={updateField("companyName")} placeholder="Company Name" className="rounded-xl border border-gray-200 px-3 py-2" />
            <input value={form.serviceNeeded} onChange={updateField("serviceNeeded")} placeholder="Service Needed" className="rounded-xl border border-gray-200 px-3 py-2" />
            <input value={form.budgetRange} onChange={updateField("budgetRange")} placeholder="Budget Range" className="rounded-xl border border-gray-200 px-3 py-2" />
          </div>
          <textarea value={form.message} onChange={updateField("message")} rows={5} placeholder="Message" className="mt-4 w-full rounded-xl border border-gray-200 px-3 py-2" />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => submitInquiry("Send Message")} className="button-primary">Send Message</button>
            <button type="button" onClick={() => submitInquiry("Get Free Quote")} className="button-outline">Get Free Quote</button>
          </div>
          {status && <p className={`mt-4 text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>{status.text}</p>}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100/15 bg-slate-950/40 p-6 shadow-sm">
            <SectionHeading title="Quick inquiry cards" subtitle="Fast actions" />
            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map(({ title, icon: Icon, href, external }) => (
                <a key={title} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="rounded-2xl border border-gray-100/15 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-3 text-brand"><Icon className="h-5 w-5" /><span className="font-heading text-base font-semibold text-ink">{title}</span></div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
            <SectionHeading title="Why contact us" subtitle="Benefits" />
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3 text-sm text-gray-700"><Zap className="h-4 w-4 text-brand" />{benefit}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <SectionHeading title="Google map" subtitle="Location" />
          <div className="overflow-hidden rounded-2xl border border-gray-100/15">
            <iframe title="Office location" src="https://www.google.com/maps?q=Kolkata,India&output=embed" className="h-[360px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
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
        <SectionHeading title="Ready to start your project?" subtitle="CTA" />
        <div className="flex flex-wrap gap-4">
          <a href="#contact-form" className="button-primary">Schedule a Call</a>
          <a href="#contact-form" className="button-outline">Talk to Experts</a>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
        <SectionHeading title="Social media links" subtitle="Follow us" />
        <div className="flex flex-wrap gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gray-100/15 bg-slate-950/5 px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5">
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
                {q.response && <div className="mt-3 rounded-md bg-mist p-3 text-sm text-gray-700"><strong>Response:</strong><div className="mt-1">{q.response}</div></div>}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl font-semibold text-ink">Want to track your inquiries?</h2>
          <p className="mt-3 text-gray-600">Login to view query history, responses, and status updates.</p>
          <Link to="/login" className="button-primary mt-6 inline-flex">Login</Link>
        </section>
      )}
    </div>
  );
};

export default ContactUs;
