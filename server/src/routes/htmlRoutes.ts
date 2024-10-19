// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.use(express.static(path.join(__dirname, '../../../client/dist/index.html')));

//route to serve index.html for the root path
router.get('/', (_req: Request, res: Response) => {
    console.log('GET request received at root path.');
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});
  
export default router;