-- Append this section after the initial JICT schema to support secure administrator operations.
create or replace function public.is_jict_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

create policy "Admins manage products" on public.products for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage categories" on public.categories for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage banners" on public.banners for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage coupons" on public.coupons for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage orders" on public.orders for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage order items" on public.order_items for all to authenticated using (public.is_jict_admin()) with check (public.is_jict_admin());
create policy "Admins manage profiles" on public.profiles for select to authenticated using (public.is_jict_admin());
