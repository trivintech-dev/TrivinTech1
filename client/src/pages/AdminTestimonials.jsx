import { useState } from "react";
import { MessageSquareQuote, Plus, Pencil, Trash2, Star } from "lucide-react";
import DataTable from "../components/admin/DataTable.jsx";
import ImageUpload from "../components/admin/ImageUpload.jsx";
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
  Select,
  Textarea,
  Toggle
} from "../components/admin/AdminUI.jsx";

const emptyForm = {
  authorName: "",
  authorTitle: "",
  authorCompany: "",
  rating: 5,
  comment: "",
  avatarUrl: "",
  imagePublicId: "",
  order: 0,
  isActive: true
};

const AdminTestimonials = () => {
  const { items, loading, saving, deleting, createItem, updateItem, deleteItem } = useAdminResource({
    endpoint: "/testimonials",
    listKey: "testimonials",
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
      authorName: row.authorName || "",
      authorTitle: row.authorTitle || "",
      authorCompany: row.authorCompany || "",
      rating: row.rating ?? 5,
      comment: row.comment || "",
      avatarUrl: row.avatarUrl || "",
      imagePublicId: row.imagePublicId || "",
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

  const handleSave = async () => {
    const payload = {
      authorName: form.authorName,
      authorTitle: form.authorTitle,
      authorCompany: form.authorCompany,
      rating: Number(form.rating) || 5,
      comment: form.comment,
      avatarUrl: form.avatarUrl,
      imagePublicId: form.imagePublicId,
      order: Number(form.order) || 0,
      isActive: form.isActive
    };
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
      key: "authorName",
      header: "Author",
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.avatarUrl ? (
            <img src={row.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
          ) : null}
          <div>
            <p className="font-medium text-white">{row.authorName}</p>
            <p className="text-xs text-slate-500">
              {[row.authorTitle, row.authorCompany].filter(Boolean).join(" · ") || "—"}
            </p>
          </div>
        </div>
      )
    },
    {
      key: "rating",
      header: "Rating",
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-amber-300">
          <Star className="h-3.5 w-3.5 fill-current" />
          {row.rating}
        </span>
      )
    },
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
        title="Testimonials"
        description="Customer reviews and social proof."
        actions={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add testimonial
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchKeys={["authorName", "authorTitle", "authorCompany", "comment"]}
        searchPlaceholder="Search testimonials..."
        emptyIcon={MessageSquareQuote}
        emptyTitle="No testimonials"
        emptyDescription="Add client quotes to showcase on the site."
        emptyAction={
          <Button icon={Plus} onClick={openCreate} type="button">
            Add testimonial
          </Button>
        }
      />

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit testimonial" : "Add testimonial"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} disabled={saving} type="button">
              Cancel
            </Button>
            <Button loading={saving} onClick={handleSave} type="button">
              {editing ? "Save changes" : "Create testimonial"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Author name" required className="sm:col-span-2">
            <Input value={form.authorName} onChange={(e) => setForm((p) => ({ ...p, authorName: e.target.value }))} required />
          </Field>
          <Field label="Title">
            <Input value={form.authorTitle} onChange={(e) => setForm((p) => ({ ...p, authorTitle: e.target.value }))} />
          </Field>
          <Field label="Company">
            <Input value={form.authorCompany} onChange={(e) => setForm((p) => ({ ...p, authorCompany: e.target.value }))} />
          </Field>
          <Field label="Rating">
            <Select value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Display order">
            <Input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} />
          </Field>
          <Field label="Comment" required className="sm:col-span-2">
            <Textarea rows={4} value={form.comment} onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))} required />
          </Field>
          <div className="sm:col-span-2">
            <ImageUpload
              label="Avatar"
              uploadUrl="/testimonials/upload-image"
              value={form.avatarUrl}
              publicId={form.imagePublicId}
              onChange={({ imageUrl, imagePublicId }) =>
                setForm((p) => ({ ...p, avatarUrl: imageUrl, imagePublicId: imagePublicId || "" }))
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Toggle label="Active" checked={form.isActive} onChange={(isActive) => setForm((p) => ({ ...p, isActive }))} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete testimonial?"
        message={`Remove the testimonial from ${deleteTarget?.authorName || "this author"}? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminTestimonials;
