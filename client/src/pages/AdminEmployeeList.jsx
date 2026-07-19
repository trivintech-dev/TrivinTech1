import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import api from "../api/api.js";
import DataTable from "../components/admin/DataTable.jsx";
import { Badge, Button, Card, PageHeader, Select } from "../components/admin/AdminUI.jsx";

const statusTone = (status) => {
  if (status === "Active") return "green";
  if (status === "On Leave") return "amber";
  return "red";
};

const AdminEmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/employees");
      setEmployees(data.employees || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete employee");
    }
  };

  const tableData = useMemo(() => {
    if (!filterDesignation) return employees;
    return employees.filter((emp) => emp.designation === filterDesignation);
  }, [employees, filterDesignation]);

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Employee",
        render: (emp) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <span className="text-sm font-semibold text-cyan-300">{emp.name?.charAt(0) || "?"}</span>
            </div>
            <div>
              <p className="font-medium text-white">{emp.name}</p>
              <p className="text-xs text-slate-500">{emp.employeeId}</p>
            </div>
          </div>
        )
      },
      { key: "email", header: "Email" },
      { key: "designation", header: "Designation", render: (emp) => emp.designation || "N/A" },
      { key: "department", header: "Department", render: (emp) => emp.department || "N/A" },
      {
        key: "employmentStatus",
        header: "Status",
        render: (emp) => <Badge tone={statusTone(emp.employmentStatus)}>{emp.employmentStatus || "Active"}</Badge>
      },
      {
        key: "actions",
        header: "Actions",
        headerClassName: "text-right",
        className: "text-right",
        render: (emp) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Button as={Link} to={`/admin/employees/${emp._id}`} variant="outline" size="sm">
              View
            </Button>
            <Button as={Link} to={`/admin/employees/${emp._id}/edit`} variant="subtle" size="sm">
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleDelete(emp._id)}>
              Delete
            </Button>
          </div>
        )
      }
    ],
    []
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Create, edit, and manage team profiles"
        actions={
          <Button as={Link} to="/admin/employees/create" icon={Plus}>
            Add employee
          </Button>
        }
      />

      {error && (
        <Card className="border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</Card>
      )}

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={tableData}
          loading={loading}
          searchKeys={["name", "email", "employeeId"]}
          searchPlaceholder="Search by name, email, or ID"
          emptyIcon={Users}
          emptyTitle="No employees found"
          emptyDescription="Adjust filters or add a new team member."
          emptyAction={
            <Button as={Link} to="/admin/employees/create" icon={Plus}>
              Add employee
            </Button>
          }
          toolbar={
            <Select
              value={filterDesignation}
              onChange={(e) => setFilterDesignation(e.target.value)}
              className="w-full max-w-xs"
            >
              <option value="">All designations</option>
              <option value="Developer">Developer</option>
              <option value="Intern">Intern</option>
              <option value="Manager">Manager</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Technical Support Executive">Tech Support</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
            </Select>
          }
        />
      </Card>
    </div>
  );
};

export default AdminEmployeeList;
