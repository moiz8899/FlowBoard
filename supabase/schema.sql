create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  category_label text not null,
  price integer not null check (price >= 0),
  original_price integer check (original_price is null or original_price >= 0),
  description text not null,
  long_description text not null,
  features text[] not null default '{}',
  tech_stack text[] not null default '{}',
  screenshots text[] not null default '{}',
  file_path text,
  rating numeric(2,1) not null default 0,
  review_count integer not null default 0,
  download_count integer not null default 0,
  tags text[] not null default '{}',
  paddle_price_id text not null default '',
  payment_bypass_enabled boolean not null default false,
  version text not null default '1.0.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products drop column if exists demo_url;
alter table public.products add column if not exists original_price integer check (original_price is null or original_price >= 0);
alter table public.products add column if not exists features text[] not null default '{}';
alter table public.products add column if not exists tech_stack text[] not null default '{}';
alter table public.products add column if not exists screenshots text[] not null default '{}';
alter table public.products add column if not exists file_path text;
alter table public.products add column if not exists rating numeric(2,1) not null default 0;
alter table public.products add column if not exists review_count integer not null default 0;
alter table public.products add column if not exists download_count integer not null default 0;
alter table public.products add column if not exists tags text[] not null default '{}';
alter table public.products add column if not exists paddle_price_id text not null default '';
alter table public.products add column if not exists payment_bypass_enabled boolean not null default false;
alter table public.products add column if not exists version text not null default '1.0.0';
alter table public.products add column if not exists updated_at timestamptz not null default now();
alter table public.products drop column if exists two_checkout_product_id;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  paddle_transaction_id text unique,
  buyer_email text,
  gross_amount integer not null default 0,
  currency text not null default 'USD',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.orders add column if not exists paddle_transaction_id text unique;
alter table public.orders drop column if exists two_checkout_order_id;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  unit_price integer not null default 0 check (unit_price >= 0)
);

create unique index if not exists order_items_order_product_unique
on public.order_items(order_id, product_id);

create table if not exists public.product_events (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  event_name text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = public;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
before update on public.products
for each row execute function public.touch_updated_at();

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.product_events enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "No public access to orders" on public.orders;
create policy "No public access to orders"
on public.orders
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "No public access to order items" on public.order_items;
create policy "No public access to order items"
on public.order_items
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "No public access to product events" on public.product_events;
create policy "No public access to product events"
on public.product_events
for all
to anon, authenticated
using (false)
with check (false);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'dashboard-screenshots',
  'dashboard-screenshots',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'dashboard-files',
  'dashboard-files',
  false,
  104857600,
  array['application/zip', 'application/x-zip-compressed', 'application/octet-stream']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read dashboard screenshots" on storage.objects;

drop view if exists public.admin_daily_sales;
create view public.admin_daily_sales
with (security_invoker = true) as
select
  date_trunc('day', o.created_at)::date as day,
  count(*)::integer as sales,
  coalesce(sum(o.gross_amount), 0)::integer as revenue
from public.orders o
where o.status in ('completed', 'approved', 'paid')
group by 1
order by 1 desc;

drop view if exists public.admin_top_products;
create view public.admin_top_products
with (security_invoker = true) as
select
  p.id,
  p.name,
  p.slug,
  coalesce(sum(oi.quantity), 0)::integer as units_sold,
  coalesce(sum(oi.quantity * oi.unit_price), 0)::integer as revenue
from public.products p
left join public.order_items oi on oi.product_id = p.id
left join public.orders o on o.id = oi.order_id and o.status in ('completed', 'approved', 'paid')
group by p.id, p.name, p.slug
order by units_sold desc, revenue desc;
