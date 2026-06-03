-- Security-definer function to read the caller's own role
-- without hitting RLS infinite recursion on the profiles table.
-- Used by middleware and requireAdmin for role-gating.

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;
