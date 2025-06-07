# Educative API

API de gestion éducative avec Express, TypeScript et PostgreSQL

## Prérequis

- Node.js (version 18 ou supérieure)
- Docker et Docker Compose
- npm ou yarn

## Installation

1. Cloner le repository

```bash
git clone [URL_DU_REPO]
cd educative-api
```

2. Installer les dépendances

```bash
npm install
```

## Configuration

1. Copier le fichier `.env.backend` en `.env`

```bash
cp .env.backend .env

```

## Démarrage avec Docker

1. Construire et démarrer les services

```bash
docker compose up --build -d
```

2. Les services suivants seront démarrés :

   - PostgreSQL (port 5432)
   - pgAdmin (port 5050)
   - Temporal (port 7233)
3. Accéder aux services :

   - pgAdmin : http://localhost:5050
     - Email : admin@admin.com
     - Mot de passe : admin
   - API : http://localhost:3000
   - Documentation Swagger : http://localhost:3000/api-docs

## Démarrage en local

1. Démarrer le serveur de développement

```bash
npm run dev
```

2. L'API sera accessible sur http://localhost:3000

## Structure du projet

```
educative-api/
├── src/
│   ├── controllers/     # Controllers des routes
│   ├── db/             # Schéma et configuration de la base de données
│   ├── routes/         # Routes de l'API
│   └── index.ts        # Point d'entrée de l'application
├── drizzle.config.ts   # Configuration Drizzle
└── package.json        # Dépendances et scripts
```

## Scripts disponibles

- `npm run dev` : Démarrer le serveur de développement
- `npm run build` : Compiler le projet TypeScript
- `npm start` : Démarrer le serveur en production
- `npm run test` : Exécuter les tests
- `npx tsx src/db/seed.ts` : lancer le seeder

## Documentation de l'API

La documentation Swagger est disponible sur http://localhost:3000/api-docs

## Technologies utilisées

- Backend : Express.js + TypeScript
- Base de données : PostgreSQL
- ORM : Drizzle ORM
- Documentation : Swagger UI
- Queue : Temporal
- Gestion des variables d'environnement : dotenv

## Contribution

1. Créer une branche pour votre fonctionnalité
2. Commiter vos changements
3. Pusher la branche
4. Créer une Pull Request

