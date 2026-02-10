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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}! Here's your platform overview.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard/staff">
              <Button variant="outline">Manage Staff</Button>
            </Link>
            <Link to="/dashboard/projects">
              <Button variant="hero" className="group">
                All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <DashboardStats stats={stats} />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>New project requests from clients</CardDescription>
              </div>
              <Link to="/dashboard/requests">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground text-sm">No pending requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.slice(0, 5).map((req) => (
                    <div key={req.id} className="flex items-start justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-sm">{req.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{req.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(req.created_at).toLocaleDateString()}
                          </span>
                          {req.budget_range && (
                            <Badge variant="secondary" className="text-xs">{req.budget_range}</Badge>
                          )}
                        </div>
                      </div>
                      <Badge variant="default" className="capitalize text-xs">{req.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Clients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Latest registered clients</CardDescription>
              </div>
              <Link to="/dashboard/clients">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {clients.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground text-sm">No clients yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {clients.slice(0, 5).map((client: any) => (
                    <div key={client.id} className="flex items-center gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-medium text-sm">
                          {client.full_name ? client.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "?"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{client.full_name || "Unnamed"}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {new Date(client.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Active Projects Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>All ongoing project deliveries</CardDescription>
            </div>
            <Link to="/dashboard/projects">
              <Button variant="ghost" size="sm">Manage</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {activeProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">No active projects</div>
            ) : (
              <div className="space-y-4">
                {activeProjects.slice(0, 5).map((project) => {
                  const phases = project.project_phases || [];
                  const completed = phases.filter((p: any) => p.status === "completed").length;
                  const progress = phases.length > 0 ? Math.round((completed / phases.length) * 100) : 0;

                  return (
                    <div key={project.id} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{project.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{project.status?.replace("_", " ")}</p>
                      </div>
                      <div className="w-32">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-medium w-10 text-right">{progress}%</span>
                      {project.due_date && (
                        <span className="text-xs text-muted-foreground hidden md:block">
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
