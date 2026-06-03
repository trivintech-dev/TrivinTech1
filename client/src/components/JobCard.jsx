import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, MapPin, Sparkles } from "lucide-react";

const JobCard = ({ job }) => {
  const roleTypeStyles = {
    "Full-time": "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    "Part-time": "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200",
    Contract: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    Internship: "border-sky-400/20 bg-sky-400/10 text-sky-200"
  };

  return (
    <Link
      to={`/jobs/${job._id}`}
      className="group job-card relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/6 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(2,8,20,0.4)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/12 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-70" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            Open role
          </div>
          <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{job.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className={`rounded-full border px-3 py-1 ${roleTypeStyles[job.type] || "border-brand/20 bg-brand/10 text-brand"}`}>
              {job.type || "Full-time"}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-400">
              {job.salaryRange || "Market"}
            </span>
          </div>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/20 via-white/10 to-transparent text-brand transition duration-300 group-hover:scale-105 group-hover:border-brand/40">
          <ArrowRight className="h-5 w-5 transition duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>

      <p className="relative mt-5 text-sm leading-6 text-gray-500">
        {job.description || "A growth-focused role for someone who wants to build meaningful work with a modern team."}
      </p>

      <div className="relative mt-6 flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="h-4 w-4 text-brand/80" />
          <span>{job.location || "Remote"}</span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition duration-300 group-hover:bg-brand/15">
          <Sparkles className="h-3.5 w-3.5" />
          View role
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
