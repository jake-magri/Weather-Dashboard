import { Router } from 'express'; // import router with routes
const router = Router(); // initialize router

import apiRoutes from './api/index.js'; // import api index.js and html routes
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes); // mount api and html routes
router.use('/', htmlRoutes);

export default router; // export router with new routes
