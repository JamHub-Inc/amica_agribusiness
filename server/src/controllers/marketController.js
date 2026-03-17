import * as marketService from '../services/marketService.js';

export const getMarketPricesController = async (req, res) => {
  try {
    const prices = await marketService.getMarketPrices();
    res.status(200).json({ success: true, data: prices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPriceInsightsController = async (req, res) => {
  try {
    const location = req.query.location;
    const insights = await marketService.getPriceInsights(location);
    res.status(200).json({ success: true, data: insights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMarketPriceController = async (req, res) => {
  try {
    const price = await marketService.createMarketPrice(req.body);
    res.status(201).json({ success: true, data: price });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMarketPriceController = async (req, res) => {
  try {
    const price = await marketService.updateMarketPrice(req.params.id, req.body);
    res.status(200).json({ success: true, data: price });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMarketPriceController = async (req, res) => {
  try {
    await marketService.deleteMarketPrice(req.params.id);
    res.status(200).json({ success: true, message: 'Market price deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
