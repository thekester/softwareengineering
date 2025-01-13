# Utilise une image Node officielle pour builder l'app React
FROM node:18-alpine as build

WORKDIR /app

# Copie package.json et installe les dépendances
COPY package.json ./
RUN npm install

# Copie le reste du code et build l'application
COPY . .

# Définir la variable d'environnement pour utiliser le legacy provider
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

# Utilise un serveur nginx pour servir les fichiers statiques buildés
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port par défaut de nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
