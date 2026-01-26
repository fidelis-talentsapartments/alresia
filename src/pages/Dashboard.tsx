import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FolderKanban,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Active Projects",
    value: "3",
    change: "+1 this month",
    icon: FolderKanban,
    color: "text-primary",
  },
  {
    title: "Total Spent",
    value: "$45,250",
    change: "+$12,500 this month",
    icon: DollarSign,
    color: "text-chart-1",
  },
  {
    title: "Hours Logged",
    value: "284",
    change: "+42 this week",
    icon: Clock,
    color: "text-chart-2",
  },
  {
    title: "Completed",
    value: "12",
    change: "Projects delivered",
    icon: CheckCircle2,
    color: "text-chart-3",
  },
];

const activeProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    phase: "Development",
    progress: 65,
    status: "on-track",
    dueDate: "Feb 15, 2024",
  },
  {
    id: 2,
    name: "Mobile App MVP",
    phase: "Design",
    progress: 35,
    status: "on-track",
    dueDate: "Mar 1, 2024",
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    phase: "Planning",
    progress: 15,
    status: "attention",
    dueDate: "Mar 20, 2024",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "phase_completed",
    project: "E-Commerce Platform",
    message: "Design phase completed",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "payment",
    project: "Mobile App MVP",
    message: "Milestone payment of $5,000 processed",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "update",
    project: "E-Commerce Platform",
    message: "New GitHub commits pushed",
    time: "2 days ago",
  },
  {
    id: 4,
    type: "feedback",
    project: "Analytics Dashboard",
    message: "Your feedback requested on wireframes",
    time: "3 days ago",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your projects.
            </p>
          </div>
          <Link to="/request-project">
            <Button variant="hero" className="group">
              New Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Projects */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Your ongoing project deliveries</CardDescription>
              </div>
              <Link to="/dashboard/projects">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeProjects.map((project) => (
                  <div key={project.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{project.name}</div>
                        <Badge
                          variant={project.status === "on-track" ? "default" : "destructive"}
                          className="capitalize"
                        >
                          {project.status === "on-track" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {project.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Due {project.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-12">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current phase: {project.phase}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates on your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.project}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
