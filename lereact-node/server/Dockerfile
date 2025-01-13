# Étape 1 : Utilisation de Node.js pour le backend
FROM node:23-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers du serveur
COPY . .

# Exposer le port 3001 pour le serveur
EXPOSE 3001

CMD ["npm", "start"]
