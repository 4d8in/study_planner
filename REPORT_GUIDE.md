# Guide de rapport – MyStudyPlanner

Ce guide propose une structure claire pour le rapport académique L3. Adaptez chaque section avec vos propres captures et analyses.

## 1. Introduction
- Contexte: gestion des devoirs/TP/projets par matière.
- Objectif: fournir un outil web simple, responsive, et sécurisé avec API REST.

## 2. Analyse des exigences
- Authentification (login/logout, tokens).
- CRUD des tâches + bascule statut.
- Filtres (matière, statut, priorité, recherche).
- Tableau de bord global.
- Architecture frontend/backend avec base Postgres.

## 3. Architecture
- SPA React (Vite) → API Express → Postgres (Supabase).
- Auth JWT (access token) + refresh token.
- Routes protégées via middleware.

## 4. Modèle de données
- Table `tasks` (id, title, description, subject, type, status, priority, due_date, created_at, updated_at).
- Table `User` (id, email, password hash, name, role).
- Table `RefreshToken` (token, userId, expiresAt).
- Contraintes (enum via CHECK) et indexes.

## 5. Implémentation
- Frontend: React hooks (useState/useEffect/useContext), Router, services API (Axios), composants modulaires.
- Backend: Express REST, requêtes SQL via `pg`.
- Auth: login → tokens stockés en localStorage; refresh via endpoint dédié.

## 6. Tests et validation
- Scénarios: inscription, login, CRUD tâches, filtres combinés, pagination.
- Vérifier 401 sans token et 200 avec token.

## 7. UI / UX
- UI responsive, table paginée, badges de statut/priorité.
- Expérience fluide: modales, feedback d’erreur/chargement.

## 8. Conclusion et perspectives
- Bilan: objectifs atteints, architecture claire.
- Évolutions: notifications, PWA, collaboration multi-utilisateur, analytics avancés.

Texte d’adaptation (exemple court):
"Nous avons choisi une architecture SPA + API REST afin de séparer clairement l’interface et la logique métier. L’authentification par JWT assure une session légère côté client, tandis que la base Supabase héberge les tâches et les utilisateurs."
