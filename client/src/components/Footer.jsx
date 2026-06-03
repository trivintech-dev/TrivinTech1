import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { href: "https://www.facebook.com", label: "Facebook", icon: FaFacebookF },
    { href: "https://www.instagram.com", label: "Instagram", icon: FaInstagram },
    { href: "https://www.linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
    { href: "https://www.youtube.com", label: "YouTube", icon: FaYoutube }
  ];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="w-full px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-xl font-semibold text-ink">TRIVIN TECHNOLOY</h3>
            <p className="mt-3 text-sm text-gray-600">
              Product strategy, engineering, and continuous care for growing teams.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gray-100/15 bg-slate-900/70 text-[#aeeaff] transition hover:-translate-y-0.5 hover:border-brand/50 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Product discovery</li>
              <li>Design & engineering</li>
              <li>Cloud & devops</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>About us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink">Contact</h4>
            <p className="mt-3 text-sm text-gray-600">trivintech@gmail.com</p>
            <p className="mt-1 text-sm text-gray-600">+91 8979510012</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-sm text-gray-500">
          <div className="flex w-full items-center justify-between">
            <p>© {new Date().getFullYear()} TRIVIN TECHNOLOY. All rights reserved.</p>
            <p>Privacy · Terms</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
