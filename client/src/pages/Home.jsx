import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Bot, CheckCircle2, ChevronLeft, ChevronRight, Cloud, Clock3, Code2, Globe, Layers3, Lock, Smartphone, Sparkles, Star, Users, Zap } from "lucide-react";
import api from "../api/api.js";
import SectionHeading from "../components/SectionHeading.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import JobCard from "../components/JobCard.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import ShaderBackground from "../components/ui/ShaderBackground.jsx";
import CircularGallery from "../components/ui/circular-gallery.jsx";

import { BiLogoAws } from "react-icons/bi";
import { FaJava, FaLaravel, FaPhp, FaPython } from "react-icons/fa6";
import { SiDocker, SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiSpringboot, SiTailwindcss, SiVuedotjs } from "react-icons/si";
const Home = () => {
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [trustedClients, setTrustedClients] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);

  const defaultWorkflowSteps = [
    {
      step: "01",
      title: "Discovery & audit",
      summary: "We align on goals, risks, constraints, and delivery expectations before any build work starts.",
      duration: "3-5 days",
      highlights: ["Kickoff workshop", "Scope map", "Success metrics"]
    },
    {
      step: "02",
      title: "Planning & architecture",
      summary: "We define the structure, milestones, and technical foundation so delivery stays predictable.",
      duration: "4-7 days",
      highlights: ["Roadmap", "System design", "Sprint plan"]
    },
    {
      step: "03",
      title: "UI/UX design",
      summary: "We shape the interface, interaction flow, and visual system around real user needs.",
      duration: "1-2 weeks",
      highlights: ["Wireframes", "Visual direction", "Prototype review"]
    },
    {
      step: "04",
      title: "Build & review",
      summary: "We ship the product in focused increments with frequent review points and visible progress.",
      duration: "2-6 weeks",
      highlights: ["Feature sprints", "QA checks", "Client review"]
    },
    {
      step: "05",
      title: "Launch & support",
      summary: "We prepare deployment, monitor performance, and stay available for iteration after release.",
      duration: "Ongoing",
      highlights: ["Release plan", "Monitoring", "Post-launch support"]
    }
  ];

  const defaultTrustedClients = [
    {
      name: "Northstar Labs",
      badge: "Verified partner",
      summary: "Long-term collaboration focused on delivery speed, product quality, and reliable execution."
    },
    {
      name: "Peak Partner Co.",
      badge: "Trusted client",
      summary: "Strategic digital delivery with consistent rollout support and product iteration."
    },
    {
      name: "Atlas Startup Studio",
      badge: "Verified partner",
      summary: "Fast-moving product work across design, engineering, and launch support."
    },
    {
      name: "BlueRiver Ventures",
      badge: "Trusted client",
      summary: "Clear execution, high-touch collaboration, and dependable development outcomes."
    }
  ];

  const serviceHighlights = [
    { title: "Web Development", category: "Build", icon: Code2, description: "Fast, responsive websites and platforms built for scale." },
    { title: "Mobile App Development", category: "Build", icon: Smartphone, description: "Native and cross-platform apps with smooth user experiences." },
    { title: "UI/UX Design", category: "Design", icon: Sparkles, description: "Interfaces, prototypes, and design systems that convert." },
    { title: "SaaS Development", category: "Build", icon: Layers3, description: "Subscription products with stable architecture and growth ready flows." },
    { title: "E-commerce Solutions", category: "Build", icon: Globe, description: "Storefronts, checkout flows, and retention-focused commerce." },
    { title: "AI Automation", category: "Automation", icon: Bot, description: "Workflow automation, assistants, and practical AI integrations." },
    { title: "Cloud Services", category: "Cloud", icon: Cloud, description: "Deployment, infrastructure, and reliability for modern products." }
  ];

  const carouselServices = [...serviceHighlights, ...serviceHighlights];

  const serviceCategoryStyles = {
    Build: "border-cyan-400/25 bg-cyan-400/12 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.14)]",
    Design: "border-fuchsia-400/25 bg-fuchsia-400/12 text-fuchsia-200 shadow-[0_0_18px_rgba(232,121,249,0.14)]",
    Automation: "border-amber-400/25 bg-amber-400/12 text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.14)]",
    Cloud: "border-sky-400/25 bg-sky-400/12 text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.14)]"
  };

  const galleryItems = [
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=600",
      text: "Web Development"
    },
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=600",
      text: "Mobile Apps"
    },
    {
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&h=600",
      text: "UI/UX Design"
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600",
      text: "SaaS Solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=600",
      text: "E-commerce"
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=600",
      text: "AI Automation"
    }
  ];

  const advantages = [
    "Experienced Developers",
    "Fast Delivery",
    "Affordable Pricing",
    "24/7 Support",
    "Secure Solutions",
    "Scalable Architecture"
  ];

  const projects = [
    {
      title: "Fintech dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "Node.js", "MongoDB"],
      industry: "Fintech",
      liveLink: "/services"
    },
    {
      title: "Healthcare booking app",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
      technologies: ["Next.js", "AWS", "Tailwind"],
      industry: "Healthcare",
      liveLink: "/contact"
    },
    {
      title: "Retail commerce platform",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      technologies: ["Vue", "Python", "MongoDB"],
      industry: "Retail",
      liveLink: "/services"
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

  const projectTechnologyIcons = {
    React: SiReact,
    "Node.js": SiNodedotjs,
    MongoDB: SiMongodb,
    "Next.js": SiNextdotjs,
    AWS: BiLogoAws,
    Tailwind: SiTailwindcss,
    Vue: SiVuedotjs,
    Python: FaPython
  };

  const testimonials = [
    {
      name: "Sarah Collins",
      company: "Northstar Labs",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
      review: "TRIVIN delivered a clean product roadmap and a reliable build faster than we expected."
    },
    {
      name: "Daniel Ahmed",
      company: "Atlas Startup Studio",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      review: "The team was responsive, practical, and strong on both design and engineering execution."
    },
    {
      name: "Priya Nair",
      company: "BlueRiver Ventures",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
      review: "Their delivery process gave us clarity, and the final product felt polished from day one."
    }
  ];

  const defaultPricingPlans = [
    {
      name: "Starter",
      price: "₹1,500",
      description: "Best for small launches and MVP validation.",
      badge: "Launch",
      idealFor: "Startups",
      featured: false,
      features: ["Landing page", "Basic integrations", "Email support"]
    },
    {
      name: "Professional",
      price: "₹4,500",
      description: "For growing teams that need a full product build.",
      badge: "Popular",
      idealFor: "Growing teams",
      featured: true,
      features: ["Custom web app", "Mobile-ready UI", "Priority support"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Complex systems, multi-team delivery, and scaling support.",
      badge: "Scale",
      idealFor: "Complex builds",
      featured: false,
      features: ["Dedicated team", "Architecture planning", "Ongoing maintenance"]
    }
  ];

  const faqs = [
    {
      question: "Project timeline?",
      answer: "Most projects start within a discovery sprint and ship in phases based on scope and priority."
    },
    {
      question: "Cost estimation?",
      answer: "We estimate after requirement analysis so the budget matches the real scope and delivery plan."
    },
    {
      question: "Support availability?",
      answer: "We provide ongoing support options after launch, including maintenance and updates."
    },
    {
      question: "Technologies used?",
      answer: "We typically build with React, Node.js, MongoDB, Tailwind, and cloud-native tooling."
    }
  ];

  const pricingPlanStyles = [
    "from-cyan-400/18 via-white/6 to-transparent",
    "from-brand/18 via-white/6 to-transparent",
    "from-sky-400/18 via-white/6 to-transparent"
  ];

  const currentPricingPlans = pricingPlans.length > 0 ? pricingPlans : defaultPricingPlans;

  useEffect(() => {
    const fetchData = async () => {
      const [serviceRes, jobRes] = await Promise.all([
        api.get("/services"),
        api.get("/jobs")
      ]);
      setServices(serviceRes.data.services.slice(0, 3));
      setJobs(jobRes.data.jobs.slice(0, 3));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWorkflowSteps = async () => {
      try {
        const { data } = await api.get("/workflow-steps");
        setWorkflowSteps(data.workflowSteps.length > 0 ? data.workflowSteps : defaultWorkflowSteps);
      } catch (_error) {
        setWorkflowSteps(defaultWorkflowSteps);
      }
    };

    fetchWorkflowSteps();
  }, []);

  useEffect(() => {
    const fetchTrustedClients = async () => {
      try {
        const { data } = await api.get("/trusted-clients");
        setTrustedClients(data.trustedClients.length > 0 ? data.trustedClients : defaultTrustedClients);
      } catch (_error) {
        setTrustedClients(defaultTrustedClients);
      }
    };

    fetchTrustedClients();
  }, []);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const { data } = await api.get("/pricing-plans");
        setPricingPlans(data.pricingPlans.length > 0 ? data.pricingPlans : defaultPricingPlans);
      } catch (_error) {
        setPricingPlans(defaultPricingPlans);
      }
    };

    fetchPricingPlans();
  }, []);

  const currentWorkflowSteps = workflowSteps.length > 0 ? workflowSteps : defaultWorkflowSteps;
  const workflowStepCount = currentWorkflowSteps.length;
  const currentTrustedClients = trustedClients.length > 0 ? trustedClients : defaultTrustedClients;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProcessStep((currentStep) => (currentStep + 1) % workflowStepCount);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [workflowStepCount]);

  const goToProcessStep = (direction) => {
    setActiveProcessStep((currentStep) => (currentStep + direction + workflowStepCount) % workflowStepCount);
  };

  const currentProcessStep = currentWorkflowSteps[activeProcessStep] || currentWorkflowSteps[0];
  const processProgress = ((activeProcessStep + 1) / workflowStepCount) * 100;

  return (
    <div className="space-y-12 pt-28 sm:pt-32 lg:pt-40">
      <HeroBanner
        eyebrow="Software company"
        title="Build, scale, and support every digital move with confidence."
        description="TRIVIN combines product strategy, design, and engineering to deliver measurable outcomes. We help teams ship faster with modern tooling and clear delivery milestones."
        background={<ShaderBackground />}
        className="min-h-[78vh] rounded-none py-10 sm:py-12 lg:py-14"
        primaryAction={
          <Link to="/services" className="button-primary">
            Explore services
          </Link>
        }
        secondaryAction={
          <Link to="/jobs" className="button-outline">
            See job openings
          </Link>
        }
      />

      <section className="rounded-none border-y border-gray-100/15 bg-slate-950/40 px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <SectionHeading title="Trusted by teams that move fast" subtitle="Clients" />
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {currentTrustedClients.map((client, index) => (
            <div
              key={client.name}
              className="trusted-client-card group relative overflow-hidden rounded-2xl sm:rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-5 shadow-[0_18px_50px_rgba(2,8,20,0.45)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-brand/30 hover:shadow-[0_24px_70px_rgba(2,8,20,0.6)]"
              style={{ "--card-delay": `${index * 220}ms` }}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="trusted-client-card-inner relative">
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold uppercase tracking-[0.24em] text-brand shadow-[0_10px_30px_rgba(2,8,20,0.35)]">
                      <span className="absolute inset-2 rounded-xl border border-brand/20 bg-gradient-to-br from-brand/15 to-transparent" />
                      <span className="relative flex h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(110,231,255,0.14)]" />
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                        Partner {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 sm:mt-4 font-heading text-lg sm:text-xl font-semibold text-ink">{client.name}</h3>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400">Trusted</p>
                    <p className="mt-1 text-sm font-semibold text-brand">{client.badge || "Client"}</p>
                  </div>
                </div>
                <div className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(110,231,255,0.12)]" />
                  {client.badge || "Verified partner"}
                </div>
                <div className="relative mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent">
                  <span className="absolute left-1/2 top-0 h-px w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/70 to-transparent shadow-[0_0_18px_rgba(110,231,255,0.3)]" />
                </div>
                <p className="relative mt-3 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-400">
                  {client.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Main services" subtitle="Offerings" />
        <div className="offerings-carousel rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-5 shadow-[0_18px_50px_rgba(2,8,20,0.45)] md:px-6 lg:px-7">
          <div className="offerings-carousel-track">
            {carouselServices.map(({ title, category, icon: Icon, description }, index) => (
              <div
                key={`${title}-${index}`}
                className="offerings-feature-card offerings-carousel-item group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-ink transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(2,8,20,0.45)]"
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/20 via-white/10 to-transparent text-brand shadow-[0_12px_30px_rgba(2,8,20,0.28)] transition duration-300 group-hover:scale-105 group-hover:border-brand/40">
                      <span className="absolute inset-1 rounded-[0.95rem] border border-brand/20 bg-slate-950/60" />
                      <span className="absolute inset-[0.4rem] rounded-[0.8rem] bg-gradient-to-br from-brand/15 to-transparent opacity-80" />
                      <Icon className="relative h-6 w-6 drop-shadow-[0_0_12px_rgba(110,231,255,0.22)]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">Service {String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 font-heading text-xl font-semibold text-ink">{title}</h3>
                    </div>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${serviceCategoryStyles[category] ?? "border-brand/15 bg-brand/10 text-brand"}`}>
                    {category}
                  </span>
                </div>

                <p className="relative mt-5 text-sm leading-6 text-gray-400">{description}</p>

                <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent">
                  <span className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-brand/80 to-transparent shadow-[0_0_18px_rgba(110,231,255,0.25)]" />
                </div>

                <div className="relative mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Explore capability</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition duration-300 group-hover:translate-x-1">
                    View details
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="Service showcase" subtitle="Gallery" />
        <div className="relative h-[400px] sm:h-[500px] w-full rounded-2xl border border-gray-100/15 bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.02}
          />
        </div>
      </section>

      <section>
        <SectionHeading title="About the company" subtitle="About" />
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl sm:rounded-2xl border border-gray-100/15 bg-white p-4 sm:p-8 shadow-sm">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brand">Who we are</p>
            <h3 className="mt-2 sm:mt-3 font-heading text-xl sm:text-2xl font-semibold text-ink">
              A product delivery team for modern businesses.
            </h3>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              We combine strategy, design, and engineering to turn ideas into products that are stable, useful, and ready to grow.
            </p>
            <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                { label: "Experience", value: "8+ years across web and mobile delivery" },
                { label: "Team strength", value: "Designers, developers, and cloud engineers" },
                { label: "Mission", value: "Ship reliable products with clear outcomes" },
                { label: "Vision", value: "Be the team clients trust for long-term growth" }
              ].map((item) => (
                <div key={item.label} className="rounded-lg sm:rounded-xl bg-mist p-3 sm:p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand">{item.label}</p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4">
            <div className="rounded-xl sm:rounded-2xl border border-gray-100/15 bg-slate-950/70 p-4 sm:p-6 text-ink shadow-sm">
              <div className="flex items-center gap-3 text-brand">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">Why choose us</span>
              </div>
              <div className="mt-4 sm:mt-5 grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {advantages.map((item) => (
                  <div key={item} className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white/5 px-3 sm:px-4 py-2 sm:py-3">
                    <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-gray-100/15 bg-white p-4 sm:p-6 shadow-sm">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brand">Quick snapshot</p>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-mist p-3 sm:p-4">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-brand flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-ink">Trusted delivery partner</p>
                  <p className="text-xs text-gray-600">Clear process, senior execution, and consistent support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="Featured services" subtitle="Services" />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Open roles" subtitle="Careers" />
        <div className="grid gap-6 md:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Portfolio / projects" subtitle="Work" />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-2xl border border-gray-100/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <img src={project.image} alt={project.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold text-ink">{project.title}</h3>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs text-gray-600">{project.industry}</span>
                </div>
                <p className="mt-4 text-sm text-gray-600">Technologies used</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => {
                    const TechIcon = projectTechnologyIcons[tech];

                    return (
                      <span key={tech} className="inline-flex items-center gap-2 rounded-full border border-gray-100/15 bg-slate-950/5 px-3 py-1 text-xs text-gray-700">
                        {TechIcon ? <TechIcon className="h-3.5 w-3.5 text-brand" aria-hidden="true" /> : null}
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
                <Link to={project.liveLink} className="mt-6 inline-flex text-sm font-semibold text-brand">
                  Live demo link
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-none border-y border-gray-100/15 bg-slate-950/40 px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Technologies we use" subtitle="Stack" />
        <div className="tech-carousel overflow-hidden">
          <div className="tech-carousel-track">
            {stackCarousel.map(({ name, icon: Icon, badge, color, glow }, index) => (
              <div
                key={`${name}-${index}`}
                className="tech-carousel-item group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/6 p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_18px_40px_rgba(2,8,20,0.35)]"
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

      <section className="rounded-none border-y border-gray-100/15 bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Development process" subtitle="Workflow" />
        <div className="mx-auto max-w-5xl">
          <div
            className="workflow-step relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-[0_0_0_1px_rgba(110,231,255,0.08),0_24px_80px_rgba(2,8,20,0.72)] md:p-8 lg:p-10"
            key={currentProcessStep.title}
            aria-live="polite"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent blur-sm" />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/8 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-sky-500/8 blur-3xl" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
              <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand/25 to-transparent lg:block" />
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    Step {currentProcessStep.step}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-100/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
                    <Clock3 className="h-3.5 w-3.5 text-brand" />
                    {currentProcessStep.duration}
                  </span>
                </div>

                <h3 className="mt-5 max-w-xl font-heading text-3xl font-semibold text-ink sm:text-4xl">
                  {currentProcessStep.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                  {currentProcessStep.summary}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {currentProcessStep.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-gray-100/15 bg-white px-4 py-3 shadow-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-gray-100/15 bg-slate-950 p-5 text-ink shadow-[0_18px_50px_rgba(2,8,20,0.45)] sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand/90">Workflow snapshot</p>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">Delivery timeline</span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                        {activeProcessStep + 1}/{workflowStepCount}
                      </span>
                    </div>
                    <div className="relative mt-4 h-2 rounded-full bg-white/10">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand via-sky-300 to-cyan-200 transition-all duration-500 ease-out"
                        style={{ width: `${processProgress}%` }}
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {currentWorkflowSteps.map((step, index) => {
                        const isActive = index === activeProcessStep;

                        return (
                          <button
                            key={step.title}
                            type="button"
                            onClick={() => setActiveProcessStep(index)}
                            className="group flex flex-col items-center gap-2 text-center"
                          >
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${isActive ? "border-brand/80 bg-brand text-slate-950 shadow-[0_0_0_8px_rgba(110,231,255,0.16),0_0_24px_rgba(110,231,255,0.28)] scale-105" : "border-white/10 bg-white/5 text-gray-400 group-hover:border-brand/30 group-hover:text-ink"}`}
                            >
                              {step.step}
                            </span>
                            <span className={`h-px w-full transition-colors duration-300 ${index < activeProcessStep ? "bg-brand/70" : "bg-white/10"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {currentWorkflowSteps.map((step, index) => (
                      <button
                        key={step.title}
                        type="button"
                        onClick={() => setActiveProcessStep(index)}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${index === activeProcessStep ? "border-brand/40 bg-slate-950/75 shadow-sm" : "border-white/10 bg-slate-950/35 hover:border-white/20 hover:bg-slate-950/55"}`}
                      >
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold ${index === activeProcessStep ? "bg-brand text-slate-950" : "bg-white/8 text-brand"}`}>
                          {step.step}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink">{step.title}</span>
                          <span className="block text-xs text-gray-400">{step.duration}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/65 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Current stage</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Auto + manual</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {currentWorkflowSteps.map((step, index) => (
                      <span
                        key={step.title}
                        className={`h-2 rounded-full transition-all duration-300 ${index === activeProcessStep ? "w-10 bg-brand" : "w-2.5 bg-white/25"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => goToProcessStep(-1)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => goToProcessStep(1)}
                    className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-brand/90"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section>
        <SectionHeading title="Pricing plans" subtitle="Packages" />
        <div className="grid gap-6 lg:grid-cols-3">
          {currentPricingPlans.map((plan, index) => {
            const isFeatured = plan.featured ?? index === 1;
            const cardTone = pricingPlanStyles[index % pricingPlanStyles.length];
            const planBadge = plan.badge || (isFeatured ? "Popular" : "");
            const planFit = plan.idealFor || (isFeatured ? "Growing teams" : index === 0 ? "Launches" : "Complex builds");

            return (
              <div
                key={plan.name}
                className={`group relative overflow-hidden rounded-[1.75rem] border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(2,8,20,0.42)] ${isFeatured ? "border-brand/30 bg-slate-950/90" : "border-white/10 bg-white/6"}`}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cardTone} opacity-100`} />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent" />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand/90">{plan.name}</p>
                    <div className="mt-3 flex items-end gap-2">
                      <h3 className="font-heading text-3xl font-semibold text-ink">{plan.price}</h3>
                      <span className="pb-1 text-sm text-gray-500">/ project</span>
                    </div>
                  </div>
                  {planBadge ? (
                    <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                      {planBadge}
                    </span>
                  ) : null}
                </div>

                <p className="relative mt-4 max-w-md text-sm leading-7 text-gray-500">{plan.description}</p>

                <ul className="relative mt-6 space-y-3 text-sm text-gray-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <Lock className="h-4 w-4 shrink-0 text-brand" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Ideal for</span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${isFeatured ? "border-brand/20 bg-brand/10 text-brand" : "border-white/10 bg-white/5 text-gray-400"}`}>
                    {planFit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-none border-y border-gray-100/15 bg-slate-950/40 px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Frequently asked questions" subtitle="FAQ" />
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-ink">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
