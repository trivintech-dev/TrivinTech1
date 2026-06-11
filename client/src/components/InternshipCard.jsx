import { BookOpen, MapPin, Sparkles } from "lucide-react";

const InternshipCard = ({ internship, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/6 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_rgba(2,8,20,0.4)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/12 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-70" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
            <BookOpen className="h-3.5 w-3.5" />
            Internship
          </div>
          <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{internship.role}</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-400">
              {internship.duration}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-400">
              {internship.stipend}
            </span>
          </div>
        </div>
      </div>

      <p className="relative mt-5 text-sm leading-6 text-gray-500">
        {internship.description || "Early-stage learning opportunity to grow your skills and contribute to real projects."}
      </p>

      <div className="relative mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <BookOpen className="h-4 w-4 text-brand/80" />
          <span><strong>Eligibility:</strong> {internship.eligibility}</span>
        </div>
        
        {isAdmin ? (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(internship)}
              className="flex-1 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-semibold uppercase text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(internship._id)}
              className="flex-1 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs font-semibold uppercase text-red-300 transition hover:bg-red-400/20"
            >
              Delete
            </button>
          </div>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition duration-300 group-hover:bg-brand/15 w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            Learn more
          </span>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;
