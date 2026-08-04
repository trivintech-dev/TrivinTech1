import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";

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
const AdminPageEditor = lazy(() => import("./pages/AdminPageEditor.jsx"));
const AdminSettings = lazy(() => import("./pages/AdminSettings.jsx"));
const AdminNavigation = lazy(() => import("./pages/AdminNavigation.jsx"));
const AdminContacts = lazy(() => import("./pages/AdminContacts.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const Investor = lazy(() => import("./pages/Investor.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const ProductDiscovery = lazy(() => import("./pages/ProductDiscovery.jsx"));
const DesignEngineering = lazy(() => import("./pages/DesignEngineering.jsx"));
const CloudDevops = lazy(() => import("./pages/CloudDevops.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideSiteChrome = isAdminRoute || location.pathname.startsWith("/profile/");

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-transparent text-ink">
      <div className="relative z-10">
        {!hideSiteChrome && <Navbar />}
        <main className={isAdminRoute ? "w-full" : "w-full py-8 pt-8"}>
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
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="internships" element={<AdminInternships />} />
                <Route path="queries" element={<AdminQueries />} />
                <Route path="workflow" element={<AdminWorkflow />} />
                <Route path="trusted-clients" element={<AdminTrustedClients />} />
                <Route path="pricing-plans" element={<AdminPricingPlans />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="features" element={<AdminFeatures />} />
                <Route path="employees" element={<AdminEmployeeList />} />
                <Route path="employees/create" element={<AdminEmployeeForm />} />
                <Route path="employees/bulk-import" element={<BulkImportEmployees />} />
                <Route path="employees/:id/edit" element={<AdminEmployeeForm />} />
                <Route path="employees/:id" element={<AdminEmployeeProfile />} />
                <Route path="activity" element={<AdminActivityDashboard />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="pages/:page" element={<AdminPageEditor />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="navigation" element={<AdminNavigation />} />
                <Route path="contacts" element={<AdminContacts />} />
              </Route>

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
              <Route path="/blog" element={<Blog />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/product-discovery" element={<ProductDiscovery />} />
              <Route path="/design-engineering" element={<DesignEngineering />} />
              <Route path="/cloud-devops" element={<CloudDevops />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {!hideSiteChrome && <Footer />}
      </div>
    </div>
  );
};

export default App;
