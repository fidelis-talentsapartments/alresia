import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Users,
  FileText,
  Shield,
  Wallet,
  Bell,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import alresiaLogo from "@/assets/alresia-logo.jpeg";

const clientNavigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminNavigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Requests", href: "/dashboard/requests", icon: FileText },
  { name: "Staff & Roles", href: "/dashboard/staff", icon: Shield },
  { name: "Payment Plans", href: "/dashboard/payment-plans", icon: Wallet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile, isAdmin, isStaff, signOut } = useAuth();

  const navigation = (isAdmin || isStaff) ? adminNavigation : clientNavigation;
  const initials = profile?.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  const roleLabel = isAdmin ? "Admin" : isStaff ? "Staff" : "Client";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar — glassmorphism */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border/50 z-50">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <img src={alresiaLogo} alt="Alresia" className="w-9 h-9 rounded-xl object-contain ring-1 ring-border/50 group-hover:ring-primary/50 transition-all" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-chart-1 ring-2 ring-card" />
              </div>
              <span className="font-bold text-lg hidden sm:block tracking-tight">Alresia</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            <div className="h-8 w-px bg-border/50 mx-1 hidden md:block" />

            <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-2 py-1.5 hover:bg-accent/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-chart-1/20 flex items-center justify-center ring-1 ring-primary/20">
                <span className="text-primary font-semibold text-sm">{initials}</span>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-semibold leading-tight">{profile?.full_name || "User"}</div>
                <div className="text-xs text-muted-foreground leading-tight">{roleLabel}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar — premium design */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-[272px] bg-card/95 backdrop-blur-xl border-r border-border/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Role badge */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-chart-1 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">{roleLabel} Portal</span>
          </div>
        </div>

        <nav className="px-3 space-y-0.5 flex-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary-foreground/50" />
                )}
                <item.icon className={`w-[18px] h-[18px] transition-transform group-hover:scale-110 ${isActive ? "" : ""}`} />
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive rounded-xl h-10"
            onClick={handleSignOut}
          >
            <LogOut className="w-[18px] h-[18px] mr-3" />
            <span className="text-sm font-medium">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:pl-[272px] pt-16 min-h-screen">
        <div className="p-5 lg:p-8 max-w-[1400px] mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
