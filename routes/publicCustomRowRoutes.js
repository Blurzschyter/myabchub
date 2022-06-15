import express from 'express';
const router = express.Router();
import { getDynamicPlaytvHome } from '../controllers/publicCustomRowController.js';

router.route('/').get(getDynamicPlaytvHome);

export default router;
