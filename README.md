
# Software Engineering - Practical Exercises

Welcome to this repository showcasing my hands-on exercises from the **Software Engineering** course. This README explains the purpose of each folder and provides instructions for running and testing the projects.

---

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Folder Explanations](#folder-explanations)
4. [Installation & Usage](#installation--usage)
5. [Improvements & Notes](#improvements--notes)
6. [License](#license)

---

## Overview

This repository includes:
- A **Node.js** backend handling CSV file operations and API functionalities.
- A **React** frontend that validates phone numbers and processes CSV files.
- Python implementations of design patterns and validation tools.
- Java applications with Maven and Docker integration.
- Comprehensive tests for backend, frontend, Python scripts, and Java programs.

---

## Project Structure

```bash
.
├── exoObserver          # Python Observer pattern example
├── katatel              # Node.js and Python phone number validation
├── lereact-node         # React and Node.js integration with Docker
├── javatp               # Java applications with Maven and Docker
├── .github/workflows    # CI/CD workflows for GitHub Actions
├── requirements.txt     # Python dependencies
├── LICENSE              # License file
└── README.md            # Documentation (you are here!)
```

---

## Folder Explanations

### `javatp`
- **Description**: Implements and showcases Java programming concepts, including building and running Java projects with Docker and Maven.
- **Highlights**:
  - Utilizes Maven for building and packaging Java applications.
  - Includes Docker configuration for containerized Java application deployment.
- **Main Files**:
  - `pom.xml`: Maven configuration file defining dependencies and plugins.
  - `Dockerfile`: Docker setup for building and running the Java application.
  - `Felin.java`, `Chat.java`, `Tigre.java`: Java files demonstrating inheritance and method overriding.
  - `Main.java`: Entry point for the Java application.

- **Usage**:
  1. Build and package the project with Maven:
     ```bash
     mvn clean package
     ```
  2. Compile the Java classes:
     ```bash
     javac -d target/classes src/main/java/*.java
     ```
  3. Run the application:
     ```bash
     java -cp target/classes Felin
     ```
  4. Build and run with Docker:
     ```bash
     docker build -t java-docker-app .
     docker run --rm java-docker-app
     ```

---

## Installation & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/softwareengineering.git
cd softwareengineering
```

### 2. Python (Optional Testing)
- Install dependencies and run tests for Python scripts:
  ```bash
  pip install -r requirements.txt
  pytest
  ```

### 3. Node.js Backend (Katatel)
```bash
cd katatel
npm install
npm test
```

### 4. React & Node Integration (lereact-node)
1. **Navigate to the folder**:
   ```bash
   cd ../lereact-node
   ```
2. **Start with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   - Backend API available at `http://localhost:3001`.
   - React client available at `http://localhost:3000`.

3. **Swagger Documentation**:
   ```
   http://localhost:3001/api-docs
   ```

### 5. Running `exoObserver`
1. **Install the package in editable mode**:
   ```bash
   pip install -e .
   ```
2. **Run the program**:
   ```bash
   exoObserver
   ```
   Example output:
   ```
   Capteur: Vitesse changée à 50 km/h
   Abonné 1 a reçu la vitesse : 50 km/h
   Abonné 2 a reçu la vitesse : 50 km/h
   TableauDeBord: Vitesse mise à jour à 50 km/h. Historique : ['50 km/h']
   Capteur: Vitesse changée à 80 km/h
   Abonné 1 a reçu la vitesse : 80 km/h
   Abonné 2 a reçu la vitesse : 80 km/h
   TableauDeBord: Vitesse mise à jour à 80 km/h. Historique : ['50 km/h', '80 km/h']
   ```

---

## Improvements & Notes

- Added **comprehensive tests**, including **mock-based tests** for Python components (exoObserver).
- Enhanced **CSV file handling** with robust error handling.
- Configured **Docker** for seamless development and deployment.
- Integrated **GitHub Actions** for continuous integration.
- Improved Python Observer pattern to include robust testing and clear examples.
- Added detailed Swagger documentation for API endpoints.
- Introduced **modern testing practices** (e.g., mocks and error simulations) to ensure system reliability.
- Introduced Java programming practices with Maven and Docker.

---

## License

This project is licensed under the [MIT License](./LICENSE).

© 2025 Avenel Théophile
