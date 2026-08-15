-- Card price cache table for CardSight AI integration
-- Run this in Supabase Dashboard → SQL Editor

create table if not exists card_prices (
  id         bigint generated always as identity primary key,
  query      text        not null,
  results    jsonb       not null default '[]',
  fetched_at timestamptz not null default now(),
  constraint card_prices_query_key unique (query)
);

-- Public read (cached prices are non-sensitive public data)
alter table card_prices enable row level security;

create policy "Anyone can read cached prices"
  on card_prices for select using (true);

create policy "Anyone can insert cached prices"
  on card_prices for insert with check (true);

create policy "Anyone can update cached prices"
  on card_prices for update using (true);

-- Index for fast cache lookups
create index if not exists card_prices_query_idx on card_prices (query);
create index if not exists card_prices_fetched_idx on card_prices (fetched_at);
