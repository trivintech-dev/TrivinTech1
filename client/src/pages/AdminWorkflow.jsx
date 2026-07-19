import { useState } from "react";
import { GitBranch, Plus, Pencil, Trash2 } from "lucide-react";
import DataTable from "../components/admin/DataTable.jsx";
import useAdminResource from "../hooks/useAdminResource.js";
import {
  Badge,
  Button,
  ConfirmDialog,
  Field,
  IconButton,
  Input,
  Modal,
  PageHeader,
  Textarea,
  Toggle
} from "../components/admin/AdminUI.jsx";

const linesToArray = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const arrayToLines = (value) => (Array.isArray(value) ? value.join("\n") : "");

const emptyForm = {
  step: "",
  title: "",
  summary: "",
  duration: "",
  highlights: "",
  order: 0,
  isActive: true
};

const AdminWorkflow = () => {
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/workflow-steps",
    listKey: "workflowSteps",
    query: "all=true"
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      step: row.step || "",
      title: row.title || "",
      summary: row.summary || "",
      duration: row.duration || "",
      highlights: arrayToLines(row.highlights),
      order: row.order ?? 0,
      isActive: row.isActive ?? true
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const buildPayload = () => ({
    step: form.step,
    title: form.title,
    summary: form.summary,
    duration: form.duration,
    order: Number(form.order) || 0,
    isActive: form.isActive,
    highlights: linesToArray(form.highlights)
  });

  const handleSave = async () => {
    const payload = buildPayload();
    const ok = editing ? await updateItem(editing._id, payload) : await createItem(payload);
    if (ok) closeModal();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const ok = await deleteItem(deleteTarget._id);
    if (ok) setDeleteTarget(null);
  };

  const columns = [
    {
      key: "step",
      header: "Step",
      render: (row) => <span className="font-mono text-xs text-cyan-400">{row.step}</span>
    },
    { key: "title", header: "Title", render: (row) => <span className="font-medium text-white">{row.title}</span> },
    { key: "duration", header: "Duration" },
    { key: "order", header: "Order" },
    {
      key: "isActive",
      header: "Status",
      render: (row) => (
        <Badge tone={row.isActive ? "green" : "red"}>{row.isActive ? "Active" : "Inactive"}</Badge>
      )
    },
    {
      key: "actions",
      header: "",
      headerClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-1">
          <IconButton icon={Pencil} label="Edit" onClick={() => openEdit(row)} />
          <IconButton icon={Trash2} label="Delete" className="hover:text-red-300" onClick={() => setDeleteTarget(row)} />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workflow steps"
        description="Development process cards on the home page."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add step
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["step", "title", "summary"]}
        searchPlaceholder="Search workflow steps..."
        emptyIcon={GitBranch}
        emptyTitle="No workflow steps"
        emptyDescription="Add steps to explain your delivery process."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add step
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit workflow step" : "Add workflow step"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create step"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Step code" required>
            <Input value={form.step} onChange={(e) => setForm((p) => ({ ...p, step: e.target.value }))} placeholder="01" required />
          </Field>
          <Field label="Title" required>
            <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          </Field>
          <Field label="Duration">
            <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} />
          </Field>
          <Field label="Order">
            <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} />
          </Field>
          <Field label="Summary" required className="sm:col-span-2">
            <Textarea rows={3} value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} required />
          </Field>
          <Field label="Highlights" hint="One highlight per line" className="sm:col-span-2">
            <Textarea rows={4} value={form.highlights} onChange={(e) => setForm((p) => ({ ...p, highlights: e.target.value }))} />
          </Field>
          <div className="sm:col-span-2">
            <Toggle label="Active on home page" checked={form.isActive} onChange={(isActive) => setForm((p) => ({ ...p, isActive }))} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete workflow step?"
        message={`Remove "${deleteTarget?.title || "this step"}"? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminWorkflow;
