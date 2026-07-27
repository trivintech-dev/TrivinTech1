import { useEffect, useState } from "react";
import api from "../api/api.js";

const defaultSettings = {
  brand: { name: "TRIVIN", tagline: "", logoUrl: "" },
  contact: {
    phone: "+91 8979510012",
    email: "trivintech@gmail.com",
    investorEmail: "investor@trivin.example",
    address: "",
    workingHours: "Mon - Fri, 9:00 AM - 6:00 PM",
    mapEmbedUrl: "https://www.google.com/maps?q=Kolkata,India&output=embed"
  },
  socials: [],
  nav: [],
  footer: { tagline: "", columns: [], legalText: "Privacy · Terms", legalLinks: [{ label: "Privacy", to: "/privacy" }, { label: "Terms", to: "/terms" }] }
};

const useSiteSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const { data } = await api.get("/settings");
        if (!cancelled && data.settings) {
          setSettings({
            ...defaultSettings,
            ...data.settings,
            brand: { ...defaultSettings.brand, ...(data.settings.brand || {}) },
            contact: { ...defaultSettings.contact, ...(data.settings.contact || {}) },
            footer: { ...defaultSettings.footer, ...(data.settings.footer || {}) }
          });
        }
      } catch {
        // keep defaults
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, loading };
};

export default useSiteSettings;
