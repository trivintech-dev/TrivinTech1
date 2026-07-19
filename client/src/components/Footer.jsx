import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import useSiteSettings from "../hooks/useSiteSettings.js";
import { resolveIcon } from "../lib/iconMap.js";

const defaultSocials = [
  { href: "https://www.facebook.com", label: "Facebook", platform: "facebook", icon: FaFacebookF },
  {
    href: "https://www.instagram.com/trivin.ai?igsh=OGxjdnd1b3BqOTdh",
    label: "Instagram",
    platform: "instagram",
    icon: FaInstagram
  },
  {
    href: "https://www.linkedin.com/company/trivintechnologies/",
    label: "LinkedIn",
    platform: "linkedin",
    icon: FaLinkedinIn
  },
  { href: "https://www.youtube.com", label: "YouTube", platform: "youtube", icon: FaYoutube }
];

const platformIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube
};

const Footer = () => {
  const { settings } = useSiteSettings();
  const brandName = settings.brand?.name || "TRIVIN";
  const tagline =
    settings.footer?.tagline ||
    settings.brand?.tagline ||
    "Product strategy, engineering, and continuous care for growing teams.";
  const columns = settings.footer?.columns?.length
    ? settings.footer.columns
    : [
        { title: "Services", items: ["Product discovery", "Design & engineering", "Cloud & devops"] },
        { title: "Company", items: ["About us", "Careers", "Blog"] }
      ];
  const contact = settings.contact || {};
  const legalText = settings.footer?.legalText || "Privacy · Terms";
  const socials = settings.socials?.length
    ? settings.socials.map((social) => ({
        ...social,
        icon: platformIcons[social.platform?.toLowerCase()] || resolveIcon(social.icon, FaLinkedinIn)
      }))
    : defaultSocials;

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="w-full px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-ink sm:text-xl">{brandName}</h3>
            <p className="mt-2 text-xs text-gray-600 sm:mt-3 sm:text-sm">{tagline}</p>
            <div className="mt-4 flex items-center gap-2 sm:mt-6">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-full border border-gray-100/15 bg-slate-900/70 text-[#aeeaff] transition hover:-translate-y-0.5 hover:border-brand/50 hover:text-white sm:h-10 sm:w-10"
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.slice(0, 2).map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold text-ink sm:text-sm">{column.title}</h4>
              <ul className="mt-2 space-y-1 text-xs text-gray-600 sm:mt-3 sm:space-y-2 sm:text-sm">
                {(column.items || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold text-ink sm:text-sm">Contact</h4>
            <p className="mt-2 text-xs text-gray-600 sm:mt-3 sm:text-sm">
              {contact.email || "trivintech@gmail.com"}
            </p>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">{contact.phone || "+91 8979510012"}</p>
            {contact.address ? <p className="mt-1 text-xs text-gray-600 sm:text-sm">{contact.address}</p> : null}
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:mt-8 sm:pt-6 sm:text-sm">
          <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
            <p>
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            <p>{legalText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
