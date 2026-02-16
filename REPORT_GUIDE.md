# Guide de rapport pour MyStudyPlanner

Ce document propose un plan concis pour rédiger votre rapport académique. Adaptez chaque section avec vos propres analyses, captures d'écran et résultats.

## 1. Introduction
- Contexte: besoin d'organiser les tâches universitaires (devoir, TP, projet) par matière.
- Objectif: fournir un tableau de bord web simple et responsive pour suivre l'avancement et les priorités.

## 2. Analyse des exigences
- Liste des fonctionnalités attendues: authentification simulée, CRUD tâches, filtres (matière/statut/priorité), bascule de statut, tableau de bord global.
- Contraintes techniques: React + Express, stockage JSON (fichier), réponse JSON, UI responsive.

## 3. Architecture
- Vue d'ensemble: frontend React communique avec API Express via Axios; Express lit/écrit un fichier JSON (tasks.json) pour persister les tâches.
- Schéma simple: React SPA -> Express REST -> Fichier JSON.
- Routes protégées côté frontend (ProtectedRoute) + middleware côté backend (authMiddleware).

## 4. Modèle de données
- Table `tasks` (id uuid, title, description, subject, type, status, priority, due_date, created_at, updated_at).
- Rappeler les contraintes CHECK pour type/statut/priorité.
- Justification de l'usage d'UUID et des indexes (subject, status, priority, due_date).

## 5. Détails d'implémentation
- Frontend: routing (React Router), contexte d'auth (`AuthContext`), services API (Axios), composants clés (TaskForm, TaskList, Filters, StatsCards), gestion des états de chargement/erreur.
- Backend: routes `/api/auth` et `/api/tasks`, validation (`validators/taskValidator`), middleware d'auth, tri par due_date puis created_at.
- Gestion des statuts: PATCH `/api/tasks/:id/status` bascule si aucun statut fourni.

## 6. Tests et validation
- Proposez des scénarios manuels: login démo, création/édition/suppression de tâche, filtres combinés, bascule de statut, vérification des données seed.
- Idées d'automatisation (optionnel): tests d'API via Postman/Thunder Client ou scripts npm.

## 7. UI / UX
- Principes: mobile-first, cartes de stats, badges de statut/priorité, formulaire modal, feedback de chargement.
- Capture d'écran suggérées: page de login, dashboard avec cartes, modal de création, filtres en action.

## 8. Conclusion et perspectives
- Bilan: objectifs atteints, stabilité de l'auth simulée, visualisation rapide des échéances.
- Améliorations possibles: vraie authentification JWT, notifications d'échéance, drag & drop des tâches, multi-utilisateur, tests E2E.

Ajoutez en annexe vos commandes de lancement, extraits de logs ou tout benchmark pertinent.
