Backend README — RealityResume

Endpoints (selected):
- POST /auth/signup — {name,email,password}
- POST /auth/login — {email,password}
- POST /api/events — (auth) ingest events {type, provider, timestamp, meta}
- GET /api/skills — (auth) list skills for user
- POST /ai/summarize/:skillId — (auth) call OpenAI summarizer for a skill

Run locally:
```bash
cd backend
npm install
cp ../.env.example .env
npm run dev
```
