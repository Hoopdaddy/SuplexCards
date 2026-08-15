-- Add list_type to checklists
-- Run in Supabase Dashboard → SQL Editor

alter table checklists
  add column if not exists list_type text not null default 'collection'
  check (list_type in ('collection', 'wishlist', 'for_trade'));

-- Existing lists are already collection (the default covers them)

-- Allow authenticated users to read for_trade / wishlist lists owned by others
-- (needed so the matching engine can check other users' public lists)
create policy "Authenticated users can read public list metadata"
  on checklists for select
  using (
    auth.role() = 'authenticated'
    and list_type in ('for_trade', 'wishlist')
  );

-- Allow authenticated users to read items in other users' for_trade / wishlist lists
create policy "Authenticated users can read public list items"
  on checklist_items for select
  using (
    auth.role() = 'authenticated'
    and user_id != auth.uid()
    and exists (
      select 1 from checklists c
      where c.id = checklist_id
      and c.list_type in ('for_trade', 'wishlist')
    )
  );
