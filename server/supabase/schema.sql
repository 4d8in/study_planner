-- Schema for MyStudyPlanner
create extension if not exists "uuid-ossp";

create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  subject text not null,
  type text not null check (type in ('DEVOIR', 'TP', 'PROJET')),
  status text not null check (status in ('EN_COURS', 'TERMINEE')),
  priority text not null check (priority in ('BASSE', 'MOYENNE', 'HAUTE')),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_tasks_subject on tasks(subject);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_tasks_priority on tasks(priority);
create index if not exists idx_tasks_due_date on tasks(due_date);
