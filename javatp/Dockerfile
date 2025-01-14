# Étape 1 : Utiliser une image Maven officielle pour la construction
FROM maven:3.9.0-eclipse-temurin-17 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour Maven
COPY pom.xml .
COPY src ./src

# Compiler et empaqueter l'application
RUN mvn clean package -DskipTests

# Étape 2 : Utiliser une image Java officielle pour l'exécution
FROM openjdk:17-jdk-slim

# Copier le JAR généré dans l'image
COPY --from=build /app/target/javatp-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar

# Commande de démarrage
CMD ["java", "-jar", "app.jar"]
