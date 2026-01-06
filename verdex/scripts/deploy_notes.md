Deployment notes:
- Set backend env vars (MONGODB_URI, OPENAI_API_KEY, JWT_SECRET) on your host (Render, Railway, or VPS)
- Build frontend: `cd frontend && npm install && npm run build`
- Serve frontend on Vercel or static host. Configure NEXT_PUBLIC_API_URL to backend URL.
