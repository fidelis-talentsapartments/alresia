import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Seo } from "@/components/seo/Seo";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import type { ReactNode } from "react";

const queryClient = new QueryClient();

function PrivateDashboardRoute({
  path,
  children,
  requiredRole,
}: {
  path: string;
  children: ReactNode;
  requiredRole?: "admin";
}) {
  return (
    <>
      <Seo
        title="Dashboard"
        description="Private dashboard area for Alresia Technologies."
        path={path}
        noindex
        nofollow
      />
      <ProtectedRoute requiredRole={requiredRole}>{children}</ProtectedRoute>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
              <Route
                path="/dashboard"
                element={
                  <PrivateDashboardRoute path="/dashboard">
                    <Dashboard />
                  </PrivateDashboardRoute>
                }
              />
              <Route
                path="/dashboard/projects"
                element={
                  <PrivateDashboardRoute path="/dashboard/projects">
                    <DashboardProjectsRouter />
                  </PrivateDashboardRoute>
                }
              />
              <Route
                path="/dashboard/payments"
                element={
                  <PrivateDashboardRoute path="/dashboard/payments">
                    <ClientPayments />
                  </PrivateDashboardRoute>
                }
              />
              <Route
                path="/dashboard/clients"
                element={
                  <PrivateDashboardRoute
                    path="/dashboard/clients"
                    requiredRole="admin"
                  >
                    <AdminClients />
                  </PrivateDashboardRoute>
                }
              />
              <Route
                path="/dashboard/requests"
                element={
                  <PrivateDashboardRoute
                    path="/dashboard/requests"
                    requiredRole="admin"
                  >
                    <AdminRequests />
                  </PrivateDashboardRoute>
                }
              />
              <Route
                path="/dashboard/staff"
                element={
                  <PrivateDashboardRoute
                    path="/dashboard/staff"
                    requiredRole="admin"
                  >
                    <AdminStaff />
                  </PrivateDashboardRoute>
                }
              />
              <Route
                path="/dashboard/payment-plans"
                element={
                  <PrivateDashboardRoute
                    path="/dashboard/payment-plans"
                    requiredRole="admin"
                  >
                    <AdminPaymentPlans />
                  </PrivateDashboardRoute>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <PrivateDashboardRoute path="/dashboard/settings">
                    <DashboardSettings />
                  </PrivateDashboardRoute>
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
  return isAdmin || isStaff ? <AdminProjects /> : <ClientProjects />;
}

export default App;
