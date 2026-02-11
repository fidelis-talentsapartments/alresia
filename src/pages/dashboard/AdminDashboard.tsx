import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects, useInvoices, useProjectRequests, useAllProfiles } from "@/hooks/useDashboardData";
import {
  Users,
  FolderKanban,
  DollarSign,
  FileText,
  ArrowRight,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const { data: projects } = useProjects();
  const { data: invoices } = useInvoices();
  const { data: requests } = useProjectRequests();
  const { data: profiles } = useAllProfiles();

  const clients = profiles?.filter((p: any) => p.user_roles?.some((r: any) => r.role === "client")) ?? [];
  const activeProjects = projects?.filter(p => p.status === "in_progress" || p.status === "planning") ?? [];
  const pendingRequests = requests?.filter(r => r.status === "pending") ?? [];
  const totalRevenue = invoices
    ?.filter(i => i.status === "paid")
    .reduce((sum, i) => sum + Number(i.amount), 0) ?? 0;

  const stats = [
    { title: "Total Clients", value: String(clients.length), change: "Registered clients", icon: Users, color: "text-primary" },
    { title: "Active Projects", value: String(activeProjects.length), change: "In progress", icon: FolderKanban, color: "text-chart-1" },
    { title: "Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "Total collected", icon: DollarSign, color: "text-chart-2" },
    { title: "Pending Requests", value: String(pendingRequests.length), change: "Awaiting review", icon: FileText, color: "text-chart-3" },
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
                <span className="text-sm font-medium text-primary">Admin Portal</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                Welcome back, {profile?.full_name?.split(" ")[0] || "Admin"} 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening across your platform today.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/dashboard/staff">
                <Button variant="outline" className="rounded-xl border-border/60">Manage Staff</Button>
              </Link>
              <Link to="/dashboard/projects">
                <Button variant="hero" className="group rounded-xl">
                  All Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-chart-1/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
        </div>

        <DashboardStats stats={stats} />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <Card className="border-border/50 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-accent/30 border-b border-border/30 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-chart-3/10 ring-1 ring-chart-3/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-chart-3" />
                </div>
                <div>
                  <CardTitle className="text-base">Pending Requests</CardTitle>
                  <CardDescription className="text-xs">New project requests from clients</CardDescription>
                </div>
              </div>
              <Link to="/dashboard/requests">
                <Button variant="ghost" size="sm" className="rounded-lg text-xs">View All →</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-4">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-7 h-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">No pending requests</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">New requests will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingRequests.slice(0, 5).map((req, i) => (
                    <div key={req.id} className="group flex items-start justify-between p-3 rounded-xl hover:bg-accent/40 transition-colors">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{i + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{req.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{req.description}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Clock className="w-3 h-3 text-muted-foreground/60" />
                            <span className="text-[11px] text-muted-foreground/60">
                              {new Date(req.created_at).toLocaleDateString()}
                            </span>
                            {req.budget_range && (
                              <Badge variant="secondary" className="text-[10px] h-5 rounded-md">{req.budget_range}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge variant="default" className="capitalize text-[10px] h-5 rounded-md">{req.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Clients */}
          <Card className="border-border/50 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-accent/30 border-b border-border/30 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Recent Clients</CardTitle>
                  <CardDescription className="text-xs">Latest registered clients</CardDescription>
                </div>
              </div>
              <Link to="/dashboard/clients">
                <Button variant="ghost" size="sm" className="rounded-lg text-xs">View All →</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-4">
              {clients.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-7 h-7 text-muted-foreground/40" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">No clients yet</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">Clients will appear as they sign up</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {clients.slice(0, 5).map((client: any) => (
                    <div key={client.id} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-accent/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-chart-1/15 ring-1 ring-primary/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">
                          {client.full_name ? client.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "?"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{client.full_name || "Unnamed"}</p>
                        <p className="text-xs text-muted-foreground/60">
                          Joined {new Date(client.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Active Projects Overview */}
        <Card className="border-border/50 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-accent/30 border-b border-border/30 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-chart-1/10 ring-1 ring-chart-1/20 flex items-center justify-center">
                <FolderKanban className="w-4 h-4 text-chart-1" />
              </div>
              <div>
                <CardTitle className="text-base">Active Projects</CardTitle>
                <CardDescription className="text-xs">All ongoing project deliveries</CardDescription>
              </div>
            </div>
            <Link to="/dashboard/projects">
              <Button variant="ghost" size="sm" className="rounded-lg text-xs">Manage →</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-4">
            {activeProjects.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center mx-auto mb-3">
                  <FolderKanban className="w-7 h-7 text-muted-foreground/40" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">No active projects</p>
              </div>
            ) : (
              <div className="space-y-2">
                {activeProjects.slice(0, 5).map((project) => {
                  const phases = project.project_phases || [];
                  const completed = phases.filter((p: any) => p.status === "completed").length;
                  const progress = phases.length > 0 ? Math.round((completed / phases.length) * 100) : 0;

                  return (
                    <div key={project.id} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-accent/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-accent/60 flex items-center justify-center flex-shrink-0">
                        <FolderKanban className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{project.name}</p>
                        <p className="text-xs text-muted-foreground/60 capitalize">{project.status?.replace("_", " ")}</p>
                      </div>
                      <div className="w-28 hidden sm:block">
                        <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-semibold w-11 text-right tabular-nums">{progress}%</span>
                      {project.due_date && (
                        <span className="text-[11px] text-muted-foreground/50 hidden md:block whitespace-nowrap">
                          Due {new Date(project.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
