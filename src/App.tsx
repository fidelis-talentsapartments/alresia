import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Seo } from "@/components/seo/Seo";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import RequestProject from "./pages/RequestProject";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ClientProjects from "./pages/dashboard/ClientProjects";
import ClientPayments from "./pages/dashboard/ClientPayments";
import AdminProjects from "./pages/dashboard/AdminProjects";
import AdminClients from "./pages/dashboard/AdminClients";
import AdminRequests from "./pages/dashboard/AdminRequests";
import AdminStaff from "./pages/dashboard/AdminStaff";
import AdminPaymentPlans from "./pages/dashboard/AdminPaymentPlans";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" attribute="class" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request-project" element={<RequestProject />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route
                path="/dashboard/projects"
                element={
                  <>
                    <Seo title="Dashboard" description="Private dashboard area for Alresia Technologies." path="/dashboard/projects" noindex nofollow />
                    <ProtectedRoute><DashboardProjectsRouter /></ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/dashboard/payments"
                element={
                  <>
                    <Seo title="Dashboard" description="Private dashboard area for Alresia Technologies." path="/dashboard/payments" noindex nofollow />
                    <ProtectedRoute><ClientPayments /></ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/dashboard/clients"
                element={
                  <>
                    <Seo title="Dashboard" description="Private dashboard area for Alresia Technologies." path="/dashboard/clients" noindex nofollow />
                    <ProtectedRoute requiredRole="admin"><AdminClients /></ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/dashboard/requests"
                element={
                  <>
                    <Seo title="Dashboard" description="Private dashboard area for Alresia Technologies." path="/dashboard/requests" noindex nofollow />
                    <ProtectedRoute requiredRole="admin"><AdminRequests /></ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/dashboard/staff"
                element={
                  <>
                    <Seo title="Dashboard" description="Private dashboard area for Alresia Technologies." path="/dashboard/staff" noindex nofollow />
                    <ProtectedRoute requiredRole="admin"><AdminStaff /></ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/dashboard/payment-plans"
                element={
                  <>
                    <Seo title="Dashboard" description="Private dashboard area for Alresia Technologies." path="/dashboard/payment-plans" noindex nofollow />
                    <ProtectedRoute requiredRole="admin"><AdminPaymentPlans /></ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <>
                    <Seo title="Dashboard" description="Private dashboard area for Alresia Technologies." path="/dashboard/settings" noindex nofollow />
                    <ProtectedRoute><DashboardSettings /></ProtectedRoute>
                  </>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
// Routes projects page based on role
function DashboardProjectsRouter() {
  return <DashboardProjectsInner />;
}

function DashboardProjectsInner() {
  const { isAdmin, isStaff } = useAuth();
  return (isAdmin || isStaff) ? <AdminProjects /> : <ClientProjects />;
}

export default App;
