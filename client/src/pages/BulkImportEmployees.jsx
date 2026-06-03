import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const BulkImportEmployees = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please select a CSV file");
      return;
    }

    setError("");
    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = (csvFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result;
      const lines = csv.split("\n");
      const headers = lines[0].split(",").map((h) => h.trim());

      const rows = [];
      for (let i = 1; i < Math.min(lines.length, 6); i++) {
        if (!lines[i].trim()) continue;
        const values = lines[i].split(",").map((v) => v.trim());
        const row = {};
        headers.forEach((header, idx) => {
          row[header] = values[idx] || "";
        });
        rows.push(row);
      }

      setPreview(rows);
    };
    reader.readAsText(csvFile);
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setImporting(true);
    setError("");
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csv = e.target?.result;
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());

        const employees = [];
        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          try {
            const values = lines[i].split(",").map((v) => v.trim());
            const employee = {};

            headers.forEach((header, idx) => {
              const value = values[idx] || "";
              if (header === "experience" || header === "ticketsResolved") {
                employee[header] = parseInt(value) || 0;
              } else if (header === "skills") {
                employee[header] = value ? value.split("|").map((s) => s.trim()) : [];
              } else if (header === "email") {
                employee[header] = value.toLowerCase();
              } else {
                employee[header] = value;
              }
            });

            if (!employee.name || !employee.email || !employee.designation) {
              errorCount++;
              errors.push(`Row ${i + 1}: Missing required fields (name, email, designation)`);
              continue;
            }

            // Attempt to create employee
            await api.post("/employees", employee);
            successCount++;
            employees.push(employee);
          } catch (err) {
            errorCount++;
            errors.push(`Row ${i + 1}: ${err.response?.data?.message || "Failed to create employee"}`);
          }
        }

        setResult({
          total: employees.length + errorCount,
          success: successCount,
          failed: errorCount,
          errors
        });
        setImporting(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError(err.message || "Failed to import file");
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 md:pt-40">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <Link to="/admin/employees" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Employees
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-white">Bulk Import Employees</h1>
          <p className="mt-2 text-sm text-slate-300">Upload a CSV file to create multiple employees at once</p>
        </div>

        {/* Instructions */}
        <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white">CSV Format Guide</h2>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-slate-300">
              Your CSV file should include the following columns (comma-separated):
            </p>
            <div className="rounded-2xl bg-slate-700 p-4 font-mono text-sm text-slate-300 overflow-x-auto">
              name, email, phone, designation, department, employmentType, experience, skills, joiningDate
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Required fields:</p>
              <ul className="ml-4 space-y-1 text-sm text-slate-300">
                <li>• <strong>name</strong> - Employee full name</li>
                <li>• <strong>email</strong> - Unique email address</li>
                <li>• <strong>designation</strong> - Developer, Intern, Manager, UI/UX Designer, Technical Support Executive, HR, Sales</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Optional fields:</p>
              <ul className="ml-4 space-y-1 text-sm text-slate-300">
                <li>• <strong>phone</strong> - Contact number</li>
                <li>• <strong>department</strong> - Department name</li>
                <li>• <strong>employmentType</strong> - Full-time, Part-time, Contract, Intern</li>
                <li>• <strong>experience</strong> - Years as number</li>
                <li>• <strong>skills</strong> - Separate multiple with pipes (|)</li>
                <li>• <strong>joiningDate</strong> - YYYY-MM-DD format</li>
              </ul>
            </div>
          </div>
        </section>

        {/* File Upload */}
        <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white">Select CSV File</h2>
          <div className="mt-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl border-2 border-dashed border-cyan-500 bg-cyan-500/10 p-8 text-center cursor-pointer transition hover:border-cyan-400 hover:bg-cyan-500/20"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <svg className="mx-auto h-12 w-12 text-cyan-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M32 4v12m0 0l-3-3m3 3l3-3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm font-semibold text-cyan-200">
                {file ? file.name : "Click to select CSV file"}
              </p>
              <p className="mt-1 text-xs text-cyan-300">or drag and drop</p>
            </div>
          </div>
        </section>

        {/* Preview */}
        {preview.length > 0 && (
          <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Preview</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    {Object.keys(preview[0]).map((key) => (
                      <th key={key} className="px-4 py-2 text-left font-semibold text-white">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {preview.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((value, vidx) => (
                        <td key={vidx} className="px-4 py-2 text-slate-300">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {preview.length < 5 && (
                <p className="mt-2 text-xs text-slate-400">
                  Showing {preview.length} of total rows in your file
                </p>
              )}
            </div>
          </section>
        )}

        {error && <div className="rounded-3xl border border-red-900 bg-red-950 p-4 text-red-300">{error}</div>}

        {result && (
          <section className="rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Import Results</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-blue-500/10 border border-blue-500/30 p-4">
                <p className="text-sm text-slate-400">Total Rows</p>
                <p className="mt-2 text-3xl font-semibold text-blue-400">{result.total}</p>
              </div>
              <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-4">
                <p className="text-sm text-slate-400">Successfully Imported</p>
                <p className="mt-2 text-3xl font-semibold text-green-400">{result.success}</p>
              </div>
              <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4">
                <p className="text-sm text-slate-400">Failed</p>
                <p className="mt-2 text-3xl font-semibold text-red-400">{result.failed}</p>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="font-semibold text-slate-900">Errors:</p>
                <div className="max-h-40 overflow-y-auto space-y-1 rounded-2xl bg-red-50 p-4">
                  {result.errors.map((err, idx) => (
                    <p key={idx} className="text-sm text-red-700">
                      {err}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleImport}
            disabled={!file || importing}
            className="rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {importing ? "Importing..." : "Import Employees"}
          </button>
          <Link
            to="/admin/employees"
            className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Employees
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BulkImportEmployees;
