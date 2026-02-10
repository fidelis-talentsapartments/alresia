import { useAuth } from "@/contexts/AuthContext";
import ClientDashboard from "./dashboard/ClientDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

export default function Dashboard() {
  const { isAdmin, isStaff } = useAuth();

  if (isAdmin || isStaff) {
    return <AdminDashboard />;
  }

  return <ClientDashboard />;
}
