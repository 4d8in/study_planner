-- MyStudyPlanner schema (Postgres / Supabase)
-- Uses pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

create table if not exists "User" (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  name text not null,
  role text not null check (role in ('STUDENT', 'ADMIN')),
  created_at timestamptz not null default now()
);

create table if not exists "RefreshToken" (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  "userId" uuid not null references "User"(id) on delete cascade,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  subject text not null,
  type text not null check (type in ('DEVOIR', 'TP', 'PROJET')),
  status text not null check (status in ('EN_COURS', 'TERMINEE')),
  priority text not null check (priority in ('BASSE', 'MOYENNE', 'HAUTE')),
  due_date date,
  user_id uuid not null references "User"(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_user_email on "User"(email);
create index if not exists idx_refresh_user on "RefreshToken"("userId");
create index if not exists idx_tasks_subject on tasks(subject);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_tasks_priority on tasks(priority);
create index if not exists idx_tasks_due_date on tasks(due_date);
create index if not exists idx_tasks_user_id on tasks(user_id);
