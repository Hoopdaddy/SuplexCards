-- ═══════════════════════════════════════════════════════════════
-- SUPLEX CARDS — Supabase Schema (Release 2 foundation)
-- Run in the Supabase SQL editor for your project.
--
-- Tables:
--   profiles          — extends auth.users (1-to-1)
--   checklists        — named lists (max 5 per free user)
--   checklist_items   — individual cards within a list
--
-- Security:
--   Row-Level Security (RLS) enabled on all tables
--   Users can ONLY see and modify their own data
--   No admin backdoor in client-visible code
-- ═══════════════════════════════════════════════════════════════

-- ── Extensions ───────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Profiles ─────────────────────────────────────────────────────
-- Created automatically on signup via trigger below
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text,
  tier          text not null default 'free' check (tier in ('free','pro')),
  max_checklists int not null default 5,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Checklists ────────────────────────────────────────────────────
create table if not exists public.checklists (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  name        text not null default 'My Checklist',
  is_default  boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint checklists_name_length check (char_length(name) between 1 and 80)
);

alter table public.checklists enable row level security;

create policy "Users read own checklists"
  on public.checklists for select
  using (auth.uid() = user_id);

create policy "Users insert own checklists"
  on public.checklists for insert
  with check (
    auth.uid() = user_id
    and (
      select count(*) from public.checklists
      where user_id = auth.uid()
    ) < (
      select max_checklists from public.profiles
      where id = auth.uid()
    )
  );

create policy "Users update own checklists"
  on public.checklists for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users delete own checklists"
  on public.checklists for delete
  using (auth.uid() = user_id);

-- ── Checklist Items ───────────────────────────────────────────────
create table if not exists public.checklist_items (
  id              uuid primary key default uuid_generate_v4(),
  checklist_id    uuid not null references public.checklists(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  card_key        text not null,          -- e.g. "univ25-42" or "univ25__gold-42"
  set_id          text not null,
  set_name        text,
  year            smallint,
  card_num        text,
  card_name       text,
  card_type       text default 'base' check (card_type in ('base','insert','auto','relic')),
  page_link       text,
  checked_at      timestamptz not null default now(),
  unique (checklist_id, card_key)
);

alter table public.checklist_items enable row level security;

create policy "Users read own items"
  on public.checklist_items for select
  using (auth.uid() = user_id);

create policy "Users insert own items"
  on public.checklist_items for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.checklists
      where id = checklist_id and user_id = auth.uid()
    )
  );

create policy "Users delete own items"
  on public.checklist_items for delete
  using (auth.uid() = user_id);

-- ── Indexes ───────────────────────────────────────────────────────
create index if not exists idx_checklist_items_checklist on public.checklist_items(checklist_id);
create index if not exists idx_checklist_items_user     on public.checklist_items(user_id);
create index if not exists idx_checklists_user          on public.checklists(user_id);

-- ── Updated-at trigger ────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists set_updated_at_profiles    on public.profiles;
drop trigger if exists set_updated_at_checklists  on public.checklists;

create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_updated_at_checklists
  before update on public.checklists
  for each row execute procedure public.set_updated_at();
