# Étape 1 : Construction de l'application React avec Node.js
FROM node:23-alpine as build

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers du projet
COPY . .

# Transpiler le projet avec Babel
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# Étape 2 : Utilisation de Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers générés par le build
COPY --from=build /app/build /usr/share/nginx/html

# Ajouter une configuration personnalisée pour gérer le routage React
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour le client
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
