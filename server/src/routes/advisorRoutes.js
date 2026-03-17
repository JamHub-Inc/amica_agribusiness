import express from 'express';
import { getFarmingAdviceController, getWeatherController } from '../controllers/advisorController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/advice', protect, getFarmingAdviceController);
router.post('/advice', protect, getFarmingAdviceController);
router.get('/weather', protect, getWeatherController);

export default router;
