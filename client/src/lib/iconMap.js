import {
  Award,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Cloud,
  Code2,
  Globe,
  Headset,
  Layers3,
  Lock,
  MessageCircle,
  Phone,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Zap,
  Shield,
  Clock3,
  CheckCircle2
} from "lucide-react";
import { BiLogoAws } from "react-icons/bi";
import { FaJava, FaLaravel, FaPhp, FaPython, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import {
  SiDocker,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiVuedotjs
} from "react-icons/si";

const ICONS = {
  Award,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Cloud,
  Code2,
  Globe,
  Headset,
  Layers3,
  Lock,
  MessageCircle,
  Phone,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Zap,
  Shield,
  Clock3,
  CheckCircle2,
  BiLogoAws,
  FaJava,
  FaLaravel,
  FaPhp,
  FaPython,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  SiDocker,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiVuedotjs
};

export const resolveIcon = (name, fallback = Sparkles) => {
  if (!name) return fallback;
  if (typeof name !== "string") return name;
  return ICONS[name] || fallback;
};

export default ICONS;
