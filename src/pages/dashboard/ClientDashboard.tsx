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
  Sparkles,
  Plus,
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
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-chart-1/5 to-chart-2/5 border border-primary/10 p-6 lg:p-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Client Portal</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Welcome back, {profile?.full_name?.split(" ")[0] || "there"} 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your projects, payments, and deliverables all in one place.
              </p>
            </div>
            <Link to="/request-project">
              <Button variant="hero" className="group rounded-xl">
                <Plus className="w-4 h-4" />
                New Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-chart-1/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
        </div>

        <DashboardStats stats={stats} />

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/50 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-accent/30 border-b border-border/30 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                  <FolderKanban className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Active Projects</CardTitle>
                  <CardDescription className="text-xs">Your ongoing project deliveries</CardDescription>
                </div>
              </div>
              <Link to="/dashboard/projects">
                <Button variant="ghost" size="sm" className="rounded-lg text-xs">View All →</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-4">
              {projectsLoading ? (
                <div className="text-muted-foreground text-sm py-8 text-center">Loading projects...</div>
              ) : activeProjects.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center mx-auto mb-3">
                    <FolderKanban className="w-7 h-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-muted-foreground font-medium text-sm">No active projects yet</p>
                  <p className="text-muted-foreground/60 text-xs mt-1 mb-4">Get started by requesting your first project</p>
                  <Link to="/request-project">
                    <Button variant="outline" size="sm" className="rounded-xl">Request a Project</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {activeProjects.slice(0, 5).map((project) => {
                    const phases = project.project_phases || [];
                    const completed = phases.filter((p: any) => p.status === "completed").length;
                    const progress = phases.length > 0 ? Math.round((completed / phases.length) * 100) : 0;
                    const currentPhase = phases.find((p: any) => p.status === "in_progress");

                    return (
                      <div key={project.id} className="group p-4 rounded-xl hover:bg-accent/40 transition-colors space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/60 flex items-center justify-center flex-shrink-0">
                              <FolderKanban className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{project.name}</div>
                              {currentPhase && (
                                <div className="text-xs text-muted-foreground/60 mt-0.5">
                                  Current: {currentPhase.name}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={project.status === "in_progress" ? "default" : "secondary"} className="capitalize text-[10px] h-5 rounded-md">
                              {project.status?.replace("_", " ")}
                            </Badge>
                            {project.due_date && (
                              <span className="text-[11px] text-muted-foreground/50 hidden md:block">
                                Due {new Date(project.due_date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pl-[52px]">
                          <div className="flex-1">
                            <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                          </div>
                          <span className="text-xs font-semibold tabular-nums w-10 text-right">{progress}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 overflow-hidden">
            <CardHeader className="bg-accent/30 border-b border-border/30 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-chart-1/10 ring-1 ring-chart-1/20 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-base">Pending Invoices</CardTitle>
                  <CardDescription className="text-xs">Payments awaiting action</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {pendingInvoices.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-7 h-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">No pending invoices</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingInvoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/40 transition-colors">
                      <div>
                        <p className="text-sm font-medium">{invoice.label || "Invoice"}</p>
                        <p className="text-[11px] text-muted-foreground/60">
                          Due {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">${Number(invoice.amount).toLocaleString()}</p>
                        <Badge variant={invoice.status === "overdue" ? "destructive" : "secondary"} className="text-[10px] h-5 rounded-md capitalize">
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
