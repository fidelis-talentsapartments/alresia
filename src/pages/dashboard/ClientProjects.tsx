import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/hooks/useDashboardData";
import { Link } from "react-router-dom";
import { FolderKanban, ArrowRight, Clock, CheckCircle2 } from "lucide-react";

export default function ClientProjects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <Link to="/request-project">
            <Button variant="hero"><ArrowRight className="w-4 h-4 mr-2" /> Request New</Button>
          </Link>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : !projects?.length ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderKanban className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">Get started by requesting your first project</p>
              <Link to="/request-project"><Button>Request a Project</Button></Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const phases = project.project_phases || [];
              const completed = phases.filter((p: any) => p.status === "completed").length;
              const progress = phases.length > 0 ? Math.round((completed / phases.length) * 100) : 0;

              return (
                <Card key={project.id} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant={project.status === "completed" ? "default" : "secondary"} className="capitalize">
                        {project.status === "completed" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {project.status?.replace("_", " ")}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{phases.length} phases</span>
                        {project.due_date && (
                          <span className="text-muted-foreground">Due {new Date(project.due_date).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
