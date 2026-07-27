import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import api from "../api/api.js";
import RepeatableList from "../components/admin/RepeatableList.jsx";
import { useToast } from "../components/admin/ToastProvider.jsx";
import { Button, Field, PageHeader, SectionCard, Spinner, Textarea } from "../components/admin/AdminUI.jsx";

const emptyForm = {
  nav: [],
  socials: [],
  footer: {
    tagline: "",
    legalText: "",
    legalLinks: [],
    columns: []
  }
};

const AdminNavigation = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/settings");
        const settings = data.settings || {};
        setForm({
          nav: settings.nav || [],
          socials: settings.socials || [],
          footer: {
            tagline: settings.footer?.tagline || "",
            legalText: settings.footer?.legalText || "",
            legalLinks: settings.footer?.legalLinks || [
              { label: "Privacy", to: "/privacy" },
              { label: "Terms", to: "/terms" }
            ],
            columns: (settings.footer?.columns || []).map((column) => ({
              title: column.title || "",
              items: (column.links || column.items || []).map((item) => {
                if (typeof item === "string") return item;
                const label = item.label || item.title || "";
                const to = item.to || item.href || "";
                return to ? `${label}|${to}` : label;
              })
            }))
          }
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load navigation settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const columns = (form.footer.columns || []).map((column) => ({
        title: column.title || "",
        items: column.items || [],
        links: (column.items || []).map((item) => {
          if (typeof item === "string" && item.includes("|")) {
            const [label, to] = item.split("|").map((part) => part.trim());
            return { label, to };
          }
          if (typeof item === "string") return { label: item, to: "" };
          return { label: item.label || "", to: item.to || item.href || "" };
        })
      }));

      const { data } = await api.put("/settings", {
        nav: form.nav,
        socials: form.socials,
        footer: {
          tagline: form.footer.tagline,
          legalText: form.footer.legalText,
          legalLinks: form.footer.legalLinks || [],
          columns
        }
      });
      const settings = data.settings || {};
      setForm({
        nav: settings.nav || [],
        socials: settings.socials || [],
        footer: {
          tagline: settings.footer?.tagline || "",
          legalText: settings.footer?.legalText || "",
          legalLinks: settings.footer?.legalLinks || [],
          columns: (settings.footer?.columns || []).map((column) => ({
            title: column.title || "",
            items: (column.links || column.items || []).map((item) => {
              if (typeof item === "string") return item;
              const label = item.label || item.title || "";
              const to = item.to || item.href || "";
              return to ? `${label}|${to}` : label;
            })
          }))
        }
      });
      toast.success("Navigation and footer saved");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save navigation");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-400">
        <Spinner /> Loading navigation...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Navigation & footer"
        description="Primary navigation, footer columns, social links, and legal copy."
        actions={
          <Button icon={Save} loading={saving} onClick={handleSave} type="button">
            Save changes
          </Button>
        }
      />

      <SectionCard title="Main navigation">
        <RepeatableList
          items={form.nav}
          onChange={(nav) => setForm((prev) => ({ ...prev, nav }))}
          fields={[
            { name: "label", label: "Label", type: "text" },
            { name: "to", label: "Path", type: "text", placeholder: "/services" }
          ]}
          newItem={() => ({ label: "", to: "" })}
          itemTitle={(item) => item.label || "Nav item"}
          addLabel="Add nav link"
          columns={2}
        />
      </SectionCard>

      <SectionCard
        title="Footer columns"
        description="Each column has a title and links. Prefer Label|/path format, e.g. Blog|/blog"
      >
        <RepeatableList
          items={form.footer.columns}
          onChange={(columns) => setForm((prev) => ({ ...prev, footer: { ...prev.footer, columns } }))}
          fields={[
            { name: "title", label: "Column title", type: "text" },
            {
              name: "items",
              label: "Links (one per line as Label|/path)",
              type: "list",
              full: true,
              hint: "Example: About us|/about",
              placeholder: "About us|/about"
            }
          ]}
          newItem={() => ({ title: "", items: [] })}
          itemTitle={(item) => item.title || "Column"}
          addLabel="Add column"
          columns={1}
        />
      </SectionCard>

      <SectionCard title="Footer text & legal links">
        <div className="grid gap-4">
          <Field label="Footer tagline">
            <Textarea
              rows={2}
              value={form.footer.tagline}
              onChange={(e) => setForm((prev) => ({ ...prev, footer: { ...prev.footer, tagline: e.target.value } }))}
            />
          </Field>
          <RepeatableList
            items={form.footer.legalLinks || []}
            onChange={(legalLinks) => setForm((prev) => ({ ...prev, footer: { ...prev.footer, legalLinks } }))}
            fields={[
              { name: "label", label: "Label", type: "text", placeholder: "Privacy" },
              { name: "to", label: "Path", type: "text", placeholder: "/privacy" }
            ]}
            newItem={() => ({ label: "", to: "" })}
            itemTitle={(item) => item.label || "Legal link"}
            addLabel="Add legal link"
            columns={2}
          />
        </div>
      </SectionCard>

      <SectionCard title="Social links">
        <RepeatableList
          items={form.socials}
          onChange={(socials) => setForm((prev) => ({ ...prev, socials }))}
          fields={[
            { name: "platform", label: "Platform", type: "text", placeholder: "linkedin" },
            { name: "label", label: "Label", type: "text" },
            { name: "href", label: "URL", type: "text", full: true }
          ]}
          newItem={() => ({ platform: "", label: "", href: "" })}
          itemTitle={(item) => item.label || item.platform || "Social link"}
          addLabel="Add social link"
          columns={2}
        />
      </SectionCard>
    </div>
  );
};

export default AdminNavigation;
