import { useCallback, useEffect, useState } from "react";
import { HelpCircle, MessageSquare } from "lucide-react";
import api from "../api/api.js";
import DataTable from "../components/admin/DataTable.jsx";
import { useToast } from "../components/admin/ToastProvider.jsx";
import {
  Badge,
  Button,
  Field,
  Modal,
  PageHeader,
  Textarea
} from "../components/admin/AdminUI.jsx";

const statusTone = (status) => (status === "responded" ? "green" : "amber");

const AdminQueries = () => {
  const toast = useToast();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [responding, setResponding] = useState(false);

  const loadQueries = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/queries");
      setQueries(data.queries || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load queries");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadQueries();
  }, [loadQueries]);

  const openRespond = (row) => {
    setSelected(row);
    setResponseText(row.response || "");
  };

  const submitResponse = async () => {
    if (!selected) return;
    setResponding(true);
    try {
      const { data } = await api.post(`/queries/${selected._id}/response`, { response: responseText });
      setQueries((current) => current.map((row) => (row._id === selected._id ? data.query : row)));
      toast.success("Response saved");
      setSelected(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send response");
    } finally {
      setResponding(false);
    }
  };

  const columns = [
    {
      key: "subject",
      header: "Subject",
      render: (row) => <span className="font-medium text-white">{row.subject}</span>
    },
    {
      key: "user",
      header: "From",
      render: (row) => (
        <div>
          <p className="text-slate-200">{row.user?.name || "—"}</p>
          <p className="text-xs text-slate-500">{row.user?.email || ""}</p>
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
        <div className="flex justify-end">
          <Button size="sm" variant="outline" icon={MessageSquare} onClick={() => openRespond(row)} type="button">
            {row.response ? "Edit response" : "Respond"}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="User queries" description="Review and respond to logged-in user inquiries." />

      <DataTable
        columns={columns}
        data={queries}
        loading={loading}
        searchKeys={["subject", "message", "status"]}
        searchPlaceholder="Search queries..."
        emptyIcon={HelpCircle}
        emptyTitle="No queries yet"
        emptyDescription="User-submitted questions will appear here."
      />

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.subject || "Respond to query"}
        description={
          selected
            ? `${selected.user?.name || "User"}${selected.user?.email ? ` · ${selected.user.email}` : ""}`
            : undefined
        }
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)} disabled={responding} type="button">
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
            </div>
            {selected.response ? (
              <div className="rounded-lg border border-slate-700/50 bg-slate-900/30 p-3 text-sm text-slate-400">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Previous response</p>
                <p className="mt-2 whitespace-pre-wrap text-slate-300">{selected.response}</p>
              </div>
            ) : null}
            <Field label="Your response" required>
              <Textarea rows={5} value={responseText} onChange={(e) => setResponseText(e.target.value)} />
            </Field>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminQueries;
