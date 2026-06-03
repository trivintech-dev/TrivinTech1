import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [editing, setEditing] = useState(null);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/queries");
        setQueries(data.queries);
      } catch (err) {
        // ignore
      }
    };

    load();
  }, []);

  const handleRespond = (q) => {
    setEditing(q._id);
    setResponseText(q.response || "");
  };

  const submitResponse = async (id) => {
    try {
      const { data } = await api.post(`/queries/${id}/response`, { response: responseText });
      setQueries((s) => s.map((q) => (q._id === id ? data.query : q)));
      setEditing(null);
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <Link to="/admin" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Dashboard
          </Link>
          <h2 className="mt-4 font-heading text-2xl font-semibold text-white">User Queries</h2>
          <p className="mt-2 text-sm text-slate-300">Manage and respond to user inquiries</p>
        </div>
        <div className="space-y-4">
          {queries.map((q) => (
            <div key={q._id} className="rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{q.subject}</div>
                  <div className="text-sm text-slate-400">From: {q.user?.name || q.user?.email || "—"}</div>
                </div>
                <div className="text-sm text-slate-500">{q.status}</div>
              </div>
              <p className="mt-2 text-slate-300">{q.message}</p>

              {editing === q._id ? (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={4}
                    className="block w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => submitResponse(q._id)} className="button-primary">
                      Save response
                    </button>
                    <button onClick={() => setEditing(null)} className="button-outline">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-3">
                  {q.response && <div className="text-sm text-slate-300">Response: {q.response}</div>}
                  <button onClick={() => handleRespond(q)} className="text-sm text-cyan-400 hover:text-cyan-300">
                    {q.response ? "Edit response" : "Respond"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminQueries;
