import express from 'express';
import { 
  createOrderController, 
  getVendorOrdersController, 
  getFarmerOrdersController, 
  updateOrderStatusController 
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrderController);
router.get('/vendor', protect, getVendorOrdersController);
router.get('/farmer', protect, getFarmerOrdersController);
router.patch('/:id/status', protect, updateOrderStatusController);

export default router;
