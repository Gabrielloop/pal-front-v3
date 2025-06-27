# Verso – Frontend

Interface utilisateur de l’application **Verso**, outil personnel de gestion de lectures. Ce frontend est une SPA développée en **Vue 3** avec **Pinia**, **Vue Router** et **Vite**. Elle interagit avec une API REST Laravel sécurisée (backend).

## 🚀 Fonctionnalités principales

- Connexion sécurisée via token JWT
- Recherche de livres via l’API de la BNF
- Ajout de livres à des listes personnalisées (wishlist, favoris, lectures en cours, etc.)
- Ajout de commentaires, notes, et suivi de lecture
- Interface responsive mobile / tablette / desktop
- Thème clair/sombre

## 🛠️ Technologies

- [Vue.js 3 (Composition API)](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)
- [Toastify](https://apvarun.github.io/toastify-js/)
- [Tailwind CSS](https://tailwindcss.com/) _(via CDN ou intégré au backend pour certaines vues)_

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔐 Sécurité

- Authentification via JWT (Laravel Sanctum)
- Gardes de navigation (router.beforeEach)
- Stockage sécurisé du token dans localStorage et synchronisation avec Pinia

## 🧪 Tests manuels

- Vérification des routes protégées
- Tests de formulaire (validation, erreurs serveur)
- Feedback utilisateur (messages, transitions)

## 📁 Structure des routes

```bash
/login            → Connexion
/dashboard        → Tableau de bord
/search           → Recherche de livres
/list             → Liste des lectures
/profile          → Profil utilisateur
/admin/*          → Pages d’administration
```

## 📝 Auteur

Gabriel HENIN – Projet de certification TP Développeur Web et Web Mobile
