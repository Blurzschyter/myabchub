import express from 'express';
const router = express.Router();
import {
  getDynamicPlaytvHome,
  getDynamicPlaytvHomeMSSQL,
} from '../controllers/publicCustomRowController.js';

// router.route('/').get(getDynamicPlaytvHome);
router.route('/').get(getDynamicPlaytvHomeMSSQL);

export default router;
