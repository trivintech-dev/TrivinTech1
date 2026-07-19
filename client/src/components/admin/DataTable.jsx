import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { EmptyState, Spinner, cx } from "./AdminUI.jsx";

const getValue = (row, key) => key.split(".").reduce((acc, part) => (acc == null ? acc : acc[part]), row);

const DataTable = ({
  columns,
  data = [],
  loading = false,
  keyField = "_id",
  searchKeys = [],
  searchPlaceholder = "Search...",
  pageSize = 8,
  emptyTitle = "Nothing here yet",
  emptyDescription = "Create your first entry to see it listed here.",
  emptyIcon,
  emptyAction,
  toolbar
}) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term || searchKeys.length === 0) return data;
    return data.filter((row) =>
      searchKeys.some((key) => String(getValue(row, key) ?? "").toLowerCase().includes(term))
    );
  }, [data, query, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">
      {(searchKeys.length > 0 || toolbar) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {searchKeys.length > 0 ? (
            <label className="relative flex w-full max-w-xs items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-2 pl-9 pr-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
          ) : (
            <span />
          )}
          {toolbar}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-800/40">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-400">
            <Spinner /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} action={emptyAction} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700/70 text-xs uppercase tracking-wider text-slate-500">
                  {columns.map((column) => (
                    <th key={column.key} className={cx("px-4 py-3 font-semibold", column.headerClassName)}>
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr
                    key={getValue(row, keyField)}
                    className="border-b border-slate-800/70 transition last:border-0 hover:bg-slate-800/40"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className={cx("px-4 py-3 align-middle text-slate-300", column.className)}>
                        {column.render ? column.render(row) : getValue(row, column.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && filtered.length > pageSize && (
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 transition hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <span className="text-slate-500">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 transition hover:bg-slate-800 disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
