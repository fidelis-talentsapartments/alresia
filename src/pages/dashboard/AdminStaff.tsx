import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStaffRoles, useAllProfiles } from "@/hooks/useDashboardData";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Plus, Shield, Users } from "lucide-react";

export default function AdminStaff() {
  const { data: staffRoles, isLoading: rolesLoading } = useStaffRoles();
  const { data: profiles } = useAllProfiles();
  const { data: permissions } = useQuery({
    queryKey: ["staff_permissions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("staff_permissions").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [roleForm, setRoleForm] = useState({ name: "", description: "" });
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  const staffMembers = profiles?.filter((p: any) =>
    p.user_roles?.some((r: any) => r.role === "staff" || r.role === "admin")
  ) ?? [];

  const handleCreateRole = async () => {
    const { data: role, error } = await supabase.from("staff_roles").insert({
      name: roleForm.name,
      description: roleForm.description,
    }).select().single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    if (selectedPerms.length > 0) {
      await supabase.from("staff_role_permissions").insert(
        selectedPerms.map(pid => ({ staff_role_id: role.id, permission_id: pid }))
      );
    }

    toast({ title: "Role created" });
    setIsRoleDialogOpen(false);
    setRoleForm({ name: "", description: "" });
    setSelectedPerms([]);
    queryClient.invalidateQueries({ queryKey: ["staff_roles"] });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Staff & Roles</h1>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="roles"><Shield className="w-4 h-4 mr-2" />Roles</TabsTrigger>
            <TabsTrigger value="staff"><Users className="w-4 h-4 mr-2" />Staff Members</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero"><Plus className="w-4 h-4 mr-2" /> New Role</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Create Staff Role</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Role Name</Label>
                      <Input value={roleForm.name} onChange={e => setRoleForm(p => ({ ...p, name: e.target.value }))} placeholder="Project Manager" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={roleForm.description} onChange={e => setRoleForm(p => ({ ...p, description: e.target.value }))} placeholder="Manages project timelines..." />
                    </div>
                    <div>
                      <Label className="mb-3 block">Permissions</Label>
                      <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                        {permissions?.map((perm: any) => (
                          <div key={perm.id} className="flex items-start gap-3">
                            <Checkbox
                              checked={selectedPerms.includes(perm.id)}
                              onCheckedChange={(checked) => {
                                setSelectedPerms(prev =>
                                  checked ? [...prev, perm.id] : prev.filter(id => id !== perm.id)
                                );
                              }}
                            />
                            <div>
                              <p className="text-sm font-medium">{perm.name.replace(/_/g, " ")}</p>
                              <p className="text-xs text-muted-foreground">{perm.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button onClick={handleCreateRole} className="w-full" disabled={!roleForm.name}>Create Role</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rolesLoading ? (
                <p className="text-muted-foreground col-span-full text-center py-8">Loading roles...</p>
              ) : staffRoles?.length === 0 ? (
                <p className="text-muted-foreground col-span-full text-center py-8">No roles created yet</p>
              ) : (
                staffRoles?.map((role: any) => (
                  <Card key={role.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5">
                        {role.staff_role_permissions?.map((srp: any) => (
                          <Badge key={srp.id} variant="secondary" className="text-xs capitalize">
                            {srp.staff_permissions?.name?.replace(/_/g, " ") ?? "—"}
                          </Badge>
                        ))}
                        {(!role.staff_role_permissions || role.staff_role_permissions.length === 0) && (
                          <span className="text-xs text-muted-foreground">No permissions</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffMembers.length === 0 ? (
                      <TableRow><TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No staff members</TableCell></TableRow>
                    ) : (
                      staffMembers.map((member: any) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-medium text-xs">
                                  {member.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "?"}
                                </span>
                              </div>
                              <span className="font-medium">{member.full_name || "Unnamed"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1.5">
                              {member.user_roles?.map((r: any) => (
                                <Badge key={r.role} variant={r.role === "admin" ? "default" : "secondary"} className="capitalize">{r.role}</Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
