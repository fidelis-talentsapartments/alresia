import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useProjects() {
  const { user, isAdmin, isStaff } = useAuth();

  return useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_phases(*), project_members(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useProjectRequests() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["project_requests", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useInvoices() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["invoices", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*, payments(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useComments(projectId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["comments", projectId],
    queryFn: async () => {
      let query = supabase
        .from("comments")
        .select("*, profiles:user_id(full_name, avatar_url)")
        .order("created_at", { ascending: false });

      if (projectId) query = query.eq("project_id", projectId);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!projectId,
  });
}

export function useAllProfiles() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["all_profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useStaffRoles() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["staff_roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_roles")
        .select("*, staff_role_permissions(*, staff_permissions:permission_id(*))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function usePaymentPlans() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["payment_plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_plans")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}
