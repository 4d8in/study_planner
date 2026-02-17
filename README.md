# MyStudyPlanner

Application web académique pour gérer devoirs, TP et projets par matière. Architecture propre React (Vite) → Express REST → Postgres (Supabase). Authentification JWT + refresh tokens, filtres, dashboard, pagination, CRUD complet des tâches.

## Fonctionnalités
- Authentification avec JWT + refresh token (login / logout / refresh)
- Inscription + profil (mise à jour nom / mot de passe)
- CRUD tâches + bascule statut (EN_COURS/TERMINEE)
- Organisation par matière + filtres (matière, statut, priorité, recherche)
- Dashboard (stats + échéances à venir) + pagination (4 tâches/page)
- UI responsive (Tailwind) + React Router + Context
- API REST Express + Postgres (Supabase)

## Architecture
```
[React (Vite) SPA]
   | axios (Bearer access token)
   v
[Express REST API]
   | pg (SQL)
   v
[Supabase Postgres]
```

## Tech stack
- Frontend: React 18, Vite, React Router, Axios, TailwindCSS
- Backend: Node.js, Express, pg, bcryptjs, jsonwebtoken
- DB: Supabase Postgres

## Structure du projet
```
MyStudyPlanner/
  client/
    src/app
    src/pages
    src/components
    src/context
    src/services
    src/utils
  server/
    src/routes
    src/middleware
    src/db
    src/config
    src/utils
    src/validators
    supabase/schema.sql
    supabase/seed.sql
  README.md
  REPORT_GUIDE.md
```

## Prérequis
- Node.js >= 18
- Projet Supabase (Postgres)

## Configuration

### 1) Base de données (Supabase)
Exécutez d'abord le schéma puis le seed :
- `server/supabase/schema.sql`
- `server/supabase/seed.sql`

Le seed crée un utilisateur démo :
- Email: `admin@example.com`
- Mot de passe: `AdminPass123!`

### 2) Variables d'environnement

Backend `server/.env`
```
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/dbname
DIRECT_URL=postgresql://user:password@host:5432/dbname
TOKEN_SECRET=change-me
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_DAYS=7
CORS_ORIGIN=http://localhost:5173
```

Frontend `client/.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Lancer le projet
```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd ../client
npm install
npm run dev
```

## Authentification (JWT + Refresh)
- `POST /api/auth/login` → retourne `access_token`, `refresh_token`, `user`
- `POST /api/auth/refresh` → retourne un nouvel `access_token`
- `POST /api/auth/logout` → invalide le refresh token
- `POST /api/auth/register` → crée un utilisateur + tokens

Stockage client (localStorage):
- `mystudyplanner_access`
- `mystudyplanner_refresh`
- `mystudyplanner_user`

Les routes `/api/tasks` et `/api/me` exigent l’en-tête:
```
Authorization: Bearer <access_token>
```

## API (Tâches)
- `GET /api/tasks` (query: `subject`, `status`, `priority`, `search`)
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/status`

## UI / UX
- Dashboard: stats + échéances + table paginée
- Page Tâches: filtres + CRUD + pagination
- Profil: mise à jour nom / mot de passe

## Sécurité
- Aucun accès Supabase côté client.
- Le client appelle uniquement l’API Express.
- Les secrets sont côté serveur (`TOKEN_SECRET`, `DATABASE_URL`).

## Dépannage
- **401**: token manquant/expiré → reconnectez-vous.
- **CORS**: vérifier `CORS_ORIGIN`.
- **DB**: vérifier que `schema.sql` + `seed.sql` sont exécutés.

## Screenshots
Ajoutez vos captures d’écran ici (login, dashboard, profil).
