import { useCallback, useEffect, useState } from "react";
import { Inbox, MessageSquare, Trash2 } from "lucide-react";
import api from "../api/api.js";
import DataTable from "../components/admin/DataTable.jsx";
import { useToast } from "../components/admin/ToastProvider.jsx";
import {
  Badge,
  Button,
  ConfirmDialog,
  Field,
  Modal,
  PageHeader,
  Textarea
} from "../components/admin/AdminUI.jsx";

const statusTone = (status) => {
  if (status === "responded") return "green";
  return "amber";
};

const AdminContacts = () => {
  const toast = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [responding, setResponding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/contacts");
      setContacts(data.contactRequests || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contact requests");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const openRespond = (row) => {
    setSelected(row);
    setResponseText(row.response || "");
  };

  const submitResponse = async () => {
    if (!selected) return;
    setResponding(true);
    try {
      const { data } = await api.post(`/contacts/${selected._id}/response`, { response: responseText });
      setContacts((current) => current.map((row) => (row._id === selected._id ? data.contactRequest : row)));
      toast.success("Response saved");
      setSelected(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send response");
    } finally {
      setResponding(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/contacts/${deleteTarget._id}`);
      setContacts((current) => current.filter((row) => row._id !== deleteTarget._id));
      toast.success("Contact request deleted");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete request");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <div>
          <p className="font-medium text-white">{row.subject}</p>
          <p className="text-xs text-slate-500">{row.serviceNeeded}</p>
        </div>
      )
    },
    {
      key: "fullName",
      header: "Contact",
      render: (row) => (
        <div>
          <p className="text-slate-200">{row.fullName}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <Badge tone={statusTone(row.status)}>{row.status || "open"}</Badge>
    },
    {
      key: "createdAt",
      header: "Received",
      render: (row) => (
        <span className="text-slate-400">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"}</span>
      )
    },
    {
      key: "actions",
      header: "",
      headerClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" icon={MessageSquare} onClick={() => openRespond(row)} type="button">
            {row.response ? "Edit" : "Respond"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={Trash2}
            onClick={() => setDeleteTarget(row)}
            type="button"
            className="text-red-300 hover:text-red-200"
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact requests"
        description="Inbound messages from the contact page and related forms."
      />

      <DataTable
        columns={columns}
        data={contacts}
        loading={loading}
        searchKeys={["subject", "fullName", "email", "companyName", "serviceNeeded"]}
        searchPlaceholder="Search requests..."
        emptyIcon={Inbox}
        emptyTitle="No contact requests"
        emptyDescription="New submissions from the contact page will appear here."
      />

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.subject || "Respond"}
        description={
          selected
            ? `${selected.fullName} · ${selected.email}${selected.phone ? ` · ${selected.phone}` : ""}`
            : undefined
        }
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)} disabled={responding}>
              Cancel
            </Button>
            <Button loading={responding} onClick={submitResponse} type="button">
              Save response
            </Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-300">
              <p className="whitespace-pre-wrap">{selected.message}</p>
              {selected.budgetRange ? (
                <p className="mt-3 text-xs text-slate-500">Budget: {selected.budgetRange}</p>
              ) : null}
            </div>
            <Field label="Your response">
              <Textarea rows={5} value={responseText} onChange={(e) => setResponseText(e.target.value)} />
            </Field>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete contact request?"
        message={`Remove the request from ${deleteTarget?.fullName || "this contact"}? This cannot be undone.`}
      />
    </div>
  );
};

export default AdminContacts;
