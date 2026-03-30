import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
  getAllUsersController,
  getCurrentUserController,
  deleteUserController,
  updateUserController,
  createUserController,
  getUserByIdController,
// userHeartbeatController,

  sendUserEmailController,
  verifyEmailController,
  resendVerificationController,
  joinSaccoController
} from '../controllers/authController.js';

import {
  requestPasswordResetController,
  validateResetTokenController,
  resetPasswordController,
  changePasswordController,
} from '../controllers/passwordResetController.js';

import { protect, protectAdmin } from '../middlewares/authMiddleware.js';
import { autoRefreshToken } from '../utils/tokenUtils.js';

const router = express.Router();

// Public routes
router.post('/register', registerController); // primary route
router.post('/signup', registerController);   // alias
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/refresh-token', refreshTokenController);
router.post('/verify-email', protect, verifyEmailController);
router.post('/resend-verification', protect, resendVerificationController);
router.post('/password/request-reset', requestPasswordResetController);
router.get('/password/validate-reset/:token', validateResetTokenController);
router.post('/password/reset', resetPasswordController);

// Protected routes
router.use(protect);
router.post('/password/change', changePasswordController);
router.get('/me', getCurrentUserController);
// router.post('/heartbeat', userHeartbeatController);

router.post('/join-sacco', joinSaccoController);

// Admin only routes
router.get('/', protectAdmin, getAllUsersController);
router.get('/:id', protectAdmin, getUserByIdController);
router.post('/', protectAdmin, createUserController);
router.put('/:id', protectAdmin, updateUserController);
router.delete('/:id', protectAdmin, deleteUserController);
router.post('/:id/email', protectAdmin, sendUserEmailController);

router.use(autoRefreshToken);

export default router;