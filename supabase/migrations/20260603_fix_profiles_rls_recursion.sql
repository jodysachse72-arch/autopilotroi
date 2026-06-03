-- Fix the recursive "Partners can view referred profiles" RLS policy.
--
-- The old policy's condition contains:
--   EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = ...)
-- which triggers infinite recursion because Postgres re-evaluates
-- the same RLS policies on the inner SELECT.
--
-- Fix: use get_my_role() (SECURITY DEFINER, created in 20260603)
-- for the role check, and scope the policy to profiles that were
-- actually referred by the caller (referred_by = auth.uid()).
--
-- Access after this migration:
--   • Every user can SELECT their own profile row  (existing "Users can view own profile")
--   • Partners/admins can SELECT profiles where referred_by = their id  (this policy)
--   • Every user can UPDATE their own profile row   (existing "Users can update own profile")

DROP POLICY IF EXISTS "Partners can view referred profiles" ON profiles;

CREATE POLICY "Partners can view referred profiles"
  ON profiles
  FOR SELECT
  USING (
    referred_by = auth.uid()
    AND get_my_role() IN ('partner', 'admin')
  );
