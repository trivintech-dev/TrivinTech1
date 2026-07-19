import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

const ToastContext = createContext(null);

const toastStyles = {
  success: { icon: CheckCircle2, ring: "border-emerald-500/40", accent: "text-emerald-400" },
  error: { icon: XCircle, ring: "border-red-500/40", accent: "text-red-400" },
  info: { icon: Info, ring: "border-cyan-500/40", accent: "text-cyan-400" }
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (type, message) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, type, message }]);
      setTimeout(() => remove(id), 4200);
    },
    [remove]
  );

  const value = useMemo(
    () => ({
      success: (message) => push("success", message),
      error: (message) => push("error", message),
      info: (message) => push("info", message)
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[120] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => {
          const config = toastStyles[toast.type] || toastStyles.info;
          const Icon = config.icon;
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${config.ring} bg-slate-900/95 p-4 shadow-2xl shadow-black/40 backdrop-blur`}
            >
              <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${config.accent}`} />
              <p className="flex-1 text-sm text-slate-100">{toast.message}</p>
              <button
                type="button"
                onClick={() => remove(toast.id)}
                className="text-slate-500 transition hover:text-white"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return { success: () => {}, error: () => {}, info: () => {} };
  }
  return context;
};
