# TrivinTech

Monorepo for the Trivin application (client + server).

## Overview

- `client/` — React + Vite frontend
- `server/` — Express + MongoDB backend

This repo contains the website, admin interfaces, and an API for user queries.

## Quick start

Prerequisites: Node.js (16+), npm, and a running MongoDB instance.

1. Start the server

```bash
cd server
npm install
cp .env.example .env   # set MONGODB_URI and JWT_SECRET and other env vars
npm run dev
```

2. Start the client

```bash
cd client
npm install
npm run dev
```

The client defaults to `http://localhost:5173` and the server to `http://localhost:5000`.

## API (important endpoints)

- `POST /api/queries` — create a user query (requires auth)
- `GET /api/queries/me` — list user's queries (requires auth)
- `GET /api/queries` — admin: list all queries (requires admin)
- `POST /api/queries/:id/response` — admin: respond to a query (requires admin)

## Environment variables

Server `.env` should include at least:

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `CLIENT_URL` — (optional) allowed client origin

Client `.env` (Vite) may include:

- `VITE_API_URL` — API base URL (default `http://localhost:5000/api`)

## Admin

Create a user and set `role: 'admin'` in the database to access admin routes.

## License

This project is provided by the repository owner.

# Trivin Tech MERN

## Setup

### 1) Install dependencies

Client:

```
cd client
npm install
```

Server:

```
cd server
npm install
```

### 2) Configure environment variables

- Copy [server/.env.example](server/.env.example) to `server/.env` and fill in values.
- Copy [client/.env.example](client/.env.example) to `client/.env` and fill in values.

Note: Rotate any credentials that were shared previously. Keep all secrets in `.env` files only.

### 3) Run

Server:

```
cd server
npm run dev
```

Client:

```
cd client
npm run dev
```

The client defaults to http://localhost:5173 and the server to http://localhost:5000.
