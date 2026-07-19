import { useEffect, useState } from "react";
import api from "../api/api.js";

/**
 * Fetch CMS page content with local fallbacks.
 * @param {string} page - page slug e.g. "home"
 * @param {Record<string, any>} fallbacks - section key -> fallback value
 */
const usePageContent = (page, fallbacks = {}) => {
  const [content, setContent] = useState(fallbacks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const { data } = await api.get(`/content/${page}`);
        if (cancelled) return;
        const merged = { ...fallbacks };
        const remote = data.content || {};
        Object.keys(fallbacks).forEach((key) => {
          const value = remote[key];
          if (value == null) return;
          if (Array.isArray(value) && value.length === 0) return;
          if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return;
          merged[key] = value;
        });
        // Also include any extra remote sections not in fallbacks
        Object.keys(remote).forEach((key) => {
          if (merged[key] === undefined && remote[key] != null) {
            merged[key] = remote[key];
          }
        });
        setContent(merged);
      } catch {
        if (!cancelled) setContent(fallbacks);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { content, loading };
};

export default usePageContent;
