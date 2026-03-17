import * as loanService from '../services/loanService.js';

export const getLoanSummaryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const summary = await loanService.getLoanSummary(userId);
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applyForLoanController = async (req, res) => {
  try {
    const userId = req.user.id;
    const application = await loanService.applyForLoan(userId, req.body);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPendingLoansController = async (req, res) => {
  try {
    const supervisorId = req.user.id;
    const loans = await loanService.getPendingLoans(supervisorId);
    res.status(200).json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLoanStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const supervisorId = req.user.id;
    const updated = await loanService.updateLoanStatus(parseInt(id), supervisorId, status);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
