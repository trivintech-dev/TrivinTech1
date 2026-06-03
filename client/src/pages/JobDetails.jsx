import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const JobDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ coverLetter: "", resumeUrl: "" });

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data.job);
    };

    fetchJob();
  }, [id]);

  const handleApply = async (event) => {
    event.preventDefault();
    await api.post(`/jobs/${id}/apply`, form);
    setForm({ coverLetter: "", resumeUrl: "" });
  };

  if (!job) {
    return <div className="py-12 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="font-heading text-3xl font-semibold">{job.title}</h1>
        <p className="mt-2 text-gray-600">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{job.location || "Remote"}</span>
          <span>{job.type || "Full-time"}</span>
          <span className="font-semibold text-brand">{job.salaryRange || "Market"}</span>
        </div>
      </div>

      {token ? (
        <form className="rounded-3xl border border-gray-100 bg-white p-6" onSubmit={handleApply}>
          <h2 className="font-heading text-xl font-semibold">Apply for this job</h2>
          <label className="mt-4 block text-sm">Cover letter</label>
          <textarea
            value={form.coverLetter}
            onChange={(event) => setForm((prev) => ({ ...prev, coverLetter: event.target.value }))}
            className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
            rows="4"
          />
          <label className="mt-4 block text-sm">Resume URL</label>
          <input
            value={form.resumeUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, resumeUrl: event.target.value }))}
            className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2"
            placeholder="https://"
          />
          <button type="submit" className="button-primary mt-4 w-full">
            Submit application
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-600">Login to apply for this job.</p>
      )}
    </div>
  );
};

export default JobDetails;
