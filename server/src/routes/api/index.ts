import { Router } from 'express';
const router = Router(); // importing router to use routes

import weatherRoutes from './weatherRoutes.js'; // import weather routes

router.use('/weather', weatherRoutes); // attaching weather routes on /weather route

export default router; // exporting router with new route
