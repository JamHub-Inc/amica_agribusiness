import express from 'express';
import { 
  getSystemStatsController, 
  getSystemActivityController,
  getUsersController,
  createUserController,
  getAllSaccosController,
  createSaccoController,
  updateSaccoController,
  getSaccoController,
  getAllProduceController,
  getAllLoansController,
  getDashboardChartsController
} from '../controllers/adminController.js';
import { protect, protectAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, protectAdmin, getSystemStatsController);
router.get('/activities', protect, protectAdmin, getSystemActivityController);
router.get('/users', protect, protectAdmin, getUsersController);
router.post('/users', protect, protectAdmin, createUserController);
router.get('/saccos', protect, protectAdmin, getAllSaccosController);
router.post('/saccos', protect, protectAdmin, createSaccoController);
router.get('/saccos/:id', protect, protectAdmin, getSaccoController);
router.patch('/saccos/:id', protect, protectAdmin, updateSaccoController);
router.get('/produce', protect, protectAdmin, getAllProduceController);
router.get('/loans', protect, protectAdmin, getAllLoansController);
router.get('/charts', protect, protectAdmin, getDashboardChartsController);


export default router;
