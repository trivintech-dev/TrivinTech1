import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { href: "https://www.facebook.com", label: "Facebook", icon: FaFacebookF },
    { href: "https://www.instagram.com/trivin.ai?igsh=OGxjdnd1b3BqOTdh", label: "Instagram", icon: FaInstagram },
    { href: "https://www.linkedin.com/company/trivintechnologies/", label: "LinkedIn", icon: FaLinkedinIn },
    { href: "https://www.youtube.com", label: "YouTube", icon: FaYoutube }
  ];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-ink">TRIVIN</h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
              Product strategy, engineering, and continuous care for growing teams.
            </p>
            <div className="mt-4 sm:mt-6 flex items-center gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full border border-gray-100/15 bg-slate-900/70 text-[#aeeaff] transition hover:-translate-y-0.5 hover:border-brand/50 hover:text-white"
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-ink">Services</h4>
            <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>Product discovery</li>
              <li>Design & engineering</li>
              <li>Cloud & devops</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-ink">Company</h4>
            <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>About us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-ink">Contact</h4>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">trivintech@gmail.com</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">+91 8979510012</p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-gray-100 pt-4 sm:pt-6 text-xs sm:text-sm text-gray-500">
          <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} TRIVIN. All rights reserved.</p>
            <p>Privacy · Terms</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
