import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, DollarSign } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <Link
      to={`/services/${service._id}`}
      className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              {service.category || "Service"}
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-snug mt-3">
              {service.title}
            </h3>
          </div>

          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/20 text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:from-cyan-400/30 group-hover:to-blue-500/30">
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-grow">
          {service.summary || service.description || "Professional service delivery with dedicated support."}
        </p>

        {/* Footer with Price and Details */}
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-slate-700/50">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Starting price</p>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-cyan-400" />
              <span className="text-xl font-bold text-white">{service.price || 0}</span>
            </div>
          </div>

          {/* View Details Button */}
          <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-300 transition-all duration-300 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 group-hover:border-cyan-400/50">
            View <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Background glow effect */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};

export default ServiceCard;
