import express from 'express';
const router = express.Router();
import {
  register,
  login,
  updateUser,
  registerMSSQL,
  loginMSSQL,
  updateUserMSSQL,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    'Too many requests from this IP address, please try again after 15 minutes.',
});

router.route('/register').post(apiLimiter, register);
// router.route('/register').post(apiLimiter, registerMSSQL);
router.route('/login').post(apiLimiter, login);
// router.route('/login').post(apiLimiter, loginMSSQL);
router.route('/updateUser').patch(authenticateUser, updateUser);
// router.route('/updateUser').patch(authenticateUser, updateUserMSSQL);

export default router;
