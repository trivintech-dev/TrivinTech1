import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, FileQuestion, Save } from "lucide-react";
import api from "../api/api.js";
import { emptySingleFromFields, PAGE_LIST, PAGE_SCHEMAS } from "../admin/pageSchemas.js";
import RepeatableList from "../components/admin/RepeatableList.jsx";
import { useToast } from "../components/admin/ToastProvider.jsx";
import {
  Button,
  EmptyState,
  Field,
  IconButton,
  Input,
  PageHeader,
  SectionCard,
  Spinner,
  Textarea,
  Toggle
} from "../components/admin/AdminUI.jsx";

const SectionField = ({ field, value, onChange }) => {
  if (field.type === "textarea") {
    return (
      <Field label={field.label} hint={field.hint}>
        <Textarea
          rows={field.rows || 3}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </Field>
    );
  }

  if (field.type === "list") {
    const asText = Array.isArray(value) ? value.join("\n") : value ?? "";
    return (
      <Field label={field.label} hint={field.hint || "One item per line"}>
        <Textarea
          rows={field.rows || 3}
          value={asText}
          placeholder={field.placeholder}
          onChange={(event) =>
            onChange(
              event.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            )
          }
        />
      </Field>
    );
  }

  if (field.type === "number") {
    return (
      <Field label={field.label} hint={field.hint}>
        <Input
          type="number"
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
        />
      </Field>
    );
  }

  if (field.type === "toggle") {
    return <Toggle checked={Boolean(value)} onChange={onChange} label={field.label} description={field.hint} />;
  }

  return (
    <Field label={field.label} hint={field.hint}>
      <Input
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
};

const SingleSectionForm = ({ fields, value, onChange }) => {
  const data = value && typeof value === "object" ? value : {};

  const setField = (name, next) => {
    onChange({ ...data, [name]: next });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className={field.full ? "sm:col-span-2" : ""}>
          <SectionField field={field} value={data[field.name]} onChange={(next) => setField(field.name, next)} />
        </div>
      ))}
    </div>
  );
};

const AdminPageEditor = () => {
  const { page: pageSlug } = useParams();
  const page = (pageSlug || "").toLowerCase();
  const schema = PAGE_SCHEMAS[page];
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState({});
  const [openKey, setOpenKey] = useState(null);
  const [savingKey, setSavingKey] = useState(null);
  const [savingAll, setSavingAll] = useState(false);

  const pageMeta = useMemo(() => PAGE_LIST.find((entry) => entry.slug === page), [page]);

  const buildDefaults = useCallback(() => {
    if (!schema) return {};
    return schema.sections.reduce((acc, section) => {
      acc[section.key] = section.kind === "list" ? [] : emptySingleFromFields(section.fields);
      return acc;
    }, {});
  }, [schema]);

  useEffect(() => {
    if (!schema) {
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/content/admin/all", { params: { page } });
        const defaults = buildDefaults();
        (data.sections || []).forEach((doc) => {
          defaults[doc.section] = doc.kind === "list" ? doc.items || [] : doc.content || {};
        });
        if (!cancelled) {
          setSections(defaults);
          setOpenKey(schema.sections[0]?.key || null);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error?.response?.data?.message || "Failed to load page content");
          setSections(buildDefaults());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [page, schema, buildDefaults, toast]);

  const saveSection = async (sectionDef) => {
    setSavingKey(sectionDef.key);
    try {
      const payload = {
        page,
        section: sectionDef.key,
        label: sectionDef.label,
        kind: sectionDef.kind
      };
      if (sectionDef.kind === "list") {
        payload.items = sections[sectionDef.key] || [];
      } else {
        payload.content = sections[sectionDef.key] || {};
      }
      await api.post("/content", payload);
      toast.success(`${sectionDef.label} saved`);
    } catch (error) {
      toast.error(error?.response?.data?.message || `Failed to save ${sectionDef.label}`);
    } finally {
      setSavingKey(null);
    }
  };

  const saveAll = async () => {
    if (!schema) return;
    setSavingAll(true);
    try {
      for (const sectionDef of schema.sections) {
        const payload = {
          page,
          section: sectionDef.key,
          label: sectionDef.label,
          kind: sectionDef.kind
        };
        if (sectionDef.kind === "list") {
          payload.items = sections[sectionDef.key] || [];
        } else {
          payload.content = sections[sectionDef.key] || {};
        }
        await api.post("/content", payload);
      }
      toast.success("All sections saved");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save all sections");
    } finally {
      setSavingAll(false);
    }
  };

  if (!schema) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="Unknown page"
        description="Pick a page from Website Pages in the sidebar or dashboard."
        action={
          <Button as={Link} to="/admin" variant="outline">
            Back to dashboard
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={schema.label}
        description={schema.description}
        breadcrumb={
          <span>
            Website Pages /{" "}
            {pageMeta ? (
              <a href={pageMeta.path} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300">
                {pageMeta.path}
              </a>
            ) : (
              page
            )}
          </span>
        }
        actions={
          <Button icon={Save} loading={savingAll} onClick={saveAll} type="button">
            Save all sections
          </Button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-400">
          <Spinner /> Loading sections...
        </div>
      ) : (
        <div className="space-y-4">
          {schema.sections.map((sectionDef) => {
            const isOpen = openKey === sectionDef.key;
            return (
              <SectionCard
                key={sectionDef.key}
                title={sectionDef.label}
                description={sectionDef.kind === "list" ? "Repeatable list section" : "Single content block"}
                actions={
                  <>
                    <IconButton
                      icon={ChevronDown}
                      label={isOpen ? "Collapse section" : "Expand section"}
                      onClick={() => setOpenKey(isOpen ? null : sectionDef.key)}
                      className={isOpen ? "rotate-180" : ""}
                    />
                    {isOpen ? (
                      <Button
                        size="sm"
                        variant="outline"
                        icon={Save}
                        loading={savingKey === sectionDef.key}
                        onClick={() => saveSection(sectionDef)}
                        type="button"
                      >
                        Save section
                      </Button>
                    ) : null}
                  </>
                }
              >
                {isOpen ? (
                  sectionDef.kind === "list" ? (
                    <RepeatableList
                      items={sections[sectionDef.key] || []}
                      onChange={(next) => setSections((prev) => ({ ...prev, [sectionDef.key]: next }))}
                      fields={sectionDef.fields}
                      newItem={sectionDef.newItem}
                      itemTitle={sectionDef.itemTitle}
                      columns={sectionDef.columns || 2}
                      addLabel={`Add ${sectionDef.label.toLowerCase().replace(/s$/, "")}`}
                    />
                  ) : (
                    <SingleSectionForm
                      fields={sectionDef.fields}
                      value={sections[sectionDef.key]}
                      onChange={(next) => setSections((prev) => ({ ...prev, [sectionDef.key]: next }))}
                    />
                  )
                ) : (
                  <p className="text-sm text-slate-500">Expand to edit this section.</p>
                )}
              </SectionCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPageEditor;
