import * as adminService from '../services/adminService.js';
import * as userService from '../services/userService.js';

export const getSystemStatsController = async (req, res) => {
  try {
    const stats = await adminService.getSystemStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSystemActivityController = async (req, res) => {
  try {
    const activities = await adminService.getSystemRecentActivity();
    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getUsersController = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createUserController = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSaccosController = async (req, res) => {
  try {
    const saccos = await adminService.getAllSaccos();
    res.status(200).json({ success: true, data: saccos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProduceController = async (req, res) => {
  try {
    const produce = await adminService.getAllProduce();
    res.status(200).json({ success: true, data: produce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllLoansController = async (req, res) => {
  try {
    const loans = await adminService.getAllLoans();
    res.status(200).json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardChartsController = async (req, res) => {
  try {
    const charts = await adminService.getDashboardCharts();
    res.status(200).json({ success: true, data: charts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSaccoController = async (req, res) => {
  try {
    const sacco = await adminService.createSacco(req.body);
    res.status(201).json({ success: true, data: sacco });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSaccoController = async (req, res) => {
  try {
    const { id } = req.params;
    const sacco = await adminService.updateSacco(id, req.body);
    res.status(200).json({ success: true, data: sacco });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSaccoController = async (req, res) => {
  try {
    const { id } = req.params;
    const sacco = await adminService.getSaccoById(id);
    res.status(200).json({ success: true, data: sacco });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


