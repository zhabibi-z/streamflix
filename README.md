# Streamflix

A Netflix-inspired video streaming interface built with React, Vite, and Firebase. Supports user authentication (sign up / log in / log out), a TMDB-powered movie catalogue, and video playback.

**Live demo:** [video-streaming-369.netlify.app](https://video-streaming-369.netlify.app)

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router 7 |
| Build | Vite 6 |
| Auth & DB | Firebase 11 (Auth + Firestore) |
| Data | TMDB API |
| Hosting | Netlify |
| Lint | ESLint 9 |

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env
# Add VITE_FIREBASE_API_KEY and VITE_TMDB_TOKEN

# 3. Run dev server
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_TMDB_TOKEN` | TMDB read-access token |

Copy `.env.example` → `.env` and fill in values. Never commit `.env`.

## Directory structure

```
.
├── public/                 # Static assets (favicon, banner)
├── src/
│   ├── assets/             # Images and card data
│   ├── components/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   └── TitleCards/     # Movie card grid with TMDB fetch
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Player/         # Video player page
│   ├── firebase.js         # Firebase init, auth helpers (signup/login/logout)
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   └── ARCHITECTURE.md
├── .env.example
└── vite.config.js
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build locally |

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design details.
