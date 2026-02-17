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
insert into tasks (id, title, description, subject, type, status, priority, due_date, created_at, updated_at)
values
(gen_random_uuid(), 'Chapitre 3 : Algebre lineaire', 'Exercices 1-10 du polycopie', 'Mathematiques', 'DEVOIR', 'EN_COURS', 'MOYENNE', current_date + interval '3 day', now(), now()),
(gen_random_uuid(), 'TP Reseaux - Routage', 'Configurer OSPF sur le lab virtuel', 'Reseaux', 'TP', 'EN_COURS', 'HAUTE', current_date + interval '1 day', now(), now()),
(gen_random_uuid(), 'Projet React - Dashboard', 'Premiere iteration du tableau de bord', 'Developpement Web', 'PROJET', 'TERMINEE', 'MOYENNE', current_date + interval '10 day', now(), now()),
(gen_random_uuid(), 'Lecture article IA', 'Synthese sur les transformers', 'Intelligence Artificielle', 'DEVOIR', 'EN_COURS', 'BASSE', current_date + interval '7 day', now(), now()),
(gen_random_uuid(), 'Revision BD', 'Revoir les jointures et index', 'Bases de donnees', 'DEVOIR', 'EN_COURS', 'MOYENNE', current_date + interval '5 day', now(), now()),
(gen_random_uuid(), 'TP Systemes - Processus', 'Implementer un mini-planificateur', 'Systemes', 'TP', 'EN_COURS', 'HAUTE', current_date + interval '2 day', now(), now());
