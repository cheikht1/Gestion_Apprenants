
# Gestion des Apprenants - Application SPA

## Description

Cette application web de gestion des apprenants est une Single Page Application (SPA) construite avec du Vanilla JavaScript et utilisant un serveur factice JSON pour la persistance des données. Elle permet de gérer une liste d'apprenants, d'ajouter de nouveaux apprenants, de consulter les détails des apprenants et de les supprimer. L'application utilise également Bootstrap pour le style.

## Structure du Projet

- **index.html**: La page d'accueil qui affiche la liste des apprenants.
- **ajouter.html**: La page qui permet d'ajouter un nouvel apprenant.
- **detail.html**: La page qui affiche les détails d'un apprenant.
- **app.js**: Le fichier JavaScript qui contient la logique principale de l'application.
- **bootstrap/**: Le dossier contenant les fichiers CSS et JS de Bootstrap.
- **static/**: Le dossier contenant les fichiers statiques comme les images et les fichiers CSS personnalisés.

## Fonctionnalités

1. **Liste des Apprenants**:
   - Affiche la liste des apprenants avec leurs prénoms et noms.
   - Permet de voir les détails d'un apprenant ou de le supprimer.

2. **Ajouter un Apprenant**:
   - Formulaire pour ajouter un nouvel apprenant avec les champs nécessaires.
   - Envoie une requête POST au serveur JSON pour enregistrer le nouvel apprenant.

3. **Détails d'un Apprenant**:
   - Affiche les informations détaillées d'un apprenant sélectionné.

4. **Supprimer un Apprenant**:
   - Permet de supprimer un apprenant de la liste et du serveur.

## Installation et Utilisation

1. **Cloner le dépôt**:
   ```bash
   git clone https://github.com/votre-utilisateur/gestion-apprenants.git
   cd gestion-apprenants
   ```

2. **Installer JSON Server**:
   ```bash
   npm install -g json-server
   ```

3. **Démarrer le serveur JSON**:
   ```bash
   json-server --watch db.json --port 3000
   ```

4. **Ouvrir `index.html` dans un navigateur**:
   - Utiliser Live Server ou ouvrir directement le fichier dans un navigateur pour voir l'application en action.

## API

L'application utilise un serveur JSON local pour la persistance des données. Voici les principales routes utilisées :

- **GET /apprenants**: Récupère la liste des apprenants.
- **POST /apprenants**: Ajoute un nouvel apprenant.
- **DELETE /apprenants/:id**: Supprime un apprenant par ID.

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence

Ce projet est sous licence MIT.
