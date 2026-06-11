import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Award, Bot, Building2, Cloud, Code2, DollarSign, Globe, Layers3, Lock, MessageSquareQuote, ShoppingCart, ShieldCheck, Sparkles, Star, Stethoscope, TrendingUp, Users, Zap, BookOpen, Truck, Clipboard, MapPin, Palette, Rocket, Bug, Wrench, CheckCircle2 } from "lucide-react";
import { BiLogoAws } from "react-icons/bi";
import { FaJava, FaLaravel, FaPhp, FaPython } from "react-icons/fa6";
import { SiDocker, SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiSpringboot } from "react-icons/si";
import api from "../api/api.js";
import HeroBanner from "../components/HeroBanner.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ServiceHeroBackground from "../components/ui/ServiceHeroBackground.jsx";

const Services = () => {
  const [services, setServices] = useState([]);
  const [features, setFeatures] = useState([]);
  const [pricingPackages, setPricingPackages] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q")?.trim().toLowerCase() || "";

  const defaultServiceFeatures = [
    { title: "Responsive Design", icon: Sparkles, description: "Interfaces that adapt cleanly to every screen size." },
    { title: "Admin Dashboard", icon: Layers3, description: "A central place for managing content, users, and workflows." },
    { title: "API Integration", icon: Globe, description: "Connect external systems, data sources, and business logic." },
    { title: "Authentication System", icon: ShieldCheck, description: "Secure sign-in, authorization, and role-based access." },
    { title: "SEO Optimization", icon: Award, description: "Foundational performance and on-page optimization for visibility." },
    { title: "Payment Gateway", icon: Lock, description: "Reliable checkout and billing flows for transactional products." },
    { title: "Cloud Deployment", icon: Cloud, description: "Deployable infrastructure with scalable hosting patterns." },
    { title: "AI Automation", icon: Bot, description: "Practical automations that reduce manual work and improve speed." }
  ];

  const industries = [
    {
      name: "Healthcare",
      icon: Stethoscope,
      color: "#ec4899",
      glow: "from-pink-400/20 to-pink-400/5",
      description: "HIPAA-compliant portals, appointment scheduling, and patient management systems.",
      capabilities: ["Patient portals", "Appointment systems", "Telemedicine", "Medical records"]
    },
    {
      name: "E-commerce",
      icon: ShoppingCart,
      color: "#f59e0b",
      glow: "from-amber-400/20 to-amber-400/5",
      description: "Conversion-focused storefronts, inventory management, and checkout optimization.",
      capabilities: ["Product catalogs", "Payment integration", "Inventory tracking", "Order management"]
    },
    {
      name: "Education",
      icon: BookOpen,
      color: "#06b6d4",
      glow: "from-cyan-400/20 to-cyan-400/5",
      description: "Learning management systems, course platforms, and student engagement tools.",
      capabilities: ["LMS platforms", "Course delivery", "Student dashboards", "Progress tracking"]
    },
    {
      name: "Finance",
      icon: TrendingUp,
      color: "#10b981",
      glow: "from-emerald-400/20 to-emerald-400/5",
      description: "Secure dashboards, transaction management, and real-time financial reporting.",
      capabilities: ["Analytics dashboards", "Transaction handling", "Compliance reporting", "Security features"]
    },
    {
      name: "Logistics",
      icon: Truck,
      color: "#3b82f6",
      glow: "from-blue-400/20 to-blue-400/5",
      description: "Real-time tracking, route optimization, and supply chain visibility.",
      capabilities: ["Fleet tracking", "Route optimization", "Supply chain", "Real-time updates"]
    },
    {
      name: "Real Estate",
      icon: Building2,
      color: "#8b5cf6",
      glow: "from-violet-400/20 to-violet-400/5",
      description: "Property portals, virtual tours, and lead management for agents.",
      capabilities: ["Property listing", "Virtual tours", "Lead capture", "Agent tools"]
    }
  ];

  const techStack = [
    { name: "React", icon: SiReact, color: "#61dafb", glow: "from-cyan-400/20 to-cyan-400/5" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", glow: "from-gray-200/15 to-gray-200/5" },
    { name: "Node.js", icon: SiNodedotjs, color: "#68a063", glow: "from-emerald-400/20 to-emerald-400/5" },
    { name: "MongoDB", icon: SiMongodb, color: "#47a248", glow: "from-green-400/20 to-green-400/5" },
    { name: "AWS", icon: BiLogoAws, color: "#ff9900", glow: "from-amber-400/20 to-amber-400/5" },
    { name: "Docker", icon: SiDocker, color: "#2496ed", glow: "from-sky-400/20 to-sky-400/5" },
    { name: "Java", icon: FaJava, color: "#f89820", glow: "from-orange-400/20 to-orange-400/5" },
    { name: "Python", icon: FaPython, color: "#3776ab", glow: "from-blue-400/20 to-blue-400/5" },
    { name: "MERN Stack", badge: "MERN", color: "#6ee7ff", glow: "from-cyan-400/20 to-cyan-400/5" },
    { name: "MEAN Stack", badge: "MEAN", color: "#22c55e", glow: "from-emerald-400/20 to-emerald-400/5" },
    { name: "PHP", icon: FaPhp, color: "#777bb4", glow: "from-violet-400/20 to-violet-400/5" },
    { name: "Laravel", icon: FaLaravel, color: "#ff2d20", glow: "from-red-400/20 to-red-400/5" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f", glow: "from-lime-400/20 to-lime-400/5" }
  ];

  const stackCarousel = [...techStack, ...techStack];

  const defaultPricingPackages = [
    {
      name: "Starter",
      desc: "Small service package for launch-ready websites.",
      description: "Small service package for launch-ready websites.",
      price: "₹1,200",
      badge: "Launch",
      idealFor: "Fast launch",
      featured: false,
      features: ["Landing page", "Basic integrations", "Email support"]
    },
    {
      name: "Small Business Website",
      desc: "Design, content, and conversion-focused pages.",
      description: "Design, content, and conversion-focused pages.",
      price: "₹3,500",
      badge: "Recommended",
      idealFor: "Growing businesses",
      featured: true,
      features: ["Multi-page site", "Responsive UI", "Priority support"]
    },
    {
      name: "Enterprise",
      desc: "Full SaaS platform with APIs and scale planning.",
      description: "Full SaaS platform with APIs and scale planning.",
      price: "Custom",
      badge: "Scale",
      idealFor: "Complex builds",
      featured: false,
      features: ["Architecture planning", "Dedicated team", "Ongoing maintenance"]
    }
  ];

  const currentPricingPackages = pricingPackages.length > 0 ? pricingPackages : defaultPricingPackages;

  const processSteps = [
    {
      title: "Requirement Gathering",
      icon: Clipboard,
      color: "#06b6d4",
      glow: "from-cyan-400/20 to-cyan-400/5",
      description: "We listen, analyze, and document your project goals, constraints, and success metrics.",
      details: ["Stakeholder interviews", "Scope definition", "Requirements doc", "Success metrics"]
    },
    {
      title: "Planning",
      icon: MapPin,
      color: "#3b82f6",
      glow: "from-blue-400/20 to-blue-400/5",
      description: "We create a detailed roadmap with milestones, timelines, and resource allocation.",
      details: ["Technical roadmap", "Sprint planning", "Resource allocation", "Risk assessment"]
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      color: "#f59e0b",
      glow: "from-amber-400/20 to-amber-400/5",
      description: "We design interfaces that are intuitive, beautiful, and aligned with your brand.",
      details: ["Wireframing", "Design system", "Prototyping", "User testing"]
    },
    {
      title: "Development",
      icon: Code2,
      color: "#10b981",
      glow: "from-emerald-400/20 to-emerald-400/5",
      description: "We build scalable, clean code following best practices and industry standards.",
      details: ["Frontend development", "Backend APIs", "Database design", "Infrastructure setup"]
    },
    {
      title: "Testing",
      icon: Bug,
      color: "#8b5cf6",
      glow: "from-violet-400/20 to-violet-400/5",
      description: "We perform comprehensive testing to ensure quality, performance, and reliability.",
      details: ["Unit testing", "Integration tests", "Performance testing", "Security audit"]
    },
    {
      title: "Launch",
      icon: Rocket,
      color: "#ec4899",
      glow: "from-pink-400/20 to-pink-400/5",
      description: "We deploy with confidence, managing the release and ensuring smooth handoff.",
      details: ["Deployment planning", "Production setup", "Monitoring config", "Team training"]
    },
    {
      title: "Maintenance",
      icon: Wrench,
      color: "#f97316",
      glow: "from-orange-400/20 to-orange-400/5",
      description: "We provide ongoing support, updates, and optimization for long-term success.",
      details: ["Bug fixes", "Performance tuning", "Feature updates", "Security patches"]
    }
  ];

  const advantages = [
    "Experienced Team",
    "Agile Development",
    "Fast Delivery",
    "Affordable Pricing",
    "Dedicated Support",
    "Scalable Solutions"
  ];

  const projects = [
    {
      title: "Retail operations portal",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      goal: "Centralized order handling and team reporting.",
      result: "Reduced manual updates and improved turnaround time.",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Healthcare booking suite",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      goal: "A secure appointment and patient communication flow.",
      result: "Streamlined scheduling across multiple service lines.",
      technologies: ["Next.js", "AWS", "Docker"]
    },
    {
      title: "Finance dashboard",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      goal: "Real-time visibility into operational KPIs.",
      result: "Clearer reporting and easier stakeholder review.",
      technologies: ["React", "MongoDB", "AWS"]
    }
  ];

  const testimonials = [
    {
      name: "Maya Thompson",
      company: "Northstar Labs",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
      review: "The team translated our requirements into a clean product and kept the project moving steadily."
    },
    {
      name: "Arjun Patel",
      company: "BlueRiver Ventures",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      review: "Fast delivery, clear communication, and a result that matched our business goals."
    }
  ];

  const faqs = [
    {
      question: "How long does development take?",
      answer: "Timelines vary by scope, but most projects move through discovery, design, build, and launch in phased milestones."
    },
    {
      question: "What technologies do you use?",
      answer: "We typically build with React, Next.js, Node.js, MongoDB, AWS, and Docker depending on the use case."
    },
    {
      question: "Do you provide maintenance?",
      answer: "Yes. We can continue supporting launches with updates, fixes, and new feature work after deployment."
    },
    {
      question: "What is the project cost?",
      answer: "Pricing depends on scope, complexity, and delivery timeline. Fixed packages and custom quotes are both available."
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await api.get("/services");
      setServices(data.services);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data } = await api.get("/features");
        const featuresWithIcons = data.features.map((feature) => {
          // Map icon string to icon component
          const iconMap = { Sparkles, Layers3, Globe, ShieldCheck, Award, Lock, Cloud, Bot, Zap };
          return {
            title: feature.title,
            icon: iconMap[feature.icon] || Sparkles,
            description: feature.description
          };
        });
        setFeatures(featuresWithIcons.length > 0 ? featuresWithIcons : defaultServiceFeatures);
      } catch (_error) {
        setFeatures(defaultServiceFeatures);
      }
    };

    fetchFeatures();
  }, []);

  useEffect(() => {
    const fetchPricingPackages = async () => {
      try {
        const { data } = await api.get("/pricing-plans");
        setPricingPackages(data.pricingPlans.length > 0 ? data.pricingPlans : defaultPricingPackages);
      } catch (_error) {
        setPricingPackages(defaultPricingPackages);
      }
    };

    fetchPricingPackages();
  }, []);

  const filteredServices = searchTerm
    ? services.filter((service) => {
      const searchableText = [service.title, service.description, service.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    })
    : services;

  return (
    <main className="space-y-16 pt-28 sm:pt-32 lg:pt-40">
      <HeroBanner
        eyebrow="Services"
        title="Our Services"
        description="We build innovative software, web applications, mobile apps, and cloud-based solutions that help businesses grow, automate operations, and deliver exceptional customer experiences."
        background={<ServiceHeroBackground />}
        primaryAction={
          <a href="#contact-form" className="button-primary">
            Get Free Quote
          </a>
        }
        secondaryAction={
          <a href="#contact-form" className="button-outline">
            Schedule Call
          </a>
        }
      />

      <section className="grid gap-4 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-none border-y border-gray-100/15 bg-white px-4 sm:px-6 lg:px-10 py-8 sm:py-10 shadow-sm">
          <SectionHeading title="Service overview" subtitle="Overview" />
          <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
            We build scalable, fast, and secure web applications using modern technologies. Our services are best for startups,
            growing businesses, and teams that need a dependable product partner to move ideas into production.
          </p>
          <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-4 sm:grid-cols-2">
            {[
              "Who needs it: startups, SMBs, and product teams",
              "Business benefits: faster delivery, better UX, lower maintenance",
              "What the service is: full-cycle design and engineering support",
              "Outcomes: stronger conversions, scalable architecture, predictable delivery"
            ].map((item) => (
              <div key={item} className="rounded-lg sm:rounded-2xl bg-mist p-2.5 sm:p-4 text-xs sm:text-sm text-gray-700">
                {item}
              </div>
            ))}"
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-none border-y border-gray-100/15 bg-slate-950/40 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Team working on a service project"
            className="h-full min-h-[250px] sm:min-h-[360px] w-full object-cover"
          />
        </div>
      </section>

      <section>
        <SectionHeading title="Features / what’s included" subtitle="Features" />
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, icon: Icon, description }, index) => (
            <div
              key={title}
              style={{ "--card-delay": `${index * 90}ms` }}
              className="service-feature-card group relative overflow-hidden rounded-xl sm:rounded-[1.6rem] border border-white/10 bg-white/6 p-4 sm:p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(2,8,20,0.4)]"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-brand/12 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-60" />
              </div>
              <div className="relative flex items-start gap-3 sm:gap-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/20 via-white/10 to-transparent text-brand shadow-[0_12px_30px_rgba(2,8,20,0.25)] transition duration-300 group-hover:scale-105 group-hover:border-brand/40 flex-shrink-0">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_0_10px_rgba(110,231,255,0.18)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.28em] text-brand/80">Included feature</p>
                  <h3 className="mt-1 sm:mt-2 font-heading text-base sm:text-lg font-semibold text-ink">{title}</h3>
                </div>
              </div>
              <p className="relative mt-3 sm:mt-4 sm:mt-5 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-500">{description}</p>
              <div className="relative mt-3 sm:mt-4 sm:mt-6 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                <span>Built-in capability</span>
                <span className="rounded-full border border-brand/15 bg-brand/10 px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-brand">Available</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-none border-y border-gray-100/15 bg-mist px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <SectionHeading title="Technologies we use" subtitle="Stack" />
        <div className="tech-carousel overflow-hidden">
          <div className="tech-carousel-track">
            {stackCarousel.map(({ name, icon: Icon, badge, color, glow }, index) => (
              <div
                key={`${name}-${index}`}
                className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/6 p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_18px_40px_rgba(2,8,20,0.35)]"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="pointer-events-none absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
                <div
                  className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/15 bg-slate-950/60 shadow-[0_10px_26px_rgba(2,8,20,0.3)] transition duration-300 group-hover:scale-105 group-hover:border-brand/35"
                  role="img"
                  aria-label={`${name} technology logo`}
                  title={name}
                >
                  {Icon ? <Icon size={34} color={color} aria-hidden="true" /> : <span className="text-sm font-bold uppercase text-brand">{badge}</span>}
                </div>
                <p className="relative mt-4 text-sm font-semibold text-ink">{name}</p>
                <p className="relative mt-2 text-xs uppercase tracking-[0.18em] text-gray-500">Technology</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="Industries we serve" subtitle="Industries" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ name, icon: Icon, color, glow, description, capabilities }, index) => (
            <div
              key={name}
              style={{ "--card-delay": `${index * 90}ms` }}
              className="service-feature-card group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/6 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(2,8,20,0.4)]"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${glow} blur-3xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-100`} />
                <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-60" />
              </div>

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-transparent shadow-[0_12px_30px_rgba(2,8,20,0.25)] transition duration-300 group-hover:scale-110 group-hover:border-brand/40">
                  <Icon className="h-8 w-8" color={color} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold text-ink">{name}</h3>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand/70">Industry focus</p>
                </div>
              </div>

              <p className="relative mt-5 text-sm leading-6 text-gray-500">{description}</p>

              <div className="relative mt-6 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">What we deliver</p>
                <div className="flex flex-wrap gap-2">
                  {capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 transition duration-200 group-hover:border-brand/20 group-hover:bg-brand/10 group-hover:text-brand"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Best fit</span>
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition duration-200 hover:gap-2"
                >
                  Learn more
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-none border-y border-gray-100/15 bg-slate-950/40 px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Development process" subtitle="Workflow" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {processSteps.map(({ title, icon: Icon, color, glow, description, details }, index) => (
            <div
              key={title}
              style={{ "--card-delay": `${index * 90}ms` }}
              className="service-feature-card group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/6 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(2,8,20,0.4)]"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${glow} blur-3xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-100`} />
                <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-60" />
              </div>

              <div className="relative flex items-start justify-between gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-transparent shadow-[0_12px_30px_rgba(2,8,20,0.25)] transition duration-300 group-hover:scale-110 group-hover:border-brand/40">
                  <Icon className="h-7 w-7" color={color} strokeWidth={1.5} />
                </div>
                <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                  Step {index + 1}
                </span>
              </div>

              <h3 className="relative font-heading text-lg font-semibold text-ink">{title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-gray-500">{description}</p>

              <div className="relative mt-5 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Deliverables</p>
                <div className="flex flex-wrap gap-2">
                  {details.map((detail) => (
                    <span
                      key={detail}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 transition duration-200 group-hover:border-brand/20 group-hover:bg-brand/10 group-hover:text-brand"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Why choose us" subtitle="Advantages" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {advantages.map((item) => (
            <div key={item} className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-brand" />
                <h3 className="font-heading text-lg font-semibold text-ink">{item}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">Reliable execution with a clear plan and steady communication.</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Portfolio / case studies" subtitle="Projects" />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-2xl border border-gray-100/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <img src={project.image} alt={project.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-ink">{project.title}</h3>
                <p className="mt-3 text-sm text-gray-600">Project goal</p>
                <p className="text-sm leading-7 text-gray-700">{project.goal}</p>
                <p className="mt-3 text-sm text-gray-600">Results achieved</p>
                <p className="text-sm leading-7 text-gray-700">{project.result}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-gray-100/15 bg-slate-950/5 px-3 py-1 text-xs text-gray-700">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Pricing packages" subtitle="Pricing" />
        <div className="grid gap-6 lg:grid-cols-3">
          {currentPricingPackages.map((plan, index) => {
            const isFeatured = plan.featured ?? index === 1;
            const planBadge = plan.badge || (isFeatured ? "Recommended" : "");
            const planFit = plan.idealFor || (isFeatured ? "Most popular" : index === 0 ? "Fast launch" : "Custom scale");

            return (
              <div
                key={plan.name}
                className={`group relative overflow-hidden rounded-[1.75rem] border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(2,8,20,0.42)] ${isFeatured ? "border-brand/30 bg-slate-950/90" : "border-white/10 bg-white/6"}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/10 via-white/6 to-transparent opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent" />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand/90">{plan.name}</p>
                    <h3 className="mt-3 font-heading text-3xl font-semibold text-ink">{plan.price}</h3>
                  </div>
                  {planBadge ? (
                    <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                      {planBadge}
                    </span>
                  ) : null}
                </div>

                <p className="relative mt-4 text-sm leading-7 text-gray-500">{plan.description || plan.desc}</p>

                <ul className="relative mt-6 space-y-3 text-sm text-gray-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <Lock className="h-4 w-4 shrink-0 text-brand" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Best fit</span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${isFeatured ? "border-brand/20 bg-brand/10 text-brand" : "border-white/10 bg-white/5 text-gray-400"}`}>
                    {planFit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-none border-y border-gray-100/15 bg-mist px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Testimonials" subtitle="Reviews" />
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={testimonial.photo} alt={testimonial.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-600">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="FAQ" subtitle="Questions" />
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-ink">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-none border-y border-gray-100/15 bg-slate-950/40 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">CTA</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-ink sm:text-4xl">Let’s build your next digital product</h2>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              Book a consultation or contact us directly and we’ll help you choose the right scope, timeline, and delivery path.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#contact-form" className="button-primary">
                Contact Us
              </a>
              <a href="#contact-form" className="button-outline">
                Book Free Consultation
              </a>
            </div>
          </div>

          <form id="contact-form" className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-xl font-semibold text-ink">Contact form</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Name" className="rounded-xl border border-gray-200 px-3 py-2" />
              <input type="email" placeholder="Email" className="rounded-xl border border-gray-200 px-3 py-2" />
              <input type="tel" placeholder="Phone" className="rounded-xl border border-gray-200 px-3 py-2" />
              <input type="text" placeholder="Budget" className="rounded-xl border border-gray-200 px-3 py-2" />
            </div>
            <textarea
              rows="4"
              placeholder="Project Requirement"
              className="mt-4 w-full rounded-xl border border-gray-200 px-3 py-2"
            />
            <button type="button" className="button-primary mt-4 w-full">
              Send enquiry
            </button>
          </form>
        </div>
      </section>

      {searchTerm && (
        <p className="text-sm text-gray-500">
          Showing {filteredServices.length} result{filteredServices.length === 1 ? "" : "s"} for "{searchParams.get("q")}".
        </p>
      )}

      <div id="services-grid" className="grid gap-6 md:grid-cols-3">
        {filteredServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {searchTerm && filteredServices.length === 0 && (
        <p className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-600">
          No services matched your search.
        </p>
      )}
    </main>
  );
};

export default Services;
