# MyStudyPlanner

Gestionnaire académique pour organiser devoirs, TP et projets par matière. React + Express + stockage JSON (fichier local). Authentification simulée, tableau de bord, filtres et CRUD complet des tâches.

## Fonctionnalités
- ✅ Authentification simulée (login/logout) avec route protégée
- ✅ CRUD tâches (titre, matière, type, statut, priorité, échéance)
- ✅ Bascule statut en cours/terminée
- ✅ Filtres par matière, statut, priorité + recherche texte
- ✅ Tableau de bord (statistiques + échéances à venir)
- ✅ UI responsive (Tailwind), hooks + React Router
- ✅ API REST Express + stockage fichier JSON
- ✅ Script de seed JSON

## Diagramme d'architecture (ASCII)
```
[React (Vite) SPA]
   | axios (Bearer token)
   v
[Express API]
   | fs JSON storage
   v
[tasks.json fichier]
```

## Pile technique
- Frontend: React 18, Vite, React Router DOM, Axios, TailwindCSS
- Backend: Node.js 18+, Express, fs JSON store, uuid, cors, dotenv, morgan
- DB: Fichier JSON (data locale)

## Arborescence
```
MyStudyPlanner/
  client/               # Vite + React
    src/app             # Routing & layout
    src/pages           # Login, Dashboard, Tasks
    src/components      # UI components
    src/context         # Auth context
    src/services        # API clients
    src/utils           # Constantes
  server/               # Express API (stockage fichier)
    src/routes          # auth, tasks
    src/middleware      # authMiddleware
    src/db              # repo fichier JSON
    src/config          # env & constants
    src/validators      # validation tâches
    src/scripts         # seed.js
    data/tasks.json     # données persistées (créé auto)
  README.md
  REPORT_GUIDE.md
  .env.example
  client/.env.example
  server/.env.example
  .gitignore
```

## Prérequis
- Node.js >= 18

## Configuration des variables d'environnement

### Backend `/server/.env`
```
PORT=5000
DEMO_USER=student@example.com
DEMO_PASS=changeme123
TOKEN_SECRET=demo-secret-token
CORS_ORIGIN=http://localhost:5173
```

### Frontend `/client/.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Données (stockage JSON)
Les tâches sont stockées dans `server/src/data/tasks.json`. Si le fichier est absent, il est créé automatiquement. Pour insérer des données de démo:
```
cd server
npm run seed
```

## Installation & lancement
Depuis la racine du repo:

```bash
# Backend
cd server
npm install
npm run dev # lance sur http://localhost:5000

# Frontend (nouveau terminal)
cd ../client
npm install
npm run dev # Vite sur http://localhost:5173
```

Connexion de démo: `student@example.com / changeme123`

## API REST (Express)
Base URL: `/api`

### Auth
- `POST /api/auth/login` body `{ username, password }` -> `{ token, user }`
- `POST /api/auth/logout`

### Tâches (protégées Bearer token)
- `GET /api/tasks` query `subject,status,priority,search`
- `GET /api/tasks/:id`
- `POST /api/tasks` body `{ title, subject, type, status, priority, description?, due_date? }`
- `PUT /api/tasks/:id` body identique pour mise à jour
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/status` body `{ status? }` (bascule si omis)

Exemple de requête avec curl:
```bash
curl -H "Authorization: Bearer demo-secret-token" http://localhost:5000/api/tasks
```

## Notes d'implémentation
- Auth simplifiée: le backend accepte un seul couple `DEMO_USER/DEMO_PASS` et renvoie le token `TOKEN_SECRET` stocké en localStorage côté client.
- Middleware `authMiddleware` vérifie `Authorization: Bearer <TOKEN_SECRET>` pour toutes les routes `/api/tasks`.
- Les IDs de tâches sont des UUID v4. Tri par `due_date` puis `created_at`.
- Stockage: fichier JSON `server/src/data/tasks.json` lu/écrit via `tasksRepo`. Pas de dépendance à Supabase/SQL dans cette version.
- Validation basique côté serveur (`src/validators/taskValidator.js`).

## UI & UX
- Layout responsive mobile-first, cartes de stats, liste de tâches avec badges statut/priorité.
- Formulaire modal pour créer/éditer, avec champs requis et date.
- Filtres persistants sur la page tâches et dashboard.

## Troubleshooting
- **CORS**: assurez-vous que `CORS_ORIGIN` correspond à l'URL Vite.
- **401 Unauthorized**: token manquant ou différent de `TOKEN_SECRET`.
- **Ports**: frontend 5173, backend 5000 (configurable via `PORT`).

## Screenshots
Ajouter vos captures d'écran ici après lancement (login, dashboard, modal de tâche).

## Licence
MIT
