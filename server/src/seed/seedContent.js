import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import SiteSetting from "../models/SiteSetting.js";
import PageContent from "../models/PageContent.js";

dotenv.config();

const defaultSettings = {
  key: "global",
  brand: {
    name: "TRIVIN",
    tagline: "Product strategy, engineering, and continuous care for growing teams.",
    logoUrl: ""
  },
  contact: {
    phone: "+91 8979510012",
    email: "trivintech@gmail.com",
    investorEmail: "investor@trivin.example",
    address: "",
    workingHours: "Mon - Fri, 9:00 AM - 6:00 PM",
    mapEmbedUrl: "https://www.google.com/maps?q=Kolkata,India&output=embed"
  },
  socials: [
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com" },
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/trivin.ai?igsh=OGxjdnd1b3BqOTdh" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/trivintechnologies/" },
    { platform: "youtube", label: "YouTube", href: "https://www.youtube.com" }
  ],
  nav: [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Careers", to: "/jobs" },
    { label: "Contact Us", to: "/contact" },
    { label: "About Us", to: "/about" },
    { label: "Investor", to: "/investors" }
  ],
  footer: {
    tagline: "Product strategy, engineering, and continuous care for growing teams.",
    columns: [
      { title: "Services", items: ["Product discovery", "Design & engineering", "Cloud & devops"] },
      { title: "Company", items: ["About us", "Careers", "Blog"] }
    ],
    legalText: "Privacy · Terms"
  }
};

/** @type {Array<{ page: string; section: string; label: string; kind: "single" | "list"; order: number; content?: object; items?: unknown[] }>} */
const pageContentSections = [
  // —— home ——
  {
    page: "home",
    section: "hero",
    label: "Hero",
    kind: "single",
    order: 1,
    content: {
      eyebrow: "Software company",
      title: "Build, scale, and support every digital move with confidence.",
      description:
        "TRIVIN combines product strategy, design, and engineering to deliver measurable outcomes. We help teams ship faster with modern tooling and clear delivery milestones.",
      primaryActionLabel: "Explore services",
      primaryActionHref: "/services",
      secondaryActionLabel: "See job openings",
      secondaryActionHref: "/jobs"
    }
  },
  {
    page: "home",
    section: "serviceHighlights",
    label: "Service highlights",
    kind: "list",
    order: 2,
    items: [
      {
        title: "Web Development",
        category: "Build",
        icon: "Code2",
        description: "Fast, responsive websites and platforms built for scale."
      },
      {
        title: "Mobile App Development",
        category: "Build",
        icon: "Smartphone",
        description: "Native and cross-platform apps with smooth user experiences."
      },
      {
        title: "UI/UX Design",
        category: "Design",
        icon: "Sparkles",
        description: "Interfaces, prototypes, and design systems that convert."
      },
      {
        title: "SaaS Development",
        category: "Build",
        icon: "Layers3",
        description: "Subscription products with stable architecture and growth ready flows."
      },
      {
        title: "E-commerce Solutions",
        category: "Build",
        icon: "Globe",
        description: "Storefronts, checkout flows, and retention-focused commerce."
      },
      {
        title: "AI Automation",
        category: "Automation",
        icon: "Bot",
        description: "Workflow automation, assistants, and practical AI integrations."
      },
      {
        title: "Cloud Services",
        category: "Cloud",
        icon: "Cloud",
        description: "Deployment, infrastructure, and reliability for modern products."
      }
    ]
  },
  {
    page: "home",
    section: "gallery",
    label: "Gallery",
    kind: "list",
    order: 3,
    items: [
      {
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=600",
        text: "Web Development"
      },
      {
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=600",
        text: "Mobile Apps"
      },
      {
        image:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&h=600",
        text: "UI/UX Design"
      },
      {
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600",
        text: "SaaS Solutions"
      },
      {
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=600",
        text: "E-commerce"
      },
      {
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=600",
        text: "AI Automation"
      }
    ]
  },
  {
    page: "home",
    section: "about",
    label: "About block",
    kind: "single",
    order: 4,
    content: {
      sectionSubtitle: "About",
      sectionTitle: "About the company",
      kicker: "Who we are",
      headline: "A product delivery team for modern businesses.",
      body: "We combine strategy, design, and engineering to turn ideas into products that are stable, useful, and ready to grow."
    }
  },
  {
    page: "home",
    section: "aboutStats",
    label: "About stats",
    kind: "list",
    order: 5,
    items: [
      { label: "Experience", value: "8+ years across web and mobile delivery" },
      { label: "Team strength", value: "Designers, developers, and cloud engineers" },
      { label: "Mission", value: "Ship reliable products with clear outcomes" },
      { label: "Vision", value: "Be the team clients trust for long-term growth" }
    ]
  },
  {
    page: "home",
    section: "advantages",
    label: "Advantages",
    kind: "list",
    order: 6,
    items: [
      { text: "Experienced Developers" },
      { text: "Fast Delivery" },
      { text: "Affordable Pricing" },
      { text: "24/7 Support" },
      { text: "Secure Solutions" },
      { text: "Scalable Architecture" }
    ]
  },
  {
    page: "home",
    section: "projects",
    label: "Projects",
    kind: "list",
    order: 7,
    items: [
      {
        title: "Fintech dashboard",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        technologies: ["React", "Node.js", "MongoDB"],
        industry: "Fintech",
        liveLink: "/services"
      },
      {
        title: "Healthcare booking app",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
        technologies: ["Next.js", "AWS", "Tailwind"],
        industry: "Healthcare",
        liveLink: "/contact"
      },
      {
        title: "Retail commerce platform",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        technologies: ["Vue", "Python", "MongoDB"],
        industry: "Retail",
        liveLink: "/services"
      }
    ]
  },
  {
    page: "home",
    section: "techStack",
    label: "Tech stack",
    kind: "list",
    order: 8,
    items: [
      { name: "React", icon: "SiReact", color: "#61dafb", glow: "from-cyan-400/20 to-cyan-400/5" },
      { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff", glow: "from-gray-200/15 to-gray-200/5" },
      { name: "Node.js", icon: "SiNodedotjs", color: "#68a063", glow: "from-emerald-400/20 to-emerald-400/5" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47a248", glow: "from-green-400/20 to-green-400/5" },
      { name: "AWS", icon: "BiLogoAws", color: "#ff9900", glow: "from-amber-400/20 to-amber-400/5" },
      { name: "Docker", icon: "SiDocker", color: "#2496ed", glow: "from-sky-400/20 to-sky-400/5" },
      { name: "Java", icon: "FaJava", color: "#f89820", glow: "from-orange-400/20 to-orange-400/5" },
      { name: "Python", icon: "FaPython", color: "#3776ab", glow: "from-blue-400/20 to-blue-400/5" },
      { name: "MERN Stack", badge: "MERN", color: "#6ee7ff", glow: "from-cyan-400/20 to-cyan-400/5" },
      { name: "MEAN Stack", badge: "MEAN", color: "#22c55e", glow: "from-emerald-400/20 to-emerald-400/5" },
      { name: "PHP", icon: "FaPhp", color: "#777bb4", glow: "from-violet-400/20 to-violet-400/5" },
      { name: "Laravel", icon: "FaLaravel", color: "#ff2d20", glow: "from-red-400/20 to-red-400/5" },
      { name: "Spring Boot", icon: "SiSpringboot", color: "#6db33f", glow: "from-lime-400/20 to-lime-400/5" }
    ]
  },
  {
    page: "home",
    section: "faqs",
    label: "FAQs",
    kind: "list",
    order: 9,
    items: [
      {
        question: "Project timeline?",
        answer:
          "Most projects start within a discovery sprint and ship in phases based on scope and priority."
      },
      {
        question: "Cost estimation?",
        answer:
          "We estimate after requirement analysis so the budget matches the real scope and delivery plan."
      },
      {
        question: "Support availability?",
        answer: "We provide ongoing support options after launch, including maintenance and updates."
      },
      {
        question: "Technologies used?",
        answer: "We typically build with React, Node.js, MongoDB, Tailwind, and cloud-native tooling."
      }
    ]
  },
  {
    page: "home",
    section: "sectionHeadings",
    label: "Section headings",
    kind: "single",
    order: 10,
    content: {
      featuredServices: { title: "Featured services", subtitle: "Services" },
      openRoles: { title: "Open roles", subtitle: "Careers" },
      portfolio: { title: "Portfolio / projects", subtitle: "Work" },
      tech: { title: "Technologies we use", subtitle: "Stack" },
      workflow: { title: "Development process", subtitle: "Workflow" },
      pricing: { title: "Pricing plans", subtitle: "Packages" },
      faq: { title: "Frequently asked questions", subtitle: "FAQ" },
      mainServices: { title: "Main services", subtitle: "Offerings" },
      gallery: { title: "Service showcase", subtitle: "Gallery" },
      about: { title: "About the company", subtitle: "About" }
    }
  },

  // —— about ——
  {
    page: "about",
    section: "hero",
    label: "Hero",
    kind: "single",
    order: 1,
    content: {
      eyebrow: "About us",
      title:
        "TRIVIN is a product and technology company built around execution, clarity, and long-term partnerships.",
      description:
        "We design, build, and support digital products with a delivery model that keeps strategy, engineering, and care tightly connected.",
      primaryActionLabel: "Our story",
      primaryActionHref: "#company-story",
      secondaryActionLabel: "Work with us",
      secondaryActionHref: "/contact"
    }
  },
  {
    page: "about",
    section: "story",
    label: "Company story",
    kind: "single",
    order: 2,
    content: {
      sectionSubtitle: "Who we are",
      sectionTitle: "Company story",
      body: "Founded to help teams ship with confidence, TRIVIN blends pragmatic engineering, product thinking, and design craft. We work across discovery, delivery, and ongoing improvement so our clients get one partner from idea to scale."
    }
  },
  {
    page: "about",
    section: "missionVisionValues",
    label: "Mission, vision, and values",
    kind: "single",
    order: 3,
    content: {
      mission: {
        heading: "Mission",
        body: "Help teams launch and evolve products with speed, reliability, and clear communication."
      },
      vision: {
        heading: "Vision",
        body: "Become the most trusted product delivery partner for ambitious organizations."
      },
      values: {
        heading: "Values",
        items: ["Own the outcome", "Communicate clearly", "Improve continuously"]
      }
    }
  },
  {
    page: "about",
    section: "howWeWork",
    label: "How we work",
    kind: "list",
    order: 4,
    items: [
      { label: "Discover", body: "We align on the problem, users, and outcomes." },
      { label: "Design", body: "We shape ideas into testable product plans and prototypes." },
      { label: "Build", body: "We ship incrementally with tight quality control." },
      { label: "Support", body: "We stay involved after launch to keep systems healthy." }
    ]
  },
  {
    page: "about",
    section: "culture",
    label: "Culture",
    kind: "list",
    order: 5,
    items: [
      { text: "Small, focused teams that move quickly without losing alignment." },
      { text: "Direct communication and honest expectations from day one." },
      { text: "Delivery that balances speed, quality, and maintainability." },
      { text: "Partnership that continues after launch instead of ending at handoff." }
    ]
  },
  {
    page: "about",
    section: "team",
    label: "Team",
    kind: "list",
    order: 6,
    items: [
      { name: "Aisha Khan", role: "CEO" },
      { name: "Ravi Patel", role: "Head of Engineering" },
      { name: "Maya Chen", role: "Design Lead" }
    ]
  },
  {
    page: "about",
    section: "stats",
    label: "Stats",
    kind: "list",
    order: 7,
    items: [
      { value: "120+", label: "Projects delivered" },
      { value: "50+", label: "Happy clients" },
      { value: "99.9%", label: "Platform uptime SLA" }
    ]
  },
  {
    page: "about",
    section: "testimonial",
    label: "Testimonial",
    kind: "single",
    order: 8,
    content: {
      quote:
        "TRIVIN turned a rough concept into a reliable product with a clear delivery rhythm.",
      attribution: "Product Lead, Acme Corp"
    }
  },
  {
    page: "about",
    section: "careersCta",
    label: "Careers CTA",
    kind: "single",
    order: 9,
    content: {
      heading: "Join our team",
      body: "We are always looking for people who care about product quality and thoughtful delivery.",
      ctaLabel: "View careers",
      ctaHref: "/jobs"
    }
  },
  {
    page: "about",
    section: "contactCta",
    label: "Contact CTA",
    kind: "single",
    order: 10,
    content: {
      heading: "Talk to us",
      body: "Have a product idea or a delivery challenge? We are ready to help.",
      ctaLabel: "Contact us",
      ctaHref: "/contact"
    }
  },

  // —— services ——
  {
    page: "services",
    section: "hero",
    label: "Hero",
    kind: "single",
    order: 1,
    content: {
      eyebrow: "Services",
      title: "Our Services",
      description:
        "We build innovative software, web applications, mobile apps, and cloud-based solutions that help businesses grow, automate operations, and deliver exceptional customer experiences.",
      primaryActionLabel: "Get Free Quote",
      primaryActionHref: "#contact-form",
      secondaryActionLabel: "Schedule Call",
      secondaryActionHref: "#contact-form"
    }
  },
  {
    page: "services",
    section: "overview",
    label: "Overview",
    kind: "single",
    order: 2,
    content: {
      body: "We build scalable, fast, and secure web applications using modern technologies. Our services are best for startups, growing businesses, and teams that need a dependable product partner to move ideas into production.",
      bullets: [
        "Who needs it: startups, SMBs, and product teams",
        "Business benefits: faster delivery, better UX, lower maintenance",
        "What the service is: full-cycle design and engineering support",
        "Outcomes: stronger conversions, scalable architecture, predictable delivery"
      ],
      imageSrc:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Team working on a service project"
    }
  },
  {
    page: "services",
    section: "industries",
    label: "Industries",
    kind: "list",
    order: 3,
    items: [
      {
        name: "Healthcare",
        icon: "Stethoscope",
        color: "#ec4899",
        glow: "from-pink-400/20 to-pink-400/5",
        description: "HIPAA-compliant portals, appointment scheduling, and patient management systems.",
        capabilities: ["Patient portals", "Appointment systems", "Telemedicine", "Medical records"]
      },
      {
        name: "E-commerce",
        icon: "ShoppingCart",
        color: "#f59e0b",
        glow: "from-amber-400/20 to-amber-400/5",
        description: "Conversion-focused storefronts, inventory management, and checkout optimization.",
        capabilities: ["Product catalogs", "Payment integration", "Inventory tracking", "Order management"]
      },
      {
        name: "Education",
        icon: "BookOpen",
        color: "#06b6d4",
        glow: "from-cyan-400/20 to-cyan-400/5",
        description: "Learning management systems, course platforms, and student engagement tools.",
        capabilities: ["LMS platforms", "Course delivery", "Student dashboards", "Progress tracking"]
      },
      {
        name: "Finance",
        icon: "TrendingUp",
        color: "#10b981",
        glow: "from-emerald-400/20 to-emerald-400/5",
        description: "Secure dashboards, transaction management, and real-time financial reporting.",
        capabilities: ["Analytics dashboards", "Transaction handling", "Compliance reporting", "Security features"]
      }
    ]
  },
  {
    page: "services",
    section: "processSteps",
    label: "Process steps",
    kind: "list",
    order: 4,
    items: [
      {
        title: "Requirement Gathering",
        icon: "Clipboard",
        color: "#06b6d4",
        glow: "from-cyan-400/20 to-cyan-400/5",
        description: "We listen, analyze, and document your project goals, constraints, and success metrics.",
        details: ["Stakeholder interviews", "Scope definition", "Requirements doc", "Success metrics"]
      },
      {
        title: "Planning",
        icon: "MapPin",
        color: "#3b82f6",
        glow: "from-blue-400/20 to-blue-400/5",
        description: "We create a detailed roadmap with milestones, timelines, and resource allocation.",
        details: ["Technical roadmap", "Sprint planning", "Resource allocation", "Risk assessment"]
      },
      {
        title: "UI/UX Design",
        icon: "Palette",
        color: "#f59e0b",
        glow: "from-amber-400/20 to-amber-400/5",
        description: "We design interfaces that are intuitive, beautiful, and aligned with your brand.",
        details: ["Wireframing", "Design system", "Prototyping", "User testing"]
      },
      {
        title: "Development",
        icon: "Code2",
        color: "#10b981",
        glow: "from-emerald-400/20 to-emerald-400/5",
        description: "We build scalable, clean code following best practices and industry standards.",
        details: ["Frontend development", "Backend APIs", "Database design", "Infrastructure setup"]
      }
    ]
  },
  {
    page: "services",
    section: "advantages",
    label: "Advantages",
    kind: "list",
    order: 5,
    items: [
      { text: "Experienced Team" },
      { text: "Agile Development" },
      { text: "Fast Delivery" },
      { text: "Affordable Pricing" },
      { text: "Dedicated Support" },
      { text: "Scalable Solutions" }
    ]
  },
  {
    page: "services",
    section: "projects",
    label: "Projects",
    kind: "list",
    order: 6,
    items: [
      {
        title: "Retail operations portal",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        goal: "Centralized order handling and team reporting.",
        result: "Reduced manual updates and improved turnaround time.",
        technologies: ["React", "Node.js", "MongoDB"]
      },
      {
        title: "Healthcare booking suite",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
        goal: "A secure appointment and patient communication flow.",
        result: "Streamlined scheduling across multiple service lines.",
        technologies: ["Next.js", "AWS", "Docker"]
      },
      {
        title: "Finance dashboard",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
        goal: "Real-time visibility into operational KPIs.",
        result: "Clearer reporting and easier stakeholder review.",
        technologies: ["React", "MongoDB", "AWS"]
      }
    ]
  },
  {
    page: "services",
    section: "testimonials",
    label: "Testimonials",
    kind: "list",
    order: 7,
    items: [
      {
        name: "Maya Thompson",
        company: "Northstar Labs",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
        review:
          "The team translated our requirements into a clean product and kept the project moving steadily."
      },
      {
        name: "Arjun Patel",
        company: "BlueRiver Ventures",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
        review: "Fast delivery, clear communication, and a result that matched our business goals."
      }
    ]
  },
  {
    page: "services",
    section: "faqs",
    label: "FAQs",
    kind: "list",
    order: 8,
    items: [
      {
        question: "How long does development take?",
        answer:
          "Timelines vary by scope, but most projects move through discovery, design, build, and launch in phased milestones."
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
        answer:
          "Pricing depends on scope, complexity, and delivery timeline. Fixed packages and custom quotes are both available."
      }
    ]
  },
  {
    page: "services",
    section: "bottomCta",
    label: "Bottom CTA",
    kind: "single",
    order: 9,
    content: {
      eyebrow: "CTA",
      headline: "Let's build your next digital product",
      body: "Book a consultation or contact us directly and we'll help you choose the right scope, timeline, and delivery path.",
      primaryCta: "Contact Us",
      secondaryCta: "Book Free Consultation"
    }
  },

  // —— jobs ——
  {
    page: "jobs",
    section: "hero",
    label: "Hero",
    kind: "single",
    order: 1,
    content: {
      eyebrow: "Careers",
      title: "Build the future with TRIVIN.",
      description:
        "Join a team that values collaboration, learning, and product impact. Explore the roles, culture, and opportunities below.",
      primaryActionLabel: "View Open Positions",
      primaryActionHref: "#open-positions",
      secondaryActionLabel: "Apply Now",
      secondaryActionHref: "#application-form"
    }
  },
  {
    page: "jobs",
    section: "culture",
    label: "Culture",
    kind: "single",
    order: 2,
    content: {
      body: "We believe in collaboration, creativity, and continuous learning. Our mission is to build dependable digital experiences and our vision is to grow with teams that care about quality and ownership. Every day is a chance to solve real problems, work with smart teammates, and innovate with purpose.",
      pillars: [
        {
          title: "Mission & Vision",
          icon: "Compass",
          description: "Built for people who want to learn, ship, and grow with the team."
        },
        {
          title: "Team Environment",
          icon: "Users",
          description: "Built for people who want to learn, ship, and grow with the team."
        },
        {
          title: "Growth Opportunities",
          icon: "GraduationCap",
          description: "Built for people who want to learn, ship, and grow with the team."
        },
        {
          title: "Innovation Mindset",
          icon: "Zap",
          description: "Built for people who want to learn, ship, and grow with the team."
        }
      ]
    }
  },
  {
    page: "jobs",
    section: "benefits",
    label: "Benefits",
    kind: "list",
    order: 3,
    items: [
      {
        title: "Flexible Work Hours",
        icon: "Clock3",
        color: "#06b6d4",
        glow: "from-cyan-400/20 to-cyan-400/5",
        description: "Work on your schedule. We trust our team to manage their time effectively."
      },
      {
        title: "Remote Opportunities",
        icon: "Laptop",
        color: "#3b82f6",
        glow: "from-blue-400/20 to-blue-400/5",
        description: "Work from anywhere. Collaborate seamlessly across distributed teams."
      },
      {
        title: "Competitive Salary",
        icon: "DollarSign",
        color: "#10b981",
        glow: "from-emerald-400/20 to-emerald-400/5",
        description: "Market-competitive compensation with performance-based incentives."
      },
      {
        title: "Paid Leave",
        icon: "CalendarDays",
        color: "#f59e0b",
        glow: "from-amber-400/20 to-amber-400/5",
        description: "Generous paid time off plus flexible holidays and wellness breaks."
      }
    ]
  },
  {
    page: "jobs",
    section: "departments",
    label: "Departments",
    kind: "list",
    order: 4,
    items: [
      { title: "Development", icon: "LayoutGrid", description: "Build scalable solutions with modern tech stacks" },
      { title: "UI/UX Design", icon: "Sparkles", description: "Create intuitive and beautiful user experiences" },
      { title: "Marketing", icon: "Compass", description: "Drive growth and build brand awareness" },
      { title: "Sales", icon: "BriefcaseBusiness", description: "Close deals and expand business opportunities" }
    ]
  },
  {
    page: "jobs",
    section: "processSteps",
    label: "Recruitment process",
    kind: "list",
    order: 5,
    items: [
      {
        title: "Application Review",
        description: "Submit your resume and application",
        details: "Our HR team reviews your credentials",
        duration: "2-3 days",
        icon: "FileText"
      },
      {
        title: "HR Interview",
        description: "Initial conversation with HR",
        details: "Discuss your background and expectations",
        duration: "1 week",
        icon: "MessageSquare"
      },
      {
        title: "Technical Round",
        description: "Assess your technical skills",
        details: "Complete a technical assessment or interview",
        duration: "1 week",
        icon: "Laptop"
      },
      {
        title: "Final Discussion",
        description: "Meet with the hiring manager",
        details: "Final round to align on role and culture",
        duration: "3-5 days",
        icon: "Users"
      },
      {
        title: "Offer Letter",
        description: "Receive your offer",
        details: "Join our amazing team!",
        duration: "1-2 days",
        icon: "Award"
      }
    ]
  },
  {
    page: "jobs",
    section: "testimonials",
    label: "Employee testimonials",
    kind: "list",
    order: 6,
    items: [
      {
        name: "Aarav Sen",
        role: "Frontend Engineer",
        experience: "2 years at TRIVIN",
        department: "Development",
        quote: "The team gives real ownership and encourages learning every week.",
        avatar: "AS",
        rating: 5
      },
      {
        name: "Meera Das",
        role: "Product Designer",
        experience: "1.5 years at TRIVIN",
        department: "UI/UX Design",
        quote: "We move fast without losing quality. It feels creative and collaborative.",
        avatar: "MD",
        rating: 5
      },
      {
        name: "Rohan Malik",
        role: "DevOps Specialist",
        experience: "3 years at TRIVIN",
        department: "DevOps",
        quote: "The stack is modern, the feedback loop is strong, and the culture is supportive.",
        avatar: "RM",
        rating: 5
      }
    ]
  },
  {
    page: "jobs",
    section: "lifeAtCompany",
    label: "Life at company",
    kind: "list",
    order: 7,
    items: [
      {
        title: "Team Events",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Office Setup",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Work Environment",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Celebrations",
        image:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Hackathons",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
      }
    ]
  },
  {
    page: "jobs",
    section: "faqs",
    label: "FAQs",
    kind: "list",
    order: 8,
    items: [
      {
        question: "Do you offer remote jobs?",
        answer: "Yes, some roles are remote or hybrid depending on the team and project needs."
      },
      {
        question: "What technologies do you use?",
        answer: "We work with modern web stacks, cloud tools, APIs, and automation-friendly workflows."
      },
      {
        question: "How long is the hiring process?",
        answer: "Most candidates complete the process within 1 to 2 weeks."
      },
      {
        question: "Can freshers apply?",
        answer: "Yes, we regularly consider freshers and internship applicants."
      }
    ]
  },
  {
    page: "jobs",
    section: "sidebar",
    label: "Application sidebar",
    kind: "single",
    order: 9,
    content: {
      paragraphs: [
        "Grow with a team that supports learning, ownership, and experimentation.",
        "Work on meaningful products with modern tools and collaborative delivery.",
        "We value fresh ideas, clear communication, and measurable impact."
      ],
      linkedInTitle: "LinkedIn apply option",
      linkedInBody: "Share your profile with the team when you submit your resume URL.",
      trackingTitle: "Real-time tracking",
      trackingBody: "Applied candidates can use their profile to review application history in the app."
    }
  },
  {
    page: "jobs",
    section: "finalCta",
    label: "Final CTA",
    kind: "single",
    order: 10,
    content: {
      sectionTitle: "Ready to grow your career?",
      sectionSubtitle: "Final CTA",
      primaryCta: "Join Our Team",
      secondaryCta: "Apply Today"
    }
  },

  // —— contact ——
  {
    page: "contact",
    section: "hero",
    label: "Hero",
    kind: "single",
    order: 1,
    content: {
      eyebrow: "Contact us",
      title: "Let's build something amazing together.",
      description:
        "Have a project idea? Contact our team today and we'll help you shape the right plan, budget, and delivery path.",
      primaryActionLabel: "Send Message",
      primaryActionHref: "#contact-form",
      secondaryActionLabel: "Get Free Quote",
      secondaryActionHref: "#contact-form"
    }
  },
  {
    page: "contact",
    section: "benefits",
    label: "Benefits",
    kind: "list",
    order: 2,
    items: [
      { text: "Free Consultation" },
      { text: "Fast Response" },
      { text: "Dedicated Support" },
      { text: "Expert Developers" },
      { text: "Transparent Pricing" },
      { text: "Secure Delivery" }
    ]
  },
  {
    page: "contact",
    section: "quickActions",
    label: "Quick actions",
    kind: "list",
    order: 3,
    items: [
      { title: "Book a Meeting", icon: "CalendarDays", href: "#contact-form" },
      { title: "WhatsApp Support", icon: "MessageCircle", href: "https://wa.me/15551234567" },
      { title: "Sales Inquiry", icon: "BriefcaseBusiness", href: "mailto:trivintech@gmail.com" },
      { title: "Technical Support", icon: "Headset", href: "#faq" }
    ]
  },
  {
    page: "contact",
    section: "faqs",
    label: "FAQs",
    kind: "list",
    order: 4,
    items: [
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
    ]
  },
  {
    page: "contact",
    section: "bottomCta",
    label: "Bottom CTA",
    kind: "single",
    order: 5,
    content: {
      title: "Ready to start your project?",
      subtitle: "CTA",
      ctaPrimary: "Schedule a Call",
      ctaSecondary: "Talk to Experts"
    }
  },
  {
    page: "contact",
    section: "loginPrompt",
    label: "Login prompt",
    kind: "single",
    order: 6,
    content: {
      headline: "Want to track your inquiries?",
      body: "Login to view query history, responses, and status updates.",
      ctaLabel: "Login"
    }
  },

  // —— investor ——
  {
    page: "investor",
    section: "hero",
    label: "Hero",
    kind: "single",
    order: 1,
    content: {
      eyebrow: "Investor relations",
      title: "A dedicated view into TRIVIN's growth, financial position, and strategy.",
      description:
        "Review our operating model, growth drivers, reporting materials, and investor resources in one place.",
      primaryActionLabel: "Investment highlights",
      primaryActionHref: "#investment-highlights",
      secondaryActionLabel: "Financial reports",
      secondaryActionHref: "#financial-reports"
    }
  },
  {
    page: "investor",
    section: "overview",
    label: "Company overview",
    kind: "single",
    order: 2,
    content: {
      subtitle: "Overview",
      title: "Company overview",
      body: "TRIVIN provides product design, engineering, and platform support services for teams that need to launch faster and operate more reliably. Our model is built to create recurring client relationships, expand engagement depth, and support long-term value creation."
    }
  },
  {
    page: "investor",
    section: "highlights",
    label: "Investment highlights",
    kind: "list",
    order: 3,
    items: [
      { text: "Recurring services revenue with a growing base of retained clients." },
      { text: "Delivery model that combines strategy, design, and engineering in one flow." },
      { text: "Strong focus on operational discipline, quality, and margin improvement." },
      { text: "Leadership team aligned around product thinking and customer outcomes." }
    ]
  },
  {
    page: "investor",
    section: "kpis",
    label: "KPIs",
    kind: "list",
    order: 4,
    items: [
      { value: "$4.2M", label: "Annual revenue" },
      { value: "85%", label: "Customer retention" },
      { value: "120+", label: "Projects delivered" }
    ]
  },
  {
    page: "investor",
    section: "financialReports",
    label: "Financial reports",
    kind: "list",
    order: 5,
    items: [{ title: "Q1 report (PDF)" }, { title: "Annual report (PDF)" }, { title: "Shareholder letter (PDF)" }]
  },
  {
    page: "investor",
    section: "timeline",
    label: "Growth timeline",
    kind: "list",
    order: 6,
    items: [
      { year: "2016", description: "Company founded and first client engagements launched." },
      { year: "2019", description: "Broadened into cloud delivery and managed services." },
      { year: "2023", description: "Reached a stronger recurring revenue mix and larger delivery capacity." }
    ]
  },
  {
    page: "investor",
    section: "team",
    label: "Leadership team",
    kind: "list",
    order: 7,
    items: [
      { name: "Aisha Khan", title: "CEO" },
      { name: "Ravi Patel", title: "Head of Engineering" },
      { name: "Maya Chen", title: "Design Lead" }
    ]
  },
  {
    page: "investor",
    section: "faqs",
    label: "Investor FAQs",
    kind: "list",
    order: 8,
    items: [
      {
        question: "How can I request the latest investor deck?",
        answer: "Use the investor contact channel below and we will share the current materials."
      },
      {
        question: "Do you publish regular financial updates?",
        answer: "Yes. Quarterly reports and major announcements are posted in the resources section."
      }
    ]
  },
  {
    page: "investor",
    section: "marketOpportunity",
    label: "Market opportunity",
    kind: "single",
    order: 9,
    content: {
      subtitle: "Market",
      title: "Market opportunity",
      body: "We operate in the expanding market for product engineering, cloud modernization, and managed digital services. Demand is driven by teams that want a faster path from roadmap to production without adding internal complexity."
    }
  },
  {
    page: "investor",
    section: "productInnovation",
    label: "Product innovation",
    kind: "single",
    order: 10,
    content: {
      subtitle: "Product",
      title: "Product innovation",
      body: "Ongoing investment in automation, reusable delivery patterns, and developer experience helps us improve margins while increasing speed and consistency for clients."
    }
  },
  {
    page: "investor",
    section: "funding",
    label: "Funding information",
    kind: "single",
    order: 11,
    content: {
      subtitle: "Funding",
      title: "Funding information",
      body: "Seed-stage history, current financing status, and future capital planning can be shared through investor relations materials as needed."
    }
  },
  {
    page: "investor",
    section: "investorResources",
    label: "Investor resources",
    kind: "list",
    order: 12,
    items: [
      { text: "Investor deck and presentations" },
      { text: "Governance and policy documents" },
      { text: "Annual letters and quarterly updates" }
    ]
  },
  {
    page: "investor",
    section: "stock",
    label: "Stock information",
    kind: "single",
    order: 13,
    content: {
      subtitle: "Stock",
      title: "Stock information",
      body: "If and when public market information applies, this section can include ticker details, market data, and filings. Until then, the page can present private-company funding and cap table information."
    }
  },
  {
    page: "investor",
    section: "esg",
    label: "ESG",
    kind: "single",
    order: 14,
    content: {
      subtitle: "ESG",
      title: "ESG and sustainability",
      body: "We focus on responsible business practices, inclusive teams, and sustainable delivery processes that reduce waste and support long-term operating discipline."
    }
  },
  {
    page: "investor",
    section: "news",
    label: "News",
    kind: "list",
    order: 15,
    items: [
      { text: "Latest company announcement and product milestone" },
      { text: "Quarterly update and business summary" }
    ]
  },
  {
    page: "investor",
    section: "finalCta",
    label: "Final CTA",
    kind: "single",
    order: 16,
    content: {
      heading: "Stay connected",
      body: "Reach out for investor materials, reporting requests, or to start a conversation.",
      ctaLabel: "Contact investor relations",
      ctaHref: "/contact"
    }
  }
];

const upsertPageContent = async (def) => {
  const page = def.page.toLowerCase().trim();
  const update = {
    label: def.label,
    kind: def.kind,
    order: def.order,
    isActive: true
  };

  if (def.kind === "list") {
    update.items = def.items ?? [];
    update.content = {};
  } else {
    update.content = def.content ?? {};
    update.items = [];
  }

  await PageContent.findOneAndUpdate(
    { page, section: def.section },
    {
      $set: update,
      $setOnInsert: { page, section: def.section }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

const run = async () => {
  await connectDb();

  await SiteSetting.findOneAndUpdate(
    { key: "global" },
    { $set: defaultSettings },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log("Seeded site settings (global).");

  for (const sectionDef of pageContentSections) {
    await upsertPageContent(sectionDef);
  }
  console.log(`Seeded ${pageContentSections.length} page content sections.`);

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
