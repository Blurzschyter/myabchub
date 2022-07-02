import express from 'express';
const router = express.Router();
import {
  register,
  login,
  updateUser,
  userListing,
} from '../controllers/authController.js';
import { authenticateUser, authorizePermissions } from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    'Too many requests from this IP address, please try again after 15 minutes.',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, updateUser);
router
  .route('/users')
  .get(authenticateUser, authorizePermissions('admin'), userListing);

export default router;
