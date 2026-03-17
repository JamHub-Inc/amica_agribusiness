import express from 'express';
import { 
  listSaccosController,
  getStatsController,
  getActivitiesController,
  getMembersController
} from '../controllers/saccoController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, listSaccosController);
router.get('/stats', protect, getStatsController);
router.get('/activities', protect, getActivitiesController);
router.get('/members', protect, getMembersController);

export default router;
