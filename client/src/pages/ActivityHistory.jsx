import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const ActivityHistory = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get("/users/me/activity");
        setActivities(data.activities || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load activity history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen space-y-6 bg-white pt-40 md:pt-48">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-600">Activity History</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Full activity timeline</h1>
              <p className="mt-2 text-sm text-slate-700">View every recorded action with device and location metadata.</p>
            </div>
            <Link
              to="/profile"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-slate-50"
            >
              Back to profile
            </Link>
          </div>
        </div>

        <section className="space-y-4">
          {loading ? (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 text-slate-700 shadow-sm">Loading activity history…</div>
          ) : error ? (
            <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-red-700 shadow-sm">{error}</div>
          ) : activities.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 text-slate-700 shadow-sm">No activity history available.</div>
          ) : (
            activities.map((event) => (
              <article key={event._id} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{event.description}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-700">{event.type.replace(/_/g, " ")}</p>
                  </div>
                  <p className="text-sm text-slate-700">{new Date(event.createdAt).toLocaleString()}</p>
                </div>

                {event.metadata && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {event.metadata.ip && (
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">IP address</p>
                        <p className="mt-2 text-sm font-medium text-slate-900">{event.metadata.ip}</p>
                      </div>
                    )}
                    {event.metadata.userAgent && (
                      <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">Device / Browser</p>
                        <p className="mt-2 text-sm font-medium text-slate-900 break-words">{event.metadata.userAgent}</p>
                      </div>
                    )}
                    {event.metadata.fields && (
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">Updated fields</p>
                        <p className="mt-2 text-sm font-medium text-slate-900">{event.metadata.fields.join(", ")}</p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default ActivityHistory;
