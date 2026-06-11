import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails.jsx"));
const Jobs = lazy(() => import("./pages/Jobs.jsx"));
const JobDetails = lazy(() => import("./pages/JobDetails.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const ActivityHistory = lazy(() => import("./pages/ActivityHistory.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const AdminServices = lazy(() => import("./pages/AdminServices.jsx"));
const AdminJobs = lazy(() => import("./pages/AdminJobs.jsx"));
const AdminInternships = lazy(() => import("./pages/AdminInternships.jsx"));
const AdminQueries = lazy(() => import("./pages/AdminQueries.jsx"));
const AdminWorkflow = lazy(() => import("./pages/AdminWorkflow.jsx"));
const AdminTrustedClients = lazy(() => import("./pages/AdminTrustedClients.jsx"));
const AdminPricingPlans = lazy(() => import("./pages/AdminPricingPlans.jsx"));
const AdminPortfolio = lazy(() => import("./pages/AdminPortfolio.jsx"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials.jsx"));
const AdminFeatures = lazy(() => import("./pages/AdminFeatures.jsx"));
const AdminEmployeeList = lazy(() => import("./pages/AdminEmployeeList.jsx"));
const AdminEmployeeForm = lazy(() => import("./pages/AdminEmployeeForm.jsx"));
const AdminEmployeeProfile = lazy(() => import("./pages/AdminEmployeeProfile.jsx"));
const DeveloperProfile = lazy(() => import("./pages/DeveloperProfile.jsx"));
const InternProfile = lazy(() => import("./pages/InternProfile.jsx"));
const ManagerProfile = lazy(() => import("./pages/ManagerProfile.jsx"));
const DesignerProfile = lazy(() => import("./pages/DesignerProfile.jsx"));
const SupportProfile = lazy(() => import("./pages/SupportProfile.jsx"));
const HRProfile = lazy(() => import("./pages/HRProfile.jsx"));
const SalesProfile = lazy(() => import("./pages/SalesProfile.jsx"));
const BulkImportEmployees = lazy(() => import("./pages/BulkImportEmployees.jsx"));
const AdminActivityDashboard = lazy(() => import("./pages/AdminActivityDashboard.jsx"));
const AdminReports = lazy(() => import("./pages/AdminReports.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const Investor = lazy(() => import("./pages/Investor.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/profile/");

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-transparent text-ink">
      <div className="relative z-10">
        {!isAdminRoute && <Navbar />}
        <main className="w-full py-8 pt-8">
          <Suspense
            fallback={
              <div className="mx-auto flex min-h-[40vh] w-full max-w-6xl items-center justify-center px-4 text-sm text-gray-500">
                Loading page...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity-history"
                element={
                  <ProtectedRoute>
                    <ActivityHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <AdminRoute>
                    <AdminServices />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <AdminRoute>
                    <AdminJobs />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/internships"
                element={
                  <AdminRoute>
                    <AdminInternships />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/queries"
                element={
                  <AdminRoute>
                    <AdminQueries />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/workflow"
                element={
                  <AdminRoute>
                    <AdminWorkflow />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/trusted-clients"
                element={
                  <AdminRoute>
                    <AdminTrustedClients />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/pricing-plans"
                element={
                  <AdminRoute>
                    <AdminPricingPlans />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/portfolio"
                element={
                  <AdminRoute>
                    <AdminPortfolio />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <AdminRoute>
                    <AdminTestimonials />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/features"
                element={
                  <AdminRoute>
                    <AdminFeatures />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/employees"
                element={
                  <AdminRoute>
                    <AdminEmployeeList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/employees/create"
                element={
                  <AdminRoute>
                    <AdminEmployeeForm />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/employees/:id"
                element={
                  <AdminRoute>
                    <AdminEmployeeProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/employees/:id/edit"
                element={
                  <AdminRoute>
                    <AdminEmployeeForm />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/employees/bulk-import"
                element={
                  <AdminRoute>
                    <BulkImportEmployees />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/activity"
                element={
                  <AdminRoute>
                    <AdminActivityDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <AdminRoute>
                    <AdminReports />
                  </AdminRoute>
                }
              />
              <Route
                path="/profile/:id/developer"
                element={
                  <AdminRoute>
                    <DeveloperProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/profile/:id/intern"
                element={
                  <AdminRoute>
                    <InternProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/profile/:id/manager"
                element={
                  <AdminRoute>
                    <ManagerProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/profile/:id/designer"
                element={
                  <AdminRoute>
                    <DesignerProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/profile/:id/support"
                element={
                  <AdminRoute>
                    <SupportProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/profile/:id/hr"
                element={
                  <AdminRoute>
                    <HRProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="/profile/:id/sales"
                element={
                  <AdminRoute>
                    <SalesProfile />
                  </AdminRoute>
                }
              />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/investors" element={<Investor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
};

export default App;
