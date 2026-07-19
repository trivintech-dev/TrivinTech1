import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Loader2, X } from "lucide-react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const buttonVariants = {
  primary:
    "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-400",
  outline: "border border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-700/70 hover:text-white",
  ghost: "text-slate-300 hover:bg-slate-800/70 hover:text-white",
  danger: "bg-red-500/90 text-white hover:bg-red-500",
  subtle: "bg-slate-800 text-slate-200 hover:bg-slate-700"
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm"
};

export const Button = ({
  as = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  children,
  ...props
}) => {
  const classes = cx(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60",
    buttonVariants[variant] || buttonVariants.primary,
    buttonSizes[size] || buttonSizes.md,
    className
  );

  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </>
  );

  if (as === "link") {
    return (
      <Link className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};

export const IconButton = ({ icon: Icon, label, className = "", ...props }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={cx(
      "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 transition hover:bg-slate-700 hover:text-white",
      className
    )}
    {...props}
  >
    <Icon className="h-4 w-4" />
  </button>
);

export const Card = ({ className = "", children, ...props }) => (
  <div
    className={cx("rounded-2xl border border-slate-700/70 bg-slate-800/50 shadow-lg shadow-black/10", className)}
    {...props}
  >
    {children}
  </div>
);

export const SectionCard = ({ title, description, actions, className = "", children }) => (
  <Card className={cx("p-6", className)}>
    {(title || actions) && (
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          {title && <h3 className="text-base font-semibold text-white">{title}</h3>}
          {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    )}
    {children}
  </Card>
);

export const Badge = ({ tone = "slate", children, className = "" }) => {
  const tones = {
    slate: "border-slate-600 bg-slate-700/50 text-slate-300",
    green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    red: "border-red-500/40 bg-red-500/10 text-red-300",
    cyan: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    violet: "border-violet-500/40 bg-violet-500/10 text-violet-300"
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        tones[tone] || tones.slate,
        className
      )}
    >
      {children}
    </span>
  );
};

export const Field = ({ label, hint, required, className = "", children }) => (
  <label className={cx("block", className)}>
    {label && (
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="ml-0.5 text-cyan-400">*</span>}
      </span>
    )}
    {children}
    {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
  </label>
);

const controlClasses =
  "w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20";

export const Input = ({ className = "", ...props }) => (
  <input className={cx(controlClasses, className)} {...props} />
);

export const Textarea = ({ className = "", rows = 4, ...props }) => (
  <textarea rows={rows} className={cx(controlClasses, "resize-y", className)} {...props} />
);

export const Select = ({ className = "", children, ...props }) => (
  <select className={cx(controlClasses, "appearance-none", className)} {...props}>
    {children}
  </select>
);

export const Toggle = ({ checked, onChange, label, description }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2.5 text-left"
  >
    <span>
      {label && <span className="block text-sm font-medium text-slate-200">{label}</span>}
      {description && <span className="block text-xs text-slate-500">{description}</span>}
    </span>
    <span
      className={cx(
        "relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition",
        checked ? "bg-cyan-500" : "bg-slate-600"
      )}
    >
      <span
        className={cx(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </span>
  </button>
);

export const Spinner = ({ className = "" }) => (
  <Loader2 className={cx("h-5 w-5 animate-spin text-cyan-400", className)} />
);

export const PageHeader = ({ title, description, breadcrumb, actions }) => (
  <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {breadcrumb && <div className="mb-2 text-xs font-medium text-slate-500">{breadcrumb}</div>}
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {description && <p className="mt-1 max-w-2xl text-sm text-slate-400">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 px-6 py-14 text-center">
    {Icon && (
      <div className="mb-4 rounded-full bg-slate-800 p-4">
        <Icon className="h-7 w-7 text-cyan-400" />
      </div>
    )}
    <h3 className="text-base font-semibold text-white">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-slate-400">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const StatCard = ({ label, value, hint, icon: Icon, tone = "cyan" }) => {
  const tones = {
    cyan: "from-cyan-500/20 to-blue-500/20 text-cyan-400",
    green: "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
    violet: "from-violet-500/20 to-violet-500/5 text-violet-400",
    amber: "from-amber-500/20 to-amber-500/5 text-amber-400"
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
        {Icon && (
          <div className={cx("rounded-lg bg-gradient-to-br p-3", tones[tone] || tones.cyan)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  );
};

export const Modal = ({ open, onClose, title, description, children, footer, size = "md" }) => {
  useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cx(
          "relative z-10 my-8 w-full rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50",
          sizes[size] || sizes.md
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 border-t border-slate-800 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
};

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  loading = false
}) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    size="sm"
    footer={
      <>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </>
    }
  >
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-red-500/10 p-2">
        <AlertTriangle className="h-5 w-5 text-red-400" />
      </div>
      <p className="text-sm text-slate-300">{message || "This action cannot be undone."}</p>
    </div>
  </Modal>
);

export { cx };
