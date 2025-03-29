# API de Gestion de Films et de Théâtres

## Description

Cette API permet de gérer des films, des commentaires associés à chaque film et des théâtres/cinémas. Elle expose plusieurs points d'accès pour interagir avec ces entités : récupérer des films, ajouter, modifier ou supprimer des films, gérer les commentaires des films, et gérer les théâtres.

## Fonctionnalités de l'API

### Endpoints principaux

#### **Films**

- **`GET /api/movies`**  
  Récupère tous les films.  

- **`GET /api/movies/:idMovie`**  
  Récupère un film spécifique par son `idMovie`.  

- **`POST /api/movies`**  
  Ajoute un nouveau film.  

- **`PUT /api/movies/:idMovie`**  
  Modifie un film existant par son `idMovie`.  

- **`DELETE /api/movies/:idMovie`**  
  Supprime un film par son `idMovie`.  

#### **Commentaires sur les Films**

- **`GET /api/movies/:idMovie/comments`**  
  Récupère tous les commentaires associés à un film via son `idMovie`.  

- **`GET /api/movies/:idMovie/comments/:idComment`**  
  Récupère un commentaire spécifique d'un film par son `idComment`.  

- **`POST /api/movies/:idMovie/comments`**  
  Ajoute un nouveau commentaire à un film via son `idMovie`.  

- **`PUT /api/movies/:idMovie/comments/:idComment`**  
  Modifie un commentaire existant par son `idComment`.  

- **`DELETE /api/movies/:idMovie/comments/:idComment`**  
  Supprime un commentaire spécifique d'un film par son `idComment`.  

#### **Théâtres/Cinémas**

- **`GET /api/theaters`**  
  Récupère la liste de tous les théâtres et cinémas.  

- **`GET /api/theaters/:idTheater`**  
  Récupère un théâtre ou un cinéma spécifique par son `idTheater`.  

- **`POST /api/theaters`**  
  Ajoute un nouveau théâtre ou cinéma.  

- **`PUT /api/theaters/:idTheater`**  
  Modifie un théâtre ou cinéma existant par son `idTheater`.  

- **`DELETE /api/theaters/:idTheater`**  
  Supprime un théâtre ou cinéma par son `idTheater`.  

---

## Stack Technologique

- **Backend :** Node.js avec Express.js
- **Base de données :** MongoDB (NoSQL)

---

## Installation et Démarrage

### Prérequis

- Node.js
- MongoDB (soit local, soit sur MongoDB Atlas)
- Git
- IDE de votre choix (VSCode)

### Étapes d'installation

1. Clonez ce repository :
   git clone https://github.com/ton-utilisateur/nom-du-repository.git
   cd nom-du-repository

2. Installez les dépendances
   npm install

3. Configurez votre base de données MongoDB
   Ce projet utilise MongoDB comme base de données. Si vous utilisez une base de données locale, assurez-vous que votre instance MongoDB est en cours d'exécution. Si vous préférez utiliser MongoDB Atlas, créez un cluster et obtenez l'URI de connexion à votre base de données.

4. Créez un fichier .env
   À la racine de votre projet, créez un fichier .env contenant les variables d'environnement nécessaires pour configurer votre application.

5. Démarrez l'application
   Vous pouvez maintenant démarrer l'application en exécutant la commande suivante : npm run dev

   L'API sera disponible à l'adresse http://localhost:3000. Vous pouvez utiliser cette URL pour accéder aux différentes routes de l'API.


