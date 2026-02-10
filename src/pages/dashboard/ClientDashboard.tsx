import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects, useInvoices, useProjectRequests } from "@/hooks/useDashboardData";
import {
  ArrowRight,
  FolderKanban,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function ClientDashboard() {
  const { profile } = useAuth();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: invoices } = useInvoices();
  const { data: requests } = useProjectRequests();

  const activeProjects = projects?.filter(p => p.status === "in_progress" || p.status === "planning") ?? [];
  const completedProjects = projects?.filter(p => p.status === "completed") ?? [];
  const pendingInvoices = invoices?.filter(i => i.status === "sent" || i.status === "overdue") ?? [];
  const totalSpent = invoices
    ?.filter(i => i.status === "paid")
    .reduce((sum, i) => sum + Number(i.amount), 0) ?? 0;

  const stats = [
    { title: "Active Projects", value: String(activeProjects.length), change: "Currently in progress", icon: FolderKanban, color: "text-primary" },
    { title: "Total Spent", value: `$${totalSpent.toLocaleString()}`, change: `${pendingInvoices.length} pending`, icon: DollarSign, color: "text-chart-1" },
    { title: "Requests", value: String(requests?.length ?? 0), change: "Project requests", icon: FileText, color: "text-chart-2" },
    { title: "Completed", value: String(completedProjects.length), change: "Projects delivered", icon: CheckCircle2, color: "text-chart-3" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}! Here's your project overview.
            </p>
          </div>
          <Link to="/request-project">
            <Button variant="hero" className="group">
              New Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <DashboardStats stats={stats} />

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Your ongoing project deliveries</CardDescription>
              </div>
              <Link to="/dashboard/projects">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <div className="text-muted-foreground text-sm">Loading projects...</div>
              ) : activeProjects.length === 0 ? (
                <div className="text-center py-8">
                  <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">No active projects yet</p>
                  <Link to="/request-project">
                    <Button variant="outline" size="sm" className="mt-3">Request a Project</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeProjects.slice(0, 5).map((project) => {
                    const phases = project.project_phases || [];
                    const completed = phases.filter((p: any) => p.status === "completed").length;
                    const progress = phases.length > 0 ? Math.round((completed / phases.length) * 100) : 0;
                    const currentPhase = phases.find((p: any) => p.status === "in_progress");

                    return (
                      <div key={project.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="font-medium">{project.name}</div>
                            <Badge variant={project.status === "in_progress" ? "default" : "secondary"} className="capitalize">
                              {project.status === "in_progress" ? (
                                <Clock className="w-3 h-3 mr-1" />
                              ) : (
                                <AlertCircle className="w-3 h-3 mr-1" />
                              )}
                              {project.status?.replace("_", " ")}
                            </Badge>
                          </div>
                          {project.due_date && (
                            <span className="text-sm text-muted-foreground">
                              Due {new Date(project.due_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Progress value={progress} className="h-2" />
                          </div>
                          <span className="text-sm font-medium w-12">{progress}%</span>
                        </div>
                        {currentPhase && (
                          <div className="text-sm text-muted-foreground">
                            Current phase: {currentPhase.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>Payments awaiting action</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingInvoices.length === 0 ? (
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground text-sm">No pending invoices</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingInvoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">{invoice.label || "Invoice"}</p>
                        <p className="text-xs text-muted-foreground">
                          Due {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${Number(invoice.amount).toLocaleString()}</p>
                        <Badge variant={invoice.status === "overdue" ? "destructive" : "secondary"} className="text-xs capitalize">
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
