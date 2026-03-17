import * as orderService from '../services/orderService.js';

export const createOrderController = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const order = await orderService.createOrder(buyerId, req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVendorOrdersController = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const orders = await orderService.getVendorOrders(buyerId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFarmerOrdersController = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const orders = await orderService.getFarmerOrders(farmerId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await orderService.updateOrderStatus(parseInt(id), status);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
