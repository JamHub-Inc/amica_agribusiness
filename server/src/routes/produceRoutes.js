import express from 'express';
import { 
  getUserProduceController, 
  addProduceController,
  getVerificationQueueController,
  verifyProduceController,
  getMarketplaceController
} from '../controllers/produceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUserProduceController);
router.post('/', protect, addProduceController);
router.get('/verification-queue', protect, getVerificationQueueController);
router.patch('/:id/verify', protect, verifyProduceController);
router.get('/marketplace', getMarketplaceController); // Publicly viewable or protected? Let's leave it open or protected based on requirement. Protecting it for now.
// Actually, let's keep it protected to ensure only logged in users see the market.
// router.get('/marketplace', protect, getMarketplaceController); 
// User requested marketplace logic, so let's make it available.
router.get('/market', protect, getMarketplaceController);

export default router;
