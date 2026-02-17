-- Seed demo user (password: AdminPass123!)
insert into "User" (id, email, password, name, role)
values (
  gen_random_uuid(),
  'admin@example.com',
  crypt('AdminPass123!', gen_salt('bf')),
  'Admin',
  'ADMIN'
)
on conflict (email) do nothing;

-- Seed demo tasks
with u as (
  select id from "User" where email = 'admin@example.com' limit 1
)
insert into tasks (id, title, description, subject, type, status, priority, due_date, user_id, created_at, updated_at)
select gen_random_uuid(), 'Chapitre 3 : Algebre lineaire', 'Exercices 1-10 du polycopie', 'Mathematiques', 'DEVOIR', 'EN_COURS', 'MOYENNE', current_date + interval '3 day', u.id, now(), now() from u
union all
select gen_random_uuid(), 'TP Reseaux - Routage', 'Configurer OSPF sur le lab virtuel', 'Reseaux', 'TP', 'EN_COURS', 'HAUTE', current_date + interval '1 day', u.id, now(), now() from u
union all
select gen_random_uuid(), 'Projet React - Dashboard', 'Premiere iteration du tableau de bord', 'Developpement Web', 'PROJET', 'TERMINEE', 'MOYENNE', current_date + interval '10 day', u.id, now(), now() from u
union all
select gen_random_uuid(), 'Lecture article IA', 'Synthese sur les transformers', 'Intelligence Artificielle', 'DEVOIR', 'EN_COURS', 'BASSE', current_date + interval '7 day', u.id, now(), now() from u
union all
select gen_random_uuid(), 'Revision BD', 'Revoir les jointures et index', 'Bases de donnees', 'DEVOIR', 'EN_COURS', 'MOYENNE', current_date + interval '5 day', u.id, now(), now() from u
union all
select gen_random_uuid(), 'TP Systemes - Processus', 'Implementer un mini-planificateur', 'Systemes', 'TP', 'EN_COURS', 'HAUTE', current_date + interval '2 day', u.id, now(), now() from u;
