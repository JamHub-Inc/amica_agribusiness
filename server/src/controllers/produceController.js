import * as produceService from '../services/produceService.js';

export const getUserProduceController = async (req, res) => {
  try {
    const userId = req.user.id;
    const produce = await produceService.getUserProduce(userId);
    res.status(200).json({ success: true, data: produce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProduceController = async (req, res) => {
  try {
    const userId = req.user.id;
    const newProduce = await produceService.addProduce(userId, req.body);
    res.status(201).json({ success: true, data: newProduce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVerificationQueueController = async (req, res) => {
  try {
    const supervisorId = req.user.id;
    const queue = await produceService.getVerificationQueue(supervisorId);
    res.status(200).json({ success: true, data: queue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyProduceController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const verified = await produceService.verifyProduce(parseInt(id), status);
    res.status(200).json({ success: true, data: verified });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMarketplaceController = async (req, res) => {
  try {
    const listings = await produceService.getVerifiedProduce();
    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
