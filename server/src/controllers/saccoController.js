import prisma from '../database.js';
import { getSaccoStats, getSaccoRecentActivities, getSaccoMembers } from '../services/saccoService.js';

export const listSaccosController = async (req, res) => {
  try {
    const saccos = await prisma.sACCO.findMany({
      include: {
        supervisor: {
          select: {
            name: true,
            email: true
          }
        },
        _count: {
          select: { members: true }
        }
      }
    });
    res.status(200).json({ success: true, data: saccos });
  } catch (error) {
    console.error('List SACCOs error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve SACCO network' });
  }
};

export const getStatsController = async (req, res) => {
  try {
    const data = await getSaccoStats(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Get SACCO Stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to get stats' });
  }
};

export const getActivitiesController = async (req, res) => {
  try {
    const data = await getSaccoRecentActivities(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Get SACCO Activities error:', error);
    res.status(500).json({ success: false, message: 'Failed to get activities' });
  }
};

export const getMembersController = async (req, res) => {
  try {
    const data = await getSaccoMembers(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Get SACCO Members error:', error);
    res.status(500).json({ success: false, message: 'Failed to get members' });
  }
};
