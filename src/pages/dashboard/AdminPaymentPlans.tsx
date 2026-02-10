import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePaymentPlans } from "@/hooks/useDashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, CreditCard } from "lucide-react";

interface Split {
  label: string;
  percentage: number;
}

export default function AdminPaymentPlans() {
  const { data: plans, isLoading } = usePaymentPlans();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [splits, setSplits] = useState<Split[]>([{ label: "Before project start", percentage: 50 }, { label: "After completion", percentage: 50 }]);

  const totalPercentage = splits.reduce((s, sp) => s + sp.percentage, 0);

  const addSplit = () => setSplits(p => [...p, { label: "", percentage: 0 }]);
  const removeSplit = (i: number) => setSplits(p => p.filter((_, idx) => idx !== i));
  const updateSplit = (i: number, field: keyof Split, value: string | number) =>
    setSplits(p => p.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

  const handleCreate = async () => {
    if (totalPercentage !== 100) {
      toast({ title: "Splits must total 100%", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("payment_plans").insert({
      name,
      description,
      splits: JSON.parse(JSON.stringify(splits)),
      created_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Payment plan created" });
      setIsOpen(false);
      setName("");
      setDescription("");
      setSplits([{ label: "Before project start", percentage: 50 }, { label: "After completion", percentage: 50 }]);
      queryClient.invalidateQueries({ queryKey: ["payment_plans"] });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Payment Plans</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="hero"><Plus className="w-4 h-4 mr-2" /> New Plan</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Create Payment Plan</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Plan Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="50/30/20 Split" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Standard milestone-based payment" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Payment Splits</Label>
                    <Badge variant={totalPercentage === 100 ? "default" : "destructive"}>{totalPercentage}%</Badge>
                  </div>
                  <div className="space-y-3">
                    {splits.map((split, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          value={split.label}
                          onChange={e => updateSplit(i, "label", e.target.value)}
                          placeholder="Milestone label"
                          className="flex-1"
                        />
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            value={split.percentage}
                            onChange={e => updateSplit(i, "percentage", Number(e.target.value))}
                            className="w-20"
                            min={0}
                            max={100}
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                        {splits.length > 2 && (
                          <Button variant="ghost" size="icon" onClick={() => removeSplit(i)} className="h-8 w-8">
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addSplit}><Plus className="w-3 h-3 mr-1" /> Add Split</Button>
                  </div>
                </div>
                <Button onClick={handleCreate} className="w-full" disabled={!name || totalPercentage !== 100}>Create Plan</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <p className="text-muted-foreground col-span-full text-center py-8">Loading...</p>
          ) : !plans?.length ? (
            <div className="col-span-full text-center py-12">
              <CreditCard className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No payment plans created yet</p>
            </div>
          ) : (
            plans.map((plan: any) => {
              const planSplits = (plan.splits as Split[]) || [];
              return (
                <Card key={plan.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {planSplits.map((s: Split, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{s.label}</span>
                          <Badge variant="secondary">{s.percentage}%</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-muted flex overflow-hidden">
                      {planSplits.map((s: Split, i: number) => (
                        <div
                          key={i}
                          className="h-full first:rounded-l-full last:rounded-r-full"
                          style={{
                            width: `${s.percentage}%`,
                            backgroundColor: `hsl(var(--chart-${(i % 5) + 1}))`,
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
