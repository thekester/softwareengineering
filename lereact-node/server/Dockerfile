# Utilise une image Node officielle
FROM node:18-alpine

# Crée et utilise un répertoire de travail
WORKDIR /app

# Copie package.json et installe les dépendances
COPY package.json ./
RUN npm install

# Copie le reste des fichiers
COPY . .

# Expose le port
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "start"]
