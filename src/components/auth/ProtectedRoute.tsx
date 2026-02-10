import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "staff" | "client";
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, roles, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && !roles.includes(requiredRole) && !roles.includes("admin")) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
