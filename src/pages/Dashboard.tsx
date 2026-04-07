import { useAuth } from "@/contexts/AuthContext";
import ClientDashboard from "./dashboard/ClientDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";
import { Seo } from "@/components/seo/Seo";

export default function Dashboard() {
  const { isAdmin, isStaff } = useAuth();

  if (isAdmin || isStaff) {
    return (
      <>
        <Seo
          title="Dashboard"
          description="Private client and admin dashboard for Alresia Technologies."
          path="/dashboard"
          noindex
          nofollow
        />
        <AdminDashboard />
      </>
    );
  }

  return (
    <>
      <Seo
        title="Dashboard"
        description="Private client and admin dashboard for Alresia Technologies."
        path="/dashboard"
        noindex
        nofollow
      />
      <ClientDashboard />
    </>
  );
}
