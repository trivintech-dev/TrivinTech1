import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  DollarSign,
  FileText,
  GraduationCap,
  Heart,
  HeartHandshake,
  Laptop,
  LayoutGrid,
  Linkedin,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap
} from "lucide-react";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import JobCard from "../components/JobCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CareersHeroBackground from "../components/ui/CareersHeroBackground.jsx";

// Add animation classes to index.css if not already present
// .service-feature-card animation support

const benefits = [
  {
    title: "Flexible Work Hours",
    icon: Clock3,
    color: "#06b6d4",
    glow: "from-cyan-400/20 to-cyan-400/5",
    description: "Work on your schedule. We trust our team to manage their time effectively."
  },
  {
    title: "Remote Opportunities",
    icon: Laptop,
    color: "#3b82f6",
    glow: "from-blue-400/20 to-blue-400/5",
    description: "Work from anywhere. Collaborate seamlessly across distributed teams."
  },
  {
    title: "Competitive Salary",
    icon: DollarSign,
    color: "#10b981",
    glow: "from-emerald-400/20 to-emerald-400/5",
    description: "Market-competitive compensation with performance-based incentives."
  },
  {
    title: "Paid Leave",
    icon: CalendarDays,
    color: "#f59e0b",
    glow: "from-amber-400/20 to-amber-400/5",
    description: "Generous paid time off plus flexible holidays and wellness breaks."
  },
  {
    title: "Learning Budget",
    icon: BookOpen,
    color: "#8b5cf6",
    glow: "from-violet-400/20 to-violet-400/5",
    description: "Annual learning stipend for courses, certifications, and conferences."
  },
  {
    title: "Health Insurance",
    icon: Heart,
    color: "#ec4899",
    glow: "from-pink-400/20 to-pink-400/5",
    description: "Comprehensive health, dental, and wellness coverage for you and family."
  },
  {
    title: "Team Culture",
    icon: Users,
    color: "#f97316",
    glow: "from-orange-400/20 to-orange-400/5",
    description: "Regular team events, outings, and celebrations throughout the year."
  },
  {
    title: "Performance Bonuses",
    icon: Sparkles,
    color: "#a855f7",
    glow: "from-purple-400/20 to-purple-400/5",
    description: "Quarterly and annual bonuses tied to performance and company growth."
  }
];

const departments = [
  {
    title: "Development",
    icon: LayoutGrid,
    description: "Build scalable solutions with modern tech stacks",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-400/30",
    iconColor: "text-blue-500",
    hoverColor: "hover:border-blue-400/50 hover:shadow-blue-500/20"
  },
  {
    title: "UI/UX Design",
    icon: Sparkles,
    description: "Create intuitive and beautiful user experiences",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-400/30",
    iconColor: "text-purple-500",
    hoverColor: "hover:border-purple-400/50 hover:shadow-purple-500/20"
  },
  {
    title: "Marketing",
    icon: Compass,
    description: "Drive growth and build brand awareness",
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-400/30",
    iconColor: "text-orange-500",
    hoverColor: "hover:border-orange-400/50 hover:shadow-orange-500/20"
  },
  {
    title: "Sales",
    icon: BriefcaseBusiness,
    description: "Close deals and expand business opportunities",
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-400/30",
    iconColor: "text-green-500",
    hoverColor: "hover:border-green-400/50 hover:shadow-green-500/20"
  },
  {
    title: "HR",
    icon: HeartHandshake,
    description: "Build and nurture a world-class team",
    color: "from-pink-500/20 to-pink-600/20",
    borderColor: "border-pink-400/30",
    iconColor: "text-pink-500",
    hoverColor: "hover:border-pink-400/50 hover:shadow-pink-500/20"
  },
  {
    title: "DevOps",
    icon: ShieldCheck,
    description: "Ensure secure and reliable infrastructure",
    color: "from-cyan-500/20 to-cyan-600/20",
    borderColor: "border-cyan-400/30",
    iconColor: "text-cyan-500",
    hoverColor: "hover:border-cyan-400/50 hover:shadow-cyan-500/20"
  },
  {
    title: "Customer Support",
    icon: Users,
    description: "Deliver exceptional customer experiences",
    color: "from-amber-500/20 to-amber-600/20",
    borderColor: "border-amber-400/30",
    iconColor: "text-amber-500",
    hoverColor: "hover:border-amber-400/50 hover:shadow-amber-500/20"
  }
];

const processSteps = [
  {
    title: "Application Review",
    description: "Submit your resume and application",
    details: "Our HR team reviews your credentials",
    duration: "2-3 days",
    icon: FileText,
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-400/30",
    iconColor: "text-blue-500",
    hoverColor: "hover:border-blue-400/50 hover:shadow-blue-500/20"
  },
  {
    title: "HR Interview",
    description: "Initial conversation with HR",
    details: "Discuss your background and expectations",
    duration: "1 week",
    icon: MessageSquare,
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-400/30",
    iconColor: "text-purple-500",
    hoverColor: "hover:border-purple-400/50 hover:shadow-purple-500/20"
  },
  {
    title: "Technical Round",
    description: "Assess your technical skills",
    details: "Complete a technical assessment or interview",
    duration: "1 week",
    icon: Laptop,
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-400/30",
    iconColor: "text-green-500",
    hoverColor: "hover:border-green-400/50 hover:shadow-green-500/20"
  },
  {
    title: "Final Discussion",
    description: "Meet with the hiring manager",
    details: "Final round to align on role and culture",
    duration: "3-5 days",
    icon: Users,
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-400/30",
    iconColor: "text-orange-500",
    hoverColor: "hover:border-orange-400/50 hover:shadow-orange-500/20"
  },
  {
    title: "Offer Letter",
    description: "Receive your offer",
    details: "Join our amazing team!",
    duration: "1-2 days",
    icon: Award,
    color: "from-amber-500/20 to-amber-600/20",
    borderColor: "border-amber-400/30",
    iconColor: "text-amber-500",
    hoverColor: "hover:border-amber-400/50 hover:shadow-amber-500/20"
  }
];

const testimonials = [
  {
    name: "Aarav Sen",
    role: "Frontend Engineer",
    experience: "2 years at TRIVIN",
    department: "Development",
    quote: "The team gives real ownership and encourages learning every week.",
    avatar: "AS",
    rating: 5,
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-400/30",
    hoverColor: "hover:border-blue-400/50 hover:shadow-blue-500/20",
    avatarBg: "bg-blue-500/20",
    avatarText: "text-blue-600"
  },
  {
    name: "Meera Das",
    role: "Product Designer",
    experience: "1.5 years at TRIVIN",
    department: "UI/UX Design",
    quote: "We move fast without losing quality. It feels creative and collaborative.",
    avatar: "MD",
    rating: 5,
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-400/30",
    hoverColor: "hover:border-purple-400/50 hover:shadow-purple-500/20",
    avatarBg: "bg-purple-500/20",
    avatarText: "text-purple-600"
  },
  {
    name: "Rohan Malik",
    role: "DevOps Specialist",
    experience: "3 years at TRIVIN",
    department: "DevOps",
    quote: "The stack is modern, the feedback loop is strong, and the culture is supportive.",
    avatar: "RM",
    rating: 5,
    color: "from-cyan-500/20 to-cyan-600/20",
    borderColor: "border-cyan-400/30",
    hoverColor: "hover:border-cyan-400/50 hover:shadow-cyan-500/20",
    avatarBg: "bg-cyan-500/20",
    avatarText: "text-cyan-600"
  }
];

const lifeAtCompany = [
  { title: "Team Events", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" },
  { title: "Office Setup", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80" },
  { title: "Work Environment", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80" },
  { title: "Celebrations", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80" },
  { title: "Hackathons", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" }
];

const internships = [
  { role: "Frontend Intern", duration: "3 months", eligibility: "Students or freshers", stipend: "Paid" },
  { role: "UI/UX Intern", duration: "3 months", eligibility: "Design learners", stipend: "Paid" },
  { role: "Marketing Intern", duration: "6 months", eligibility: "Fresh graduates", stipend: "Paid" }
];

const faqs = [
  { question: "Do you offer remote jobs?", answer: "Yes, some roles are remote or hybrid depending on the team and project needs." },
  { question: "What technologies do you use?", answer: "We work with modern web stacks, cloud tools, APIs, and automation-friendly workflows." },
  { question: "How long is the hiring process?", answer: "Most candidates complete the process within 1 to 2 weeks." },
  { question: "Can freshers apply?", answer: "Yes, we regularly consider freshers and internship applicants." }
];

const Jobs = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [status, setStatus] = useState(null);
  const [application, setApplication] = useState({
    fullName: "",
    email: "",
    phone: "",
    positionId: "",
    resumeUrl: "",
    portfolioUrl: "",
    coverLetter: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await api.get("/jobs");
      setJobs(data.jobs);
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!application.positionId && jobs.length > 0) {
      setApplication((prev) => ({ ...prev, positionId: jobs[0]._id }));
    }
  }, [jobs, application.positionId]);

  const jobTypes = useMemo(() => ["All", ...new Set(jobs.map((job) => job.type).filter(Boolean))], [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchableText = [job.title, job.location, job.type, job.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = searchQuery ? searchableText.includes(searchQuery.toLowerCase()) : true;
      const matchesType = selectedType === "All" ? true : (job.type || "").toLowerCase() === selectedType.toLowerCase();
      return matchesSearch && matchesType;
    });
  }, [jobs, searchQuery, selectedType]);

  const validateApplication = (values) => {
    const nextErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!values.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "Enter a valid email address";
    if (!values.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!values.positionId) nextErrors.positionId = "Select a position";
    if (!values.resumeUrl.trim()) nextErrors.resumeUrl = "Resume URL is required";
    if (!values.coverLetter.trim()) nextErrors.coverLetter = "Cover letter is required";
    else if (values.coverLetter.trim().length < 80) nextErrors.coverLetter = "Cover letter should be at least 80 characters";
    return nextErrors;
  };

  const updateApplication = (field) => (event) => {
    const nextValue = event.target.value;
    setApplication((prev) => ({ ...prev, [field]: nextValue }));
  };

  const submitApplication = async (event) => {
    event.preventDefault();
    setStatus(null);

    if (!token) {
      setStatus({ type: "error", text: "Login to submit your application." });
      return;
    }

    const nextErrors = validateApplication(application);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setIsSubmitting(true);
    try {
      const job = jobs.find((item) => item._id === application.positionId);
      const coverLetter = [
        `Name: ${application.fullName}`,
        `Email: ${application.email}`,
        `Phone: ${application.phone}`,
        `Portfolio: ${application.portfolioUrl || "N/A"}`,
        "",
        application.coverLetter
      ].join("\n");

      await api.post(`/jobs/${application.positionId}/apply`, {
        coverLetter,
        resumeUrl: application.resumeUrl
      });

      setStatus({ type: "success", text: `Application submitted for ${job?.title || "the selected role"}.` });
      setApplication({
        fullName: "",
        email: "",
        phone: "",
        positionId: jobs[0]?._id || "",
        resumeUrl: "",
        portfolioUrl: "",
        coverLetter: ""
      });
      setErrors({});
    } catch (error) {
      setStatus({ type: "error", text: error?.response?.data?.message || "Application failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pt-20 sm:pt-24 lg:pt-32">
      <HeroBanner
        eyebrow="Careers"
        title="Build the future with TRIVIN TECHNOLOY."
        description="Join a team that values collaboration, learning, and product impact. Explore the roles, culture, and opportunities below."
        primaryAction={<a href="#open-positions" className="button-primary">View Open Positions</a>}
        secondaryAction={<a href="#application-form" className="button-outline">Apply Now</a>}
        background={<CareersHeroBackground />}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading title="About working here" subtitle="Culture" />
          <div className="space-y-4 text-sm leading-7 text-gray-600">
            <p>We believe in collaboration, creativity, and continuous learning.</p>
            <p>Our mission is to build dependable digital experiences and our vision is to grow with teams that care about quality and ownership.</p>
            <p>Every day is a chance to solve real problems, work with smart teammates, and innovate with purpose.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Mission & Vision", icon: Compass },
            { title: "Team Environment", icon: Users },
            { title: "Growth Opportunities", icon: GraduationCap },
            { title: "Innovation Mindset", icon: Zap }
          ].map(({ title, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-gray-100/15 bg-white p-5 shadow-sm">
              <Icon className="h-5 w-5 text-brand" />
              <h3 className="mt-3 font-heading text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">Built for people who want to learn, ship, and grow with the team.</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Company benefits and perks" subtitle="Perks" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, icon: Icon, color, glow, description }, index) => (
            <div
              key={title}
              style={{ "--card-delay": `${index * 90}ms` }}
              className="service-feature-card group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/6 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(2,8,20,0.4)]"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${glow} blur-3xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-100`} />
                <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-60" />
              </div>

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 via-white/10 to-transparent shadow-[0_12px_30px_rgba(2,8,20,0.25)] transition duration-300 group-hover:scale-110 group-hover:border-brand/40">
                <Icon className="h-7 w-7" color={color} strokeWidth={1.5} />
              </div>

              <h3 className="relative mt-4 font-heading text-lg font-semibold text-ink">{title}</h3>
              <p className="relative mt-2 text-sm leading-6 text-gray-500">{description}</p>

              <div className="relative mt-5 flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Benefit</span>
                <CheckCircle2 className="h-5 w-5 text-brand/60 transition duration-200 group-hover:text-brand" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="open-positions">
        <SectionHeading title="Open positions" subtitle="Hiring now" />
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-gray-100/15 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search jobs"
              className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedType === type ? "bg-brand text-white" : "bg-mist text-ink"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
        {filteredJobs.length === 0 && <p className="mt-6 rounded-2xl border border-gray-100/15 bg-white p-6 text-sm text-gray-600">No roles match your search.</p>}
      </section>

      <section>
        <SectionHeading title="Departments" subtitle="Hiring categories" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {departments.map(({ title, icon: Icon, description, color, borderColor, iconColor, hoverColor }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-2xl border ${borderColor} bg-gradient-to-br ${color} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${hoverColor}`}
            >
              {/* Animated background gradient */}
              <div className="pointer-events-none absolute inset-0">
                <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition duration-300 group-hover:opacity-60 ${color.replace('from-', 'bg-').split(' to-')[0]}`} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm p-3 transition duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="mt-4 font-heading text-base font-semibold text-ink transition duration-300 group-hover:text-opacity-100">
                  {title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-5 text-gray-600 transition duration-300 group-hover:text-gray-700">
                  {description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 transition duration-300 group-hover:text-gray-700">
                    Explore
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400 transition duration-300 group-hover:translate-x-1 group-hover:text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Recruitment process" subtitle="Hiring steps" />
        <div className="relative">
          {/* Timeline connectors */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 rounded-full hidden lg:block opacity-30" />
          
          <div className="grid gap-6 lg:gap-4 md:grid-cols-2 lg:grid-cols-5 relative z-10">
            {processSteps.map(({ title, description, details, duration, icon: Icon, color, borderColor, iconColor, hoverColor }, index) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-2xl border ${borderColor} bg-gradient-to-br ${color} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${hoverColor}`}
              >
                {/* Step indicator badge */}
                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-ink transition duration-300 group-hover:bg-white/30">
                  {index + 1}
                </div>

                {/* Animated background gradient */}
                <div className="pointer-events-none absolute inset-0">
                  <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition duration-300 group-hover:opacity-60 ${color.replace('from-', 'bg-').split(' to-')[0]}`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm p-3 transition duration-300 group-hover:scale-110 group-hover:bg-white/20">
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-heading text-base font-semibold text-ink transition duration-300">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-xs leading-4 text-gray-600 transition duration-300 group-hover:text-gray-700">
                    {description}
                  </p>

                  {/* Details */}
                  <p className="mt-3 text-sm leading-5 text-gray-600 transition duration-300 group-hover:text-gray-700">
                    {details}
                  </p>

                  {/* Duration badge */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600 transition duration-300 group-hover:bg-white/20 group-hover:text-gray-700">
                      <Clock3 className="h-3 w-3" />
                      {duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="Employee testimonials" subtitle="Team feedback" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className={`group relative overflow-hidden rounded-2xl border ${testimonial.borderColor} bg-gradient-to-br ${testimonial.color} p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${testimonial.hoverColor}`}
            >
              {/* Animated background gradient */}
              <div className="pointer-events-none absolute inset-0">
                <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition duration-300 group-hover:opacity-60 ${testimonial.color.replace('from-', 'bg-').split(' to-')[0]}`} />
              </div>

              {/* Star rating */}
              <div className="relative z-10 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="relative z-10 mt-4 text-sm leading-6 text-gray-700 italic">
                "{testimonial.quote}"
              </p>

              {/* Divider */}
              <div className="relative z-10 my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* User info */}
              <div className="relative z-10">
                {/* Avatar */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${testimonial.avatarBg} text-xs font-bold ${testimonial.avatarText}`}>
                    {testimonial.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-sm font-semibold text-ink truncate">{testimonial.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{testimonial.role}</p>
                  </div>
                </div>

                {/* Department and experience */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600 transition duration-300 group-hover:bg-white/20">
                    {testimonial.department}
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-gray-500">{testimonial.experience}</p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Life at the company" subtitle="Culture gallery" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {lifeAtCompany.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-2xl border border-gray-100/15 bg-white shadow-sm">
              <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
              <p className="p-4 text-sm font-semibold text-ink">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Internship opportunities" subtitle="Early careers" />
        <div className="grid gap-4 lg:grid-cols-3">
          {internships.map((internship) => (
            <div key={internship.role} className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-ink">{internship.role}</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Eligibility:</strong> {internship.eligibility}</p>
                <p><strong>Stipend:</strong> {internship.stipend}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="FAQ" subtitle="Questions" />
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-gray-100/15 bg-white p-5 shadow-sm">
              <h3 className="font-heading text-base font-semibold text-ink">{faq.question}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="application-form" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={submitApplication} className="rounded-2xl border border-gray-100/15 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading title="Resume submission form" subtitle="Apply now" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={application.fullName} onChange={updateApplication("fullName")} placeholder="Full Name" className={`rounded-xl border px-3 py-2 ${errors.fullName ? "border-red-400" : "border-gray-200"}`} />
            <input value={application.email} onChange={updateApplication("email")} type="email" placeholder="Email" className={`rounded-xl border px-3 py-2 ${errors.email ? "border-red-400" : "border-gray-200"}`} />
            <input value={application.phone} onChange={updateApplication("phone")} placeholder="Phone" className={`rounded-xl border px-3 py-2 ${errors.phone ? "border-red-400" : "border-gray-200"}`} />
            <select value={application.positionId} onChange={updateApplication("positionId")} className={`rounded-xl border px-3 py-2 ${errors.positionId ? "border-red-400" : "border-gray-200"}`}>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>{job.title}</option>
              ))}
            </select>
          </div>
          <input value={application.resumeUrl} onChange={updateApplication("resumeUrl")} placeholder="Resume URL (Drive, Dropbox, or PDF link)" className={`mt-4 w-full rounded-xl border px-3 py-2 ${errors.resumeUrl ? "border-red-400" : "border-gray-200"}`} />
          <input value={application.portfolioUrl} onChange={updateApplication("portfolioUrl")} placeholder="Portfolio / GitHub Link" className="mt-4 w-full rounded-xl border border-gray-200 px-3 py-2" />
          <textarea value={application.coverLetter} onChange={updateApplication("coverLetter")} rows={6} placeholder="Cover Letter" className={`mt-4 w-full rounded-xl border px-3 py-2 ${errors.coverLetter ? "border-red-400" : "border-gray-200"}`} />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="submit" disabled={isSubmitting} className="button-primary disabled:opacity-60">{isSubmitting ? "Submitting..." : "Apply Today"}</button>
            <Link to="/login" className="button-outline">Join Our Team</Link>
          </div>
          {status && <p className={`mt-4 text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>{status.text}</p>}
          {!token && <p className="mt-3 text-sm text-gray-600">Login to submit your application.</p>}
        </form>

        <aside className="space-y-4 rounded-2xl border border-gray-100/15 bg-slate-950/40 p-6 shadow-sm sm:p-8">
          <SectionHeading title="Why join TRIVIN" subtitle="Highlights" />
          <div className="space-y-3 text-sm leading-7 text-gray-600">
            <p>Grow with a team that supports learning, ownership, and experimentation.</p>
            <p>Work on meaningful products with modern tools and collaborative delivery.</p>
            <p>We value fresh ideas, clear communication, and measurable impact.</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 text-brand"><Linkedin className="h-5 w-5" /><span className="font-semibold text-ink">LinkedIn apply option</span></div>
            <p className="mt-2 text-sm text-gray-600">Share your profile with the team when you submit your resume URL.</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 text-brand"><CheckCircle2 className="h-5 w-5" /><span className="font-semibold text-ink">Real-time tracking</span></div>
            <p className="mt-2 text-sm text-gray-600">Applied candidates can use their profile to review application history in the app.</p>
          </div>
        </aside>
      </section>

      <section className="rounded-2xl border border-gray-100/15 bg-slate-950/40 p-6 shadow-sm sm:p-8">
        <SectionHeading title="Ready to grow your career?" subtitle="Final CTA" />
        <div className="flex flex-wrap gap-4">
          <a href="#application-form" className="button-primary">Join Our Team</a>
          <a href="#open-positions" className="button-outline">Apply Today</a>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
