import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import api from "../api/api.js";
import { useToast } from "../components/admin/ToastProvider.jsx";
import { Button, Card, Field, Input, PageHeader, SectionCard, Spinner, Textarea } from "../components/admin/AdminUI.jsx";

const emptySettings = {
  brand: { name: "", tagline: "", logoUrl: "" },
  contact: {
    phone: "",
    email: "",
    investorEmail: "",
    address: "",
    workingHours: "",
    mapEmbedUrl: ""
  }
};

const AdminSettings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptySettings);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/settings");
        const settings = data.settings || {};
        setForm({
          brand: { ...emptySettings.brand, ...settings.brand },
          contact: { ...emptySettings.contact, ...settings.contact }
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const updateBrand = (field, value) => {
    setForm((prev) => ({ ...prev, brand: { ...prev.brand, [field]: value } }));
  };

  const updateContact = (field, value) => {
    setForm((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put("/settings", {
        brand: form.brand,
        contact: form.contact
      });
      const settings = data.settings || {};
      setForm({
        brand: { ...emptySettings.brand, ...settings.brand },
        contact: { ...emptySettings.contact, ...settings.contact }
      });
      toast.success("Site settings saved");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-400">
        <Spinner /> Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site settings"
        description="Brand identity and global contact details used across the public site."
        actions={
          <Button icon={Save} loading={saving} onClick={handleSave} type="button">
            Save settings
          </Button>
        }
      />

      <SectionCard title="Brand">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name">
            <Input value={form.brand.name} onChange={(e) => updateBrand("name", e.target.value)} />
          </Field>
          <Field label="Logo URL">
            <Input value={form.brand.logoUrl} onChange={(e) => updateBrand("logoUrl", e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Tagline" className="sm:col-span-2">
            <Textarea rows={2} value={form.brand.tagline} onChange={(e) => updateBrand("tagline", e.target.value)} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <Input value={form.contact.phone} onChange={(e) => updateContact("phone", e.target.value)} />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.contact.email} onChange={(e) => updateContact("email", e.target.value)} />
          </Field>
          <Field label="Investor email">
            <Input
              type="email"
              value={form.contact.investorEmail}
              onChange={(e) => updateContact("investorEmail", e.target.value)}
            />
          </Field>
          <Field label="Working hours">
            <Input value={form.contact.workingHours} onChange={(e) => updateContact("workingHours", e.target.value)} />
          </Field>
          <Field label="Address" className="sm:col-span-2">
            <Textarea rows={2} value={form.contact.address} onChange={(e) => updateContact("address", e.target.value)} />
          </Field>
          <Field label="Map embed URL" className="sm:col-span-2" hint="Google Maps embed URL for the contact page">
            <Input value={form.contact.mapEmbedUrl} onChange={(e) => updateContact("mapEmbedUrl", e.target.value)} />
          </Field>
        </div>
      </SectionCard>

      <Card className="border-dashed p-4 text-sm text-slate-500">
        Navigation links, footer columns, and social profiles are managed under{" "}
        <span className="text-slate-300">Navigation &amp; Footer</span>.
      </Card>
    </div>
  );
};

export default AdminSettings;
