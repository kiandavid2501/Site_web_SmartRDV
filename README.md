# SmartRDV – Application de gestion de rendez-vous

Description

SmartRDV est une application web permettant de gérer des rendez-vous entre utilisateurs et professionnels (médecins, consultants, services, etc.).

Le projet est construit avec une architecture **Full Stack moderne** :

* Frontend : React
* Backend : Spring Boot
* API REST
* Base de données relationnelle


## Architecture du projet

smart-rdv
 backend        → API Spring Boot 
 frontend       → Interface utilisateur React


##  Frontend (React)

Technologies utilisées :

* React
* Axios
* HTML / tailwind css
* JavaScript

Installation :

```bash
cd frontend
npm install
npm start
```

Application disponible sur :

```
http://localhost:3000
```

---

##  Backend (Spring Boot)

Technologies utilisées :

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Lombok
* Base de données SQL

Installation :

```bash
cd backend
mvn spring-boot:run
```

API disponible sur :

```
http://localhost:8080
```

---

##  Communication Frontend / Backend

Le frontend communique avec le backend via API REST.

Exemple d'appel API :

```
GET /api/appointments
POST /api/appointments
```

---

## 📊 Fonctionnalités prévues

* Création de compte utilisateur
* Authentification
* Prise de rendez-vous
* Gestion des rendez-vous
* Tableau de bord utilisateur
* Notifications


##  Auteur

Projet développé par plusieur developpeurs dans le cadre d'un projet d'apprentissage Full Stack.

