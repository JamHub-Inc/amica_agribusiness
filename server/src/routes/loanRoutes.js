import express from 'express';
import { 
  getLoanSummaryController, 
  applyForLoanController,
  getPendingLoansController,
  updateLoanStatusController
} from '../controllers/loanController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/summary', protect, getLoanSummaryController);
router.post('/apply', protect, applyForLoanController);
router.get('/pending', protect, getPendingLoansController);
router.patch('/:id/status', protect, updateLoanStatusController);

export default router;
