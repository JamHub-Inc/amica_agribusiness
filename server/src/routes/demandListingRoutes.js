import express from 'express';
import { 
  createDemandListingController, 
  getActiveDemandListingsController, 
  getVendorDemandListingsController, 
  deleteDemandListingController 
} from '../controllers/demandListingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getActiveDemandListingsController); // All active listings
router.post('/', protect, createDemandListingController);
router.get('/my-listings', protect, getVendorDemandListingsController);
router.delete('/:id', protect, deleteDemandListingController);

export default router;
