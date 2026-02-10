import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAllProfiles } from "@/hooks/useDashboardData";
import { useState } from "react";
import { Search, Users } from "lucide-react";

export default function AdminClients() {
  const { data: profiles, isLoading } = useAllProfiles();
  const [search, setSearch] = useState("");

  const clients = profiles?.filter((p: any) =>
    p.user_roles?.some((r: any) => r.role === "client") &&
    (p.full_name?.toLowerCase().includes(search.toLowerCase()) || !search)
  ) ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Clients</h1>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : clients.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">No clients found</p>
                  </TableCell></TableRow>
                ) : (
                  clients.map((client: any) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium text-xs">
                              {client.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "?"}
                            </span>
                          </div>
                          <span className="font-medium">{client.full_name || "Unnamed"}</span>
                        </div>
                      </TableCell>
                      <TableCell>{client.phone || "—"}</TableCell>
                      <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
                      <TableCell><Badge variant="secondary">Client</Badge></TableCell>
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
