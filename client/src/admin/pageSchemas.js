const heroFields = [
  { name: "eyebrow", label: "Eyebrow", type: "text", placeholder: "Section label" },
  { name: "title", label: "Headline", type: "textarea", rows: 2, full: true },
  { name: "description", label: "Description", type: "textarea", rows: 3, full: true },
  { name: "primaryLabel", label: "Primary button label", type: "text" },
  { name: "primaryHref", label: "Primary button link", type: "text", placeholder: "/contact or #section" },
  { name: "secondaryLabel", label: "Secondary button label", type: "text" },
  { name: "secondaryHref", label: "Secondary button link", type: "text" }
];

const faqFields = [
  { name: "question", label: "Question", type: "text", full: true },
  { name: "answer", label: "Answer", type: "textarea", rows: 3, full: true }
];

const statFields = [
  { name: "value", label: "Value", type: "text", placeholder: "120+" },
  { name: "label", label: "Label", type: "text", placeholder: "Projects delivered" }
];

const ctaFields = [
  { name: "title", label: "Title", type: "text", full: true },
  { name: "description", label: "Description", type: "textarea", rows: 3, full: true },
  { name: "buttonLabel", label: "Button label", type: "text" },
  { name: "buttonHref", label: "Button link", type: "text" }
];

export const PAGE_SCHEMAS = {
  home: {
    label: "Home",
    description: "Hero, highlights, stack, gallery, projects, and FAQs on the landing page.",
    sections: [
      {
        key: "hero",
        label: "Hero",
        kind: "single",
        fields: heroFields
      },
      {
        key: "serviceHighlights",
        label: "Service highlights",
        kind: "list",
        itemTitle: (item) => item.title || "Highlight",
        newItem: () => ({ title: "", category: "Build", description: "" }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "category", label: "Category", type: "text", placeholder: "Build, Design, Cloud..." },
          { name: "description", label: "Description", type: "textarea", rows: 2, full: true }
        ]
      },
      {
        key: "advantages",
        label: "Advantages",
        kind: "list",
        itemTitle: (item) => item.text || "Advantage",
        newItem: () => ({ text: "" }),
        fields: [{ name: "text", label: "Advantage", type: "text", full: true }],
        columns: 1
      },
      {
        key: "techStack",
        label: "Tech stack",
        kind: "list",
        itemTitle: (item) => item.name || "Technology",
        newItem: () => ({ name: "" }),
        fields: [{ name: "name", label: "Name", type: "text" }],
        columns: 1
      },
      {
        key: "gallery",
        label: "Gallery",
        kind: "list",
        itemTitle: (item) => item.text || "Slide",
        newItem: () => ({ image: "", text: "" }),
        fields: [
          { name: "text", label: "Caption", type: "text" },
          { name: "image", label: "Image URL", type: "text", full: true }
        ]
      },
      {
        key: "projects",
        label: "Featured projects",
        kind: "list",
        itemTitle: (item) => item.title || "Project",
        newItem: () => ({ title: "", image: "", industry: "", liveLink: "", technologies: [] }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "industry", label: "Industry", type: "text" },
          { name: "liveLink", label: "Link", type: "text" },
          { name: "image", label: "Image URL", type: "text", full: true },
          { name: "technologies", label: "Technologies", type: "list", full: true }
        ]
      },
      {
        key: "faqs",
        label: "FAQs",
        kind: "list",
        itemTitle: (item) => item.question || "FAQ",
        newItem: () => ({ question: "", answer: "" }),
        fields: faqFields,
        columns: 1
      },
      {
        key: "cta",
        label: "Bottom CTA",
        kind: "single",
        fields: ctaFields
      }
    ]
  },
  about: {
    label: "About",
    description: "Company story, values, team, stats, and call-to-action blocks.",
    sections: [
      { key: "hero", label: "Hero", kind: "single", fields: heroFields },
      {
        key: "companyStory",
        label: "Company story",
        kind: "single",
        fields: [
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "body", label: "Body", type: "textarea", rows: 6, full: true }
        ]
      },
      {
        key: "missionValues",
        label: "Mission & values",
        kind: "list",
        itemTitle: (item) => item.title || "Value",
        newItem: () => ({ title: "", description: "" }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 3, full: true }
        ],
        columns: 1
      },
      {
        key: "howWeWork",
        label: "How we work",
        kind: "list",
        itemTitle: (item) => item.title || "Step",
        newItem: () => ({ step: "", title: "", description: "" }),
        fields: [
          { name: "step", label: "Step number", type: "text", placeholder: "01" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 3, full: true }
        ],
        columns: 1
      },
      {
        key: "culture",
        label: "Culture highlights",
        kind: "list",
        itemTitle: (item) => item.title || "Highlight",
        newItem: () => ({ title: "", description: "" }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 2, full: true }
        ]
      },
      {
        key: "team",
        label: "Team",
        kind: "list",
        itemTitle: (item) => item.name || "Team member",
        newItem: () => ({ name: "", role: "", bio: "", imageUrl: "", linkedinUrl: "" }),
        fields: [
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "imageUrl", label: "Photo URL", type: "text" },
          { name: "linkedinUrl", label: "LinkedIn URL", type: "text" },
          { name: "bio", label: "Bio", type: "textarea", rows: 3, full: true }
        ]
      },
      {
        key: "stats",
        label: "Stats",
        kind: "list",
        itemTitle: (item) => item.label || "Stat",
        newItem: () => ({ value: "", label: "" }),
        fields: statFields
      },
      {
        key: "testimonialsIntro",
        label: "Testimonials intro",
        kind: "single",
        fields: [
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 3, full: true }
        ]
      },
      { key: "careersCta", label: "Careers CTA", kind: "single", fields: ctaFields },
      { key: "contactCta", label: "Contact CTA", kind: "single", fields: ctaFields }
    ]
  },
  services: {
    label: "Services page",
    description: "Marketing copy for the services landing page (catalog still comes from Services admin).",
    sections: [
      { key: "hero", label: "Hero", kind: "single", fields: heroFields },
      {
        key: "industries",
        label: "Industries",
        kind: "list",
        itemTitle: (item) => item.name || "Industry",
        newItem: () => ({ name: "", description: "", capabilities: [] }),
        fields: [
          { name: "name", label: "Name", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 2, full: true },
          { name: "capabilities", label: "Capabilities", type: "list", full: true }
        ],
        columns: 1
      },
      {
        key: "processSteps",
        label: "Process steps",
        kind: "list",
        itemTitle: (item) => item.title || "Step",
        newItem: () => ({ title: "", description: "", details: "" }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Summary", type: "textarea", rows: 2 },
          { name: "details", label: "Details", type: "textarea", rows: 2, full: true }
        ],
        columns: 1
      },
      {
        key: "advantages",
        label: "Advantages",
        kind: "list",
        itemTitle: (item) => item.text || "Advantage",
        newItem: () => ({ text: "" }),
        fields: [{ name: "text", label: "Advantage", type: "text", full: true }],
        columns: 1
      },
      {
        key: "techStack",
        label: "Tech stack",
        kind: "list",
        itemTitle: (item) => item.name || "Technology",
        newItem: () => ({ name: "" }),
        fields: [{ name: "name", label: "Name", type: "text" }],
        columns: 1
      },
      { key: "cta", label: "Bottom CTA", kind: "single", fields: ctaFields }
    ]
  },
  jobs: {
    label: "Careers",
    description: "Careers page hero, benefits, departments, and hiring process.",
    sections: [
      { key: "hero", label: "Hero", kind: "single", fields: heroFields },
      {
        key: "benefits",
        label: "Benefits",
        kind: "list",
        itemTitle: (item) => item.title || "Benefit",
        newItem: () => ({ title: "", description: "" }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 3, full: true }
        ]
      },
      {
        key: "departments",
        label: "Departments",
        kind: "list",
        itemTitle: (item) => item.title || "Department",
        newItem: () => ({ title: "", description: "" }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 2, full: true }
        ]
      },
      {
        key: "processSteps",
        label: "Hiring process",
        kind: "list",
        itemTitle: (item) => item.title || "Step",
        newItem: () => ({ title: "", description: "", details: "", duration: "" }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "duration", label: "Duration", type: "text" },
          { name: "description", label: "Summary", type: "textarea", rows: 2 },
          { name: "details", label: "Details", type: "textarea", rows: 2, full: true }
        ],
        columns: 1
      },
      {
        key: "culture",
        label: "Culture blurb",
        kind: "single",
        fields: [
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 4, full: true }
        ]
      },
      { key: "cta", label: "Apply CTA", kind: "single", fields: ctaFields }
    ]
  },
  contact: {
    label: "Contact",
    description: "Contact hero, quick actions, benefits, FAQs, and form intro.",
    sections: [
      { key: "hero", label: "Hero", kind: "single", fields: heroFields },
      {
        key: "quickActions",
        label: "Quick actions",
        kind: "list",
        itemTitle: (item) => item.title || "Action",
        newItem: () => ({ title: "", href: "", external: false }),
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "href", label: "Link", type: "text", full: true },
          { name: "external", label: "Open in new tab", type: "toggle" }
        ]
      },
      {
        key: "benefits",
        label: "Benefits strip",
        kind: "list",
        itemTitle: (item) => item.text || "Benefit",
        newItem: () => ({ text: "" }),
        fields: [{ name: "text", label: "Benefit", type: "text", full: true }],
        columns: 1
      },
      {
        key: "faqs",
        label: "FAQs",
        kind: "list",
        itemTitle: (item) => item.question || "FAQ",
        newItem: () => ({ question: "", answer: "" }),
        fields: faqFields,
        columns: 1
      },
      {
        key: "formIntro",
        label: "Form intro",
        kind: "single",
        fields: [
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 3, full: true }
        ]
      },
      {
        key: "mapSection",
        label: "Map section",
        kind: "single",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea", rows: 2, full: true },
          { name: "embedUrl", label: "Map embed URL", type: "text", full: true }
        ]
      }
    ]
  },
  investor: {
    label: "Investor",
    description: "Investor relations overview, KPIs, reports, and FAQs.",
    sections: [
      { key: "hero", label: "Hero", kind: "single", fields: heroFields },
      {
        key: "overview",
        label: "Company overview",
        kind: "single",
        fields: [
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "body", label: "Body", type: "textarea", rows: 6, full: true }
        ]
      },
      {
        key: "investmentHighlights",
        label: "Investment highlights",
        kind: "list",
        itemTitle: (_item, index) => `Highlight ${index + 1}`,
        newItem: () => ({ text: "" }),
        fields: [{ name: "text", label: "Highlight", type: "textarea", rows: 2, full: true }],
        columns: 1
      },
      {
        key: "stats",
        label: "KPIs",
        kind: "list",
        itemTitle: (item) => item.label || "KPI",
        newItem: () => ({ value: "", label: "" }),
        fields: statFields
      },
      {
        key: "financialReports",
        label: "Financial reports",
        kind: "list",
        itemTitle: (item) => item.label || "Report",
        newItem: () => ({ label: "", href: "" }),
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Download URL", type: "text", full: true }
        ]
      },
      {
        key: "faqs",
        label: "Investor FAQs",
        kind: "list",
        itemTitle: (item) => item.question || "FAQ",
        newItem: () => ({ question: "", answer: "" }),
        fields: faqFields,
        columns: 1
      },
      { key: "contactCta", label: "Investor contact CTA", kind: "single", fields: ctaFields }
    ]
  }
};

export const PAGE_LIST = [
  {
    slug: "home",
    label: PAGE_SCHEMAS.home.label,
    description: PAGE_SCHEMAS.home.description,
    path: "/"
  },
  {
    slug: "about",
    label: PAGE_SCHEMAS.about.label,
    description: PAGE_SCHEMAS.about.description,
    path: "/about"
  },
  {
    slug: "services",
    label: PAGE_SCHEMAS.services.label,
    description: PAGE_SCHEMAS.services.description,
    path: "/services"
  },
  {
    slug: "jobs",
    label: PAGE_SCHEMAS.jobs.label,
    description: PAGE_SCHEMAS.jobs.description,
    path: "/jobs"
  },
  {
    slug: "contact",
    label: PAGE_SCHEMAS.contact.label,
    description: PAGE_SCHEMAS.contact.description,
    path: "/contact"
  },
  {
    slug: "investor",
    label: PAGE_SCHEMAS.investor.label,
    description: PAGE_SCHEMAS.investor.description,
    path: "/investors"
  }
];

export const emptySingleFromFields = (fields = []) =>
  fields.reduce((acc, field) => {
    if (field.type === "toggle") acc[field.name] = false;
    else if (field.type === "number") acc[field.name] = "";
    else if (field.type === "list") acc[field.name] = [];
    else acc[field.name] = "";
    return acc;
  }, {});
