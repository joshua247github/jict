-- Run this file after supabase/schema.sql.
create or replace function public.is_jict_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

-- Prevent customers from changing their own role to admin.
create or replace function public.prevent_profile_role_escalation()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if old.role is distinct from new.role and not public.is_jict_admin() then
    raise exception 'Only an administrator can change account roles';
  end if;
  return new;
end;
$$;
drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role before update on public.profiles
for each row execute procedure public.prevent_profile_role_escalation();

create policy "Admins manage products" on public.products for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage categories" on public.categories for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage banners" on public.banners for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage coupons" on public.coupons for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage orders" on public.orders for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage order items" on public.order_items for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins view profiles" on public.profiles for select to authenticated using (public.is_jict_admin());
