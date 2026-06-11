import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user, refreshProfile, logout } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "prefer not to say",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    timezone: "UTC",
    language: "English",
    notificationSettings: {
      email: true,
      sms: false,
      push: false
    },
    avatarUrl: ""
  });
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [activity, setActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        gender: user.gender || "prefer not to say",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        zipCode: user.zipCode || "",
        timezone: user.timezone || "UTC",
        language: user.language || "English",
        notificationSettings: {
          email: user.notificationSettings?.email ?? true,
          sms: user.notificationSettings?.sms ?? false,
          push: user.notificationSettings?.push ?? false
        },
        avatarUrl: user.avatarUrl || ""
      });
    }
  }, [user]);

  const fetchActivity = async () => {
    if (!user) {
      setActivity([]);
      return;
    }

    setActivityLoading(true);
    try {
      const { data } = await api.get("/users/me/activity");
      setActivity(data.activities || []);
    } catch (error) {
      setActivity([]);
    } finally {
      setActivityLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchActivity();
    }
  }, [user]);

  const completion = useMemo(() => {
    const fields = [
      form.name,
      form.email,
      form.phone,
      form.address,
      form.city,
      form.state,
      form.country,
      form.zipCode
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [form]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      avatarUrl: form.avatarUrl,
      dateOfBirth: form.dateOfBirth || undefined,
      gender: form.gender,
      address: form.address,
      city: form.city,
      state: form.state,
      country: form.country,
      zipCode: form.zipCode,
      timezone: form.timezone,
      language: form.language,
      notificationSettings: form.notificationSettings
    };

    await api.put("/users/me", payload);
    await refreshProfile();
    setMessage("Profile updated successfully.");
  };

  const handleNotificationToggle = (key) => {
    setForm((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [key]: !prev.notificationSettings[key]
      }
    }));
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setPasswordMessage("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    try {
      await api.put("/users/me/password", passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordMessage("Password changed successfully.");
    } catch (error) {
      setPasswordMessage(error.response?.data?.message || "Unable to change password.");
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-white pt-40 md:pt-48">
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-mist p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-3xl bg-slate-100">
                {form.avatarUrl ? (
                  <img src={form.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-500">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-600">Profile Header</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">{user?.name || "User"}</h1>
                <p className="mt-1 text-sm text-slate-700">{user?.email}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-gray-100 bg-mist p-4 text-center">
                <p className="text-sm font-medium text-slate-700">Customer ID</p>
                <p className="mt-2 font-semibold text-slate-900">{user?.id || "N/A"}</p>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-mist p-4 text-center">
                <p className="text-sm font-medium text-slate-700">Account Status</p>
                <p className="mt-2 font-semibold text-slate-900">{user?.accountStatus || "active"}</p>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-mist p-4 text-center">
                <p className="text-sm font-medium text-slate-700">Membership Plan</p>
                <p className="mt-2 font-semibold text-slate-900">{user?.membershipPlan || "Basic"}</p>
              </div>
            </div>
        </div>

        <div className="mt-6 rounded-3xl border border-gray-100 bg-mist p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Profile completion</p>
              <p className="text-sm font-semibold text-slate-900">{completion}%</p>
            </div>
            <Link
              to="/activity-history"
              className="profile-cta-secondary inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition"
            >
              View full history
            </Link>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-indigo-600" style={{ width: `${completion}%` }} />
          </div>
        </div>
      </div>
      </section>

      {message && <p className="mx-auto w-full max-w-6xl rounded-3xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-4 sm:space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <section className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-mist p-4 sm:p-8 shadow-sm">
              <div className="flex flex-col gap-2 sm:gap-4 sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Personal Information</h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-700">View and update your contact details.</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs sm:text-sm text-slate-600">Full Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="profile-input mt-1 sm:mt-2 px-3 sm:px-4 py-2 sm:py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-xs sm:text-sm text-slate-600">Email Address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="profile-input mt-1 sm:mt-2 px-3 sm:px-4 py-2 sm:py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">Phone Number</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">Date of Birth</span>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(event) => setForm((prev) => ({ ...prev, dateOfBirth: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">Gender</span>
                  <select
                    value={form.gender}
                    onChange={(event) => setForm((prev) => ({ ...prev, gender: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm text-slate-600">Address</span>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">City</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">State</span>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">Country</span>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">ZIP / Postal Code</span>
                  <input
                    type="text"
                    value={form.zipCode}
                    onChange={(event) => setForm((prev) => ({ ...prev, zipCode: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-mist p-4 sm:p-8 shadow-sm">
              <div className="flex flex-col gap-2 sm:gap-4 sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Account Settings</h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-700">Manage preferences and contact settings.</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-slate-600">Language Preference</span>
                  <select
                    value={form.language}
                    onChange={(event) => setForm((prev) => ({ ...prev, language: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">Time Zone</span>
                  <select
                    value={form.timezone}
                    onChange={(event) => setForm((prev) => ({ ...prev, timezone: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  >
                    <option>UTC</option>
                    <option>GMT</option>
                    <option>EST</option>
                    <option>PST</option>
                  </select>
                </label>
                <div className="sm:col-span-2 space-y-3">
                  <p className="text-sm text-slate-600">Notification Settings</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Email", key: "email" },
                      { label: "SMS", key: "sms" },
                      { label: "Push", key: "push" }
                    ].map((option) => (
                      <button
                        type="button"
                        key={option.key}
                        onClick={() => handleNotificationToggle(option.key)}
                        className={`rounded-2xl px-4 py-3 text-left transition ${
                          form.notificationSettings[option.key] ? "profile-chip-enabled" : "profile-chip-disabled"
                        }`}
                      >
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p className="profile-chip-subtext mt-1 text-xs">
                          {form.notificationSettings[option.key] ? "Enabled" : "Disabled"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block sm:col-span-2">
                  <span className="text-sm text-slate-600">Avatar URL</span>
                  <input
                    type="text"
                    value={form.avatarUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, avatarUrl: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
              </div>
            </section>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button type="submit" className="profile-cta-primary w-full rounded-2xl px-6 py-3 font-semibold transition sm:w-auto">
                Save profile
              </button>
              <button
                type="button"
                onClick={logout}
                className="profile-cta-secondary w-full rounded-2xl px-6 py-3 font-semibold transition sm:w-auto"
              >
                Sign out
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-gray-100 bg-mist p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Security Settings</h2>
                <p className="mt-1 text-sm text-slate-700">Keep your account secure.</p>
              </div>
              <button
                type="button"
                className="profile-cta-primary rounded-2xl px-4 py-2 text-sm font-semibold transition"
              >
                Change password
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-gray-200 bg-mist p-4">
                <p className="text-sm font-semibold text-slate-800">Two-Factor Authentication</p>
                <p className="mt-1 text-sm text-slate-700">Disabled</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-mist p-4">
                <p className="text-sm font-semibold text-slate-800">Login Activity</p>
                <p className="mt-1 text-sm text-slate-700">Last login: {new Date().toLocaleString()}</p>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-mist p-4">
                <p className="text-sm font-semibold text-slate-800">Active Sessions</p>
                <p className="mt-1 text-sm text-slate-700">1 active session</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-gray-200 bg-mist p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Change Password</p>
                  <p className="mt-1 text-sm text-slate-700">Update your account password securely.</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm text-slate-600">Current Password</span>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(event) => setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">New Password</span>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-600">Confirm New Password</span>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(event) => setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                    className="profile-input mt-2 px-4 py-3"
                  />
                </label>
                {passwordMessage && <p className="text-sm text-red-600">{passwordMessage}</p>}
                <button type="submit" className="profile-cta-primary w-full rounded-2xl px-4 py-3 font-semibold transition">
                  Save password
                </button>
              </form>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-mist p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Activity Timeline</h2>
                <p className="mt-1 text-sm text-slate-700">Recent account activity.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {activityLoading ? (
                <p className="text-sm text-slate-700">Loading activity...</p>
              ) : activity.length === 0 ? (
                <p className="text-sm text-slate-700">No recent activity available.</p>
              ) : (
                <ul className="space-y-4">
                  {activity.map((event) => (
                    <li key={event._id} className="rounded-3xl border border-gray-200 bg-slate-50 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{event.description}</p>
                          <p className="mt-1 text-sm text-slate-700">{new Date(event.createdAt).toLocaleString()}</p>
                        </div>
                        <Link
                          to="/activity-history"
                          className="profile-cta-secondary mt-3 inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold transition sm:mt-0"
                        >
                          See all activity
                        </Link>
                      </div>

                      {event.metadata && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {event.metadata.ip && (
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">IP address</p>
                              <p className="mt-2 text-sm font-medium text-slate-900">{event.metadata.ip}</p>
                            </div>
                          )}
                          {event.metadata.userAgent && (
                            <div className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">Device / Browser</p>
                              <p className="mt-2 text-sm font-medium text-slate-900 break-words">{event.metadata.userAgent}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Support & Help</h2>
                <p className="mt-1 text-sm text-slate-700">Quick access to support resources.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                { label: "Contact Support", hint: "Open a support ticket.", to: "/contact#contact-form" },
                { label: "Raise Ticket", hint: "Report an issue quickly.", to: "/contact#contact-form" },
                { label: "Knowledge Base", hint: "Search help articles.", to: "/contact#faq" },
                { label: "FAQ", hint: "Find answers fast.", to: "/contact#faq" }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="profile-cta-secondary rounded-2xl px-4 py-4 text-left text-sm transition"
                >
                  <p className="font-semibold">{item.label}</p>
                  <p className="profile-chip-subtext mt-1 text-xs">{item.hint}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
