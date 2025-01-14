
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
- Comprehensive tests for backend, frontend, and Python scripts, including the use of **mock-based tests** for enhanced flexibility and robustness.

---

## Project Structure

```bash
.
├── exoObserver          # Python Observer pattern example
├── katatel              # Node.js and Python phone number validation
├── lereact-node         # React and Node.js integration with Docker
├── .github/workflows    # CI/CD workflows for GitHub Actions
├── requirements.txt     # Python dependencies
├── LICENSE              # License file
└── README.md            # Documentation (you are here!)
```

---

## Folder Explanations

### `exoObserver`
- **Description**: Implements the Observer design pattern in Python.
- **Highlights**:
  - Demonstrates the classic Observer pattern using `Capteur`, `Subscriber`, and `TableauDeBord` classes.
  - Integrates **mock-based tests** to simulate observer behaviors and ensure error resilience.
- **Main Files**:
  - `Capteur.py`: A class that notifies observers when the speed changes.
  - `Subscriber.py`: A subscriber that reacts to speed changes.
  - `TableauDeBord.py`: Maintains a history of speed changes.
  - `main.py`: Entry point demonstrating the pattern.
  - `test_exoObserver.py`: Unit tests for core functionality.
  - `test_exoObserver_mocks.py`: Mock tests for verifying notification behaviors and exception handling.

### `katatel`
- **Description**: Focuses on phone number validation in Node.js and Python.
- **Main Files**:
  - `phoneNumberValidation.js`: Validates French phone numbers using regex.
  - `phone_validator.py`: Python implementation of the same validation.
  - `test_phone_number_validator.py`: Pytest-based tests for the Python validator.
  - `phoneNumberValidation.test.js`: Jest-based tests for the Node.js validator.

### `lereact-node`
- **Description**: Combines React and Node.js for full-stack development.
- **Subfolders**:
  - `client`: React app to validate phone numbers and read CSV files.
    - Includes Docker setup and tests with Jest.
  - `server`: Node.js backend for CSV file handling and API endpoints.
    - Swagger documentation for APIs.
- **Main Files**:
  - `docker-compose.yml`: Builds and runs the client and server together.
  - `Dockerfile`: Separate Dockerfiles for client and server.
  - `App.js`: React app entry point for UI functionality.
  - `server.js`: Node.js app entry point for backend functionalities.

### `.github/workflows`
- **Description**: Contains CI/CD workflows for automation using GitHub Actions.
- **Main Files**:
  - `run-tests.yml`: Runs Jest tests for React and Node.js.
  - `pytest.yml`: Runs Pytest for Python-based tests.

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

---

## License

This project is licensed under the [MIT License](./LICENSE).

© 2025 Avenel Théophile
