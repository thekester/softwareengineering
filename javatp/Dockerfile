# Utiliser une image officielle Java comme base
FROM openjdk:17-jdk-slim

# Créer un répertoire pour l'application
WORKDIR /app

# Copier le fichier JAR dans le conteneur
COPY target/app-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar

# Commande pour exécuter l'application
CMD ["java", "-jar", "app.jar"]
