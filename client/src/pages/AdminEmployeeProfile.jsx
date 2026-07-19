import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api.js";
import { Badge, Button, Card, PageHeader, Spinner } from "../components/admin/AdminUI.jsx";

const AdminEmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const { data } = await api.get(`/employees/${id}`);
      setEmployee(data.employee);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-3 text-slate-400">
        <Spinner className="h-6 w-6" />
        Loading employee profile...
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="space-y-6">
        <PageHeader title="Employee profile" description="Team member details" />
        <Card className="border-red-500/30 bg-red-500/10 p-6 text-red-300">{error || "Employee not found"}</Card>
      </div>
    );
  }

  const statusTone = employee.employmentStatus === "Active" ? "green" : "amber";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <PageHeader
        title={employee.name}
        description={employee.designation || "Team member"}
        actions={
          <Button as={Link} to={`/admin/employees/${id}/edit`}>
            Edit employee
          </Button>
        }
      />

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">
          <span className="text-3xl font-semibold text-cyan-400">{employee.name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-sm text-slate-400">Employee ID</p>
          <p className="font-medium text-white">{employee.employeeId}</p>
          <div className="mt-2">
            <Badge tone={statusTone}>{employee.employmentStatus}</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-xl font-semibold text-white">Basic Information</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-2 font-medium text-slate-200">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Phone</p>
            <p className="mt-2 font-medium text-slate-200">{employee.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Date of Birth</p>
            <p className="mt-2 font-medium text-slate-200">
              {employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Blood Group</p>
            <p className="mt-2 font-medium text-slate-200">{employee.bloodGroup || "N/A"}</p>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-xl font-semibold text-white">Employment Information</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">Designation</p>
            <p className="mt-2 font-medium text-slate-200">{employee.designation}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Department</p>
            <p className="mt-2 font-medium text-slate-200">{employee.department || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Employment Type</p>
            <p className="mt-2 font-medium text-slate-200">{employee.employmentType || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Joining Date</p>
            <p className="mt-2 font-medium text-slate-200">
              {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Reporting Manager</p>
            <p className="mt-2 font-medium text-slate-200">{employee.reportingManagerId?.name || "None"}</p>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <h2 className="text-xl font-semibold text-white">Professional Information</h2>
        <div className="mt-6 space-y-4">
          {employee.experience && (
            <div>
              <p className="text-sm text-slate-400">Years of Experience</p>
              <p className="mt-2 font-medium text-slate-200">{employee.experience} years</p>
            </div>
          )}
          {employee.skills && employee.skills.length > 0 && (
            <div>
              <p className="text-sm text-slate-400">Skills</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {employee.skills.map((skill, idx) => (
                  <Badge key={idx} tone="cyan">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {employee.programmingLanguages && employee.programmingLanguages.length > 0 && (
            <div>
              <p className="text-sm text-slate-400">Programming Languages</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {employee.programmingLanguages.map((lang, idx) => (
                  <Badge key={idx}>{lang}</Badge>
                ))}
              </div>
            </div>
          )}
          {employee.frameworks && employee.frameworks.length > 0 && (
            <div>
              <p className="text-sm text-slate-400">Frameworks</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {employee.frameworks.map((framework, idx) => (
                  <Badge key={idx} tone="violet">
                    {framework}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {employee.githubProfile && (
            <div>
              <p className="text-sm text-slate-400">GitHub Profile</p>
              <a
                href={employee.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-cyan-400 hover:text-cyan-300"
              >
                {employee.githubProfile}
              </a>
            </div>
          )}
          {employee.portfolioUrl && (
            <div>
              <p className="text-sm text-slate-400">Portfolio</p>
              <a
                href={employee.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-cyan-400 hover:text-cyan-300"
              >
                {employee.portfolioUrl}
              </a>
            </div>
          )}
        </div>
      </Card>

      {employee.emergencyContact && Object.keys(employee.emergencyContact).some((k) => employee.emergencyContact[k]) && (
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-white">Emergency Contact</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {employee.emergencyContact.name && (
              <div>
                <p className="text-sm text-slate-400">Name</p>
                <p className="mt-2 font-medium text-slate-200">{employee.emergencyContact.name}</p>
              </div>
            )}
            {employee.emergencyContact.phone && (
              <div>
                <p className="text-sm text-slate-400">Phone</p>
                <p className="mt-2 font-medium text-slate-200">{employee.emergencyContact.phone}</p>
              </div>
            )}
            {employee.emergencyContact.relationship && (
              <div>
                <p className="text-sm text-slate-400">Relationship</p>
                <p className="mt-2 font-medium text-slate-200">{employee.emergencyContact.relationship}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminEmployeeProfile;
