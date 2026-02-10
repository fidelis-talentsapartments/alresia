import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProjectRequests } from "@/hooks/useDashboardData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

export default function AdminRequests() {
  const { data: requests, isLoading } = useProjectRequests();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateStatus = async (id: string, status: "pending" | "reviewing" | "approved" | "rejected") => {
    const { error } = await supabase.from("project_requests").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Request updated" });
      queryClient.invalidateQueries({ queryKey: ["project_requests"] });
    }
  };

  const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "secondary",
    reviewing: "default",
    approved: "default",
    rejected: "destructive",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Project Requests</h1>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : !requests?.length ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">No requests yet</p>
                  </TableCell></TableRow>
                ) : (
                  requests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.title}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">{req.description}</TableCell>
                      <TableCell>{req.budget_range || "—"}</TableCell>
                      <TableCell>{req.timeline || "—"}</TableCell>
                      <TableCell>
                        <Select value={req.status} onValueChange={val => updateStatus(req.id, val as any)}>
                          <SelectTrigger className="w-[130px] h-8">
                            <Badge variant={statusColors[req.status] || "secondary"} className="capitalize">{req.status}</Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewing">Reviewing</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{new Date(req.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
