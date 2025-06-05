# Étape 1: Construction
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# On copie package.json & package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

RUN npm ci

# On copie le reste du code source
COPY . .

# On compile le TypeScript
RUN npm run build

# Étape finale: image allégée
FROM node:20-alpine

WORKDIR /usr/src/app

# Copier les fichiers buildés depuis builder
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.env ./.env

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD [ "node", "dist/index.js" ]