import express from 'express';
import { 
  getMarketPricesController, 
  getPriceInsightsController,
  createMarketPriceController,
  updateMarketPriceController,
  deleteMarketPriceController
} from '../controllers/marketController.js';
import { protect, protectAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/prices', protect, getMarketPricesController);
router.get('/insights', protect, getPriceInsightsController);

// Admin only operations
router.post('/prices', protect, protectAdmin, createMarketPriceController);
router.patch('/prices/:id', protect, protectAdmin, updateMarketPriceController);
router.delete('/prices/:id', protect, protectAdmin, deleteMarketPriceController);

export default router;

