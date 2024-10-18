import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.use(express.static('../client/dist'));

// Fallback route to serve 'index.html' for client-side routing
router.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});
  
export default router;