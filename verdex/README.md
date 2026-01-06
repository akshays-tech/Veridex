# RealityResume — Complete Project Package (Full-Stack)

This repository is a **ready-to-upload** full-stack project implementing the RealityResume MVP with:
- Frontend: Next.js + TailwindCSS (polished UI)
- Backend: Express.js API with OpenAI summarizer hooks
- Database: MongoDB (schemas + sample seed script)
- Demo: seeded demo user and sample events
- Authentication: basic JWT auth + OAuth placeholders
- Deployment notes included

## What you'll find
- `/frontend` — Next.js app (Tailwind, pages, sample Dashboard, Resume builder)
- `/backend` — Express API, OpenAI summarizer, MongoDB models, seed script
- `/scripts` — helper scripts to seed demo data
- `.env.example` — environment variables to configure

## Quick start (local)
Prereqs: Node.js (18+), npm, MongoDB running locally or Atlas.

1. Clone repo or unzip package and `cd RealityResume-complete`.
2. Copy env files:
   ```bash
   cp .env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```
3. Install & start backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
4. Install & start frontend (in new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Seed demo data (optional):
   ```bash
   node backend/scripts/seedDemo.js
   ```
6. Open `http://localhost:3000` in your browser.

## OpenAI
The backend includes an AI summarizer endpoint that calls OpenAI's v1/completions or v1/chat/completions.
Put your `OPENAI_API_KEY` in `backend/.env`. The code is ready to call OpenAI; no model key is bundled.

## Uploading to GitHub
- Initialize a git repo and push the folder (all files included). The package is structured for immediate upload.

## License & Notes
MIT — feel free to modify. This package is a working MVP scaffolding; extend features as needed.
