
-- =============================================
-- STEP 1: ENUMS
-- =============================================
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'client');
CREATE TYPE public.project_status AS ENUM ('pending', 'planning', 'in_progress', 'on_hold', 'completed', 'cancelled');
CREATE TYPE public.phase_status AS ENUM ('pending', 'in_progress', 'review', 'completed');
CREATE TYPE public.invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE public.request_status AS ENUM ('pending', 'reviewing', 'approved', 'rejected');

-- =============================================
-- STEP 2: ROLE TABLE (per security instructions)
-- =============================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 3: PROFILES
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 4: STAFF ROLES & PERMISSIONS
-- =============================================
CREATE TABLE public.staff_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.staff_roles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.staff_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.staff_permissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.staff_role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_role_id UUID REFERENCES public.staff_roles(id) ON DELETE CASCADE NOT NULL,
  permission_id UUID REFERENCES public.staff_permissions(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (staff_role_id, permission_id)
);
ALTER TABLE public.staff_role_permissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.staff_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  staff_role_id UUID REFERENCES public.staff_roles(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, staff_role_id)
);
ALTER TABLE public.staff_assignments ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 5: PROJECTS & RELATED
-- =============================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  status project_status NOT NULL DEFAULT 'pending',
  start_date DATE,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  budget NUMERIC(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.project_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status phase_status NOT NULL DEFAULT 'pending',
  sort_order INT NOT NULL DEFAULT 0,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.project_phases ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, user_id)
);
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 6: COMMENTS
-- =============================================
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  phase_id UUID REFERENCES public.project_phases(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 7: FILES
-- =============================================
CREATE TABLE public.project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  phase_id UUID REFERENCES public.project_phases(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  bucket_path TEXT NOT NULL,
  size_bytes BIGINT,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 8: PAYMENT PLANS & INVOICES
-- =============================================
CREATE TABLE public.payment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  splits JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payment_plans ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  payment_plan_id UUID REFERENCES public.payment_plans(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  label TEXT,
  status invoice_status NOT NULL DEFAULT 'draft',
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  payment_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  method TEXT,
  transaction_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 9: REVIEWS & REQUESTS
-- =============================================
CREATE TABLE public.project_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, user_id)
);
ALTER TABLE public.project_reviews ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  budget_range TEXT,
  timeline TEXT,
  status request_status NOT NULL DEFAULT 'pending',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 10: HELPER FUNCTIONS (SECURITY DEFINER)
-- =============================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin');
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'staff');
$$;

CREATE OR REPLACE FUNCTION public.is_client(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'client');
$$;

CREATE OR REPLACE FUNCTION public.has_staff_permission(_user_id UUID, _permission TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.staff_assignments sa
    JOIN public.staff_role_permissions srp ON srp.staff_role_id = sa.staff_role_id
    JOIN public.staff_permissions sp ON sp.id = srp.permission_id
    WHERE sa.user_id = _user_id AND sp.name = _permission
  );
$$;

CREATE OR REPLACE FUNCTION public.is_project_client(_user_id UUID, _project_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.projects
    WHERE id = _project_id AND client_id = _user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_project_member(_user_id UUID, _project_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_members
    WHERE project_id = _project_id AND user_id = _user_id
  );
$$;

-- =============================================
-- STEP 11: AUTO-CREATE PROFILE + ROLE ON SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client');

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- STEP 12: UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_project_phases_updated_at BEFORE UPDATE ON public.project_phases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_project_requests_updated_at BEFORE UPDATE ON public.project_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =============================================
-- STEP 13: RLS POLICIES
-- =============================================

-- user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.is_admin(auth.uid()));

-- profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Staff can view all profiles" ON public.profiles FOR SELECT USING (public.is_staff(auth.uid()));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update any profile" ON public.profiles FOR UPDATE USING (public.is_admin(auth.uid()));

-- staff_roles
CREATE POLICY "Admins manage staff_roles" ON public.staff_roles FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Staff can view staff_roles" ON public.staff_roles FOR SELECT USING (public.is_staff(auth.uid()));

-- staff_permissions
CREATE POLICY "Admins manage staff_permissions" ON public.staff_permissions FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Staff can view staff_permissions" ON public.staff_permissions FOR SELECT USING (public.is_staff(auth.uid()));

-- staff_role_permissions
CREATE POLICY "Admins manage staff_role_permissions" ON public.staff_role_permissions FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Staff can view staff_role_permissions" ON public.staff_role_permissions FOR SELECT USING (public.is_staff(auth.uid()));

-- staff_assignments
CREATE POLICY "Admins manage staff_assignments" ON public.staff_assignments FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can view own assignments" ON public.staff_assignments FOR SELECT USING (auth.uid() = user_id);

-- projects
CREATE POLICY "Admins can do anything on projects" ON public.projects FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients can view own projects" ON public.projects FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Staff members can view assigned projects" ON public.projects FOR SELECT USING (public.is_project_member(auth.uid(), id));
CREATE POLICY "Staff with permission can create projects" ON public.projects FOR INSERT WITH CHECK (public.has_staff_permission(auth.uid(), 'can_create_project'));
CREATE POLICY "Staff with permission can update projects" ON public.projects FOR UPDATE USING (public.has_staff_permission(auth.uid(), 'can_edit_project'));

-- project_phases
CREATE POLICY "Admins can do anything on phases" ON public.project_phases FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients can view own project phases" ON public.project_phases FOR SELECT USING (public.is_project_client(auth.uid(), project_id));
CREATE POLICY "Staff members can view assigned project phases" ON public.project_phases FOR SELECT USING (public.is_project_member(auth.uid(), project_id));
CREATE POLICY "Staff with permission can manage phases" ON public.project_phases FOR INSERT WITH CHECK (public.has_staff_permission(auth.uid(), 'can_manage_phases'));
CREATE POLICY "Staff with permission can update phases" ON public.project_phases FOR UPDATE USING (public.has_staff_permission(auth.uid(), 'can_manage_phases'));

-- project_members
CREATE POLICY "Admins can do anything on members" ON public.project_members FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients can view members of own projects" ON public.project_members FOR SELECT USING (public.is_project_client(auth.uid(), project_id));
CREATE POLICY "Members can view co-members" ON public.project_members FOR SELECT USING (public.is_project_member(auth.uid(), project_id));

-- comments
CREATE POLICY "Admins can do anything on comments" ON public.comments FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Project participants can view comments" ON public.comments FOR SELECT USING (
  public.is_project_client(auth.uid(), project_id) OR public.is_project_member(auth.uid(), project_id)
);
CREATE POLICY "Project participants can create comments" ON public.comments FOR INSERT WITH CHECK (
  auth.uid() = user_id AND (public.is_project_client(auth.uid(), project_id) OR public.is_project_member(auth.uid(), project_id))
);
CREATE POLICY "Users can update own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);

-- project_files
CREATE POLICY "Admins can do anything on files" ON public.project_files FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Project participants can view files" ON public.project_files FOR SELECT USING (
  public.is_project_client(auth.uid(), project_id) OR public.is_project_member(auth.uid(), project_id)
);
CREATE POLICY "Project participants can upload files" ON public.project_files FOR INSERT WITH CHECK (
  auth.uid() = uploaded_by AND (public.is_project_client(auth.uid(), project_id) OR public.is_project_member(auth.uid(), project_id))
);
CREATE POLICY "File owners can delete files" ON public.project_files FOR DELETE USING (auth.uid() = uploaded_by OR public.is_admin(auth.uid()));

-- payment_plans
CREATE POLICY "Admins manage payment_plans" ON public.payment_plans FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Staff can view payment_plans" ON public.payment_plans FOR SELECT USING (public.is_staff(auth.uid()));

-- invoices
CREATE POLICY "Admins can do anything on invoices" ON public.invoices FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients can view own invoices" ON public.invoices FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Staff with permission can create invoices" ON public.invoices FOR INSERT WITH CHECK (public.has_staff_permission(auth.uid(), 'can_create_invoice'));
CREATE POLICY "Staff with permission can update invoices" ON public.invoices FOR UPDATE USING (public.has_staff_permission(auth.uid(), 'can_manage_invoices'));

-- payments
CREATE POLICY "Admins can do anything on payments" ON public.payments FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients can view own payments" ON public.payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.invoices WHERE invoices.id = payments.invoice_id AND invoices.client_id = auth.uid())
);

-- project_reviews
CREATE POLICY "Admins can do anything on reviews" ON public.project_reviews FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients can view own reviews" ON public.project_reviews FOR SELECT USING (
  public.is_project_client(auth.uid(), project_id)
);
CREATE POLICY "Clients can create reviews on completed projects" ON public.project_reviews FOR INSERT WITH CHECK (
  auth.uid() = user_id AND public.is_project_client(auth.uid(), project_id)
);

-- project_requests
CREATE POLICY "Admins can do anything on requests" ON public.project_requests FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Clients can view own requests" ON public.project_requests FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Clients can create requests" ON public.project_requests FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update pending requests" ON public.project_requests FOR UPDATE USING (client_id = auth.uid() AND status = 'pending');
CREATE POLICY "Staff with permission can view requests" ON public.project_requests FOR SELECT USING (public.has_staff_permission(auth.uid(), 'can_view_requests'));
CREATE POLICY "Staff with permission can update requests" ON public.project_requests FOR UPDATE USING (public.has_staff_permission(auth.uid(), 'can_manage_requests'));

-- =============================================
-- STEP 14: SEED DEFAULT PERMISSIONS
-- =============================================
INSERT INTO public.staff_permissions (name, description) VALUES
  ('can_create_project', 'Create new projects'),
  ('can_edit_project', 'Edit existing projects'),
  ('can_manage_phases', 'Create and update project phases'),
  ('can_assign_members', 'Assign staff to projects'),
  ('can_create_invoice', 'Create invoices'),
  ('can_manage_invoices', 'Update and manage invoices'),
  ('can_record_payment', 'Record payments'),
  ('can_manage_files', 'Manage project files'),
  ('can_view_requests', 'View project requests'),
  ('can_manage_requests', 'Update and manage project requests'),
  ('can_view_analytics', 'View revenue and analytics'),
  ('can_manage_clients', 'Manage client accounts');

-- =============================================
-- STEP 15: STORAGE BUCKET FOR PROJECT FILES
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', false);

CREATE POLICY "Authenticated users can upload project files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-files');

CREATE POLICY "Authenticated users can view project files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'project-files');

CREATE POLICY "File owners can delete from storage"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project-files' AND auth.uid()::text = (storage.foldername(name))[1]);
