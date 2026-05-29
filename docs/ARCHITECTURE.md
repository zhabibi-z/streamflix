# Architecture — Streamflix

## Overview

A single-page React application that mimics the Netflix interface. Authentication and user data are handled by Firebase; movie catalogue data is fetched from TMDB at runtime.

## Component Map

```
App.jsx  (React Router routes)
  ├── /login     →  pages/Login/     — email/password auth (Firebase Auth)
  │                  signup + login forms, toast error feedback
  │
  └── /          →  pages/Home/      — authenticated home
        ├── Navbar                   — logo, profile menu, sign-out
        ├── TitleCards               — TMDB API fetch → movie card grid
        │     VITE_TMDB_TOKEN read from env at build time
        └── Player                   — embedded video player
```

## Data Flow

```
User action (signup / login)
        │
        ▼  firebase.js
   Firebase Auth          ←──  VITE_FIREBASE_API_KEY (env var)
        │  createUserWithEmailAndPassword
        │  signInWithEmailAndPassword
        │
        ▼
   Firestore              — stores { uid, name, email, authProvider }
        │
        ▼
   React state + React Router — redirects to /home on success

Movie catalogue:
   TitleCards component
        │  fetch()
        ▼
   TMDB API               ←──  VITE_TMDB_TOKEN (env var, bearer header)
        │
        ▼
   Movie card grid (title, poster, rating)
```

## Security

- `VITE_FIREBASE_API_KEY` and `VITE_TMDB_TOKEN` are read from environment variables — never hardcoded in source.
- Non-secret Firebase config values (authDomain, projectId, appId) are intentionally public — they identify the Firebase project for client-side SDK initialisation and carry no elevated privileges. Firebase Security Rules govern data access server-side.
- `.env` is gitignored; `.env.example` contains placeholder values only.

## Deployment

Hosted on Netlify with continuous deployment from the `main` branch. Environment variables are set in the Netlify dashboard under **Site settings → Environment variables**.

Build command: `npm run build`  
Publish directory: `dist`
