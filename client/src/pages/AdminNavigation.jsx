import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import api from "../api/api.js";
import RepeatableList from "../components/admin/RepeatableList.jsx";
import { useToast } from "../components/admin/ToastProvider.jsx";
import { Button, Field, Input, PageHeader, SectionCard, Spinner, Textarea } from "../components/admin/AdminUI.jsx";

const emptyForm = {
  nav: [],
  socials: [],
  footer: {
    tagline: "",
    legalText: "",
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
            columns: settings.footer?.columns || []
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
      const { data } = await api.put("/settings", {
        nav: form.nav,
        socials: form.socials,
        footer: form.footer
      });
      const settings = data.settings || {};
      setForm({
        nav: settings.nav || [],
        socials: settings.socials || [],
        footer: {
          tagline: settings.footer?.tagline || "",
          legalText: settings.footer?.legalText || "",
          columns: settings.footer?.columns || []
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

      <SectionCard title="Footer columns">
        <RepeatableList
          items={form.footer.columns}
          onChange={(columns) => setForm((prev) => ({ ...prev, footer: { ...prev.footer, columns } }))}
          fields={[
            { name: "title", label: "Column title", type: "text" },
            { name: "items", label: "Links", type: "list", full: true }
          ]}
          newItem={() => ({ title: "", items: [] })}
          itemTitle={(item) => item.title || "Column"}
          addLabel="Add column"
          columns={1}
        />
      </SectionCard>

      <SectionCard title="Footer text">
        <div className="grid gap-4">
          <Field label="Footer tagline">
            <Textarea
              rows={2}
              value={form.footer.tagline}
              onChange={(e) => setForm((prev) => ({ ...prev, footer: { ...prev.footer, tagline: e.target.value } }))}
            />
          </Field>
          <Field label="Legal text">
            <Input
              value={form.footer.legalText}
              onChange={(e) => setForm((prev) => ({ ...prev, footer: { ...prev.footer, legalText: e.target.value } }))}
              placeholder="Privacy · Terms"
            />
          </Field>
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
