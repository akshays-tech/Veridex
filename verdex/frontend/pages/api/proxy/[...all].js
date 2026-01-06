// Proxy to backend during dev so the frontend can call /api/* -> http://localhost:4000/*
import fetch from 'node-fetch'
export default async function handler(req,res){
  const {all} = req.query;
  const path = all.join('/');
  const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/' + path;
  const method = req.method;
  const headers = { 'Content-Type': 'application/json' };
  if(req.headers.authorization) headers.authorization = req.headers.authorization;
  const resp = await fetch(url, { method, headers, body: JSON.stringify(req.body) });
  const text = await resp.text();
  res.status(resp.status).send(text);
}
