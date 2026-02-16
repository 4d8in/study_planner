insert into tasks (title, description, subject, type, status, priority, due_date)
values
('Chapitre 3: Algebre lineaire', 'Exercices 1-10 du polycopie', 'Mathematiques', 'DEVOIR', 'EN_COURS', 'MOYENNE', current_date + interval '3 day'),
('TP Reseaux - Routage', 'Configurer OSPF sur le lab virtuel', 'Reseaux', 'TP', 'EN_COURS', 'HAUTE', current_date + interval '1 day'),
('Projet React - Dashboard', 'Premiere iteration du tableau de bord', 'Developpement Web', 'PROJET', 'TERMINEE', 'MOYENNE', current_date + interval '10 day'),
('Lecture article IA', 'Synthese de l article sur les transformers', 'Intelligence Artificielle', 'DEVOIR', 'EN_COURS', 'BASSE', current_date + interval '7 day');
