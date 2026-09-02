create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null
);

-- Row Level Security stays enabled with no policies: the table is only ever
-- written to via the server-side API route using the service role key,
-- which bypasses RLS. No anon/public access is granted.
alter table contact_messages enable row level security;
