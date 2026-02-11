import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, ArrowUpRight } from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

interface DashboardStatsProps {
  stats: StatItem[];
}

const gradientMap: Record<string, string> = {
  "text-primary": "from-primary/15 to-primary/5",
  "text-chart-1": "from-chart-1/15 to-chart-1/5",
  "text-chart-2": "from-chart-2/15 to-chart-2/5",
  "text-chart-3": "from-chart-3/15 to-chart-3/5",
};

const ringMap: Record<string, string> = {
  "text-primary": "ring-primary/20",
  "text-chart-1": "ring-chart-1/20",
  "text-chart-2": "ring-chart-2/20",
  "text-chart-3": "ring-chart-3/20",
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradientMap[stat.color] || "from-primary/15 to-primary/5"} ring-1 ${ringMap[stat.color] || "ring-primary/20"} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-chart-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight mb-0.5">{stat.value}</div>
            <div className="text-xs text-muted-foreground font-medium">{stat.change}</div>
          </CardContent>
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Card>
      ))}
    </div>
  );
}
