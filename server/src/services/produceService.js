import prisma from '../database.js';

export const getUserProduce = async (userId) => {
  return await prisma.produce.findMany({
    where: { farmerId: userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const addProduce = async (userId, produceData) => {
  return await prisma.produce.create({
    data: {
      farmerId: userId,
      name: produceData.name,
      variety: produceData.variety,
      quantity: parseFloat(produceData.quantity),
      unit: produceData.unit || 'KG',
      price: parseFloat(produceData.price),
      status: 'PENDING',
      harvestDate: produceData.harvestDate ? new Date(produceData.harvestDate) : null,
    },
  });
};

export const getVerificationQueue = async (supervisorId) => {
  // Fetch produce from farmers who belong to the SACCO managed by this supervisor
  return await prisma.produce.findMany({
    where: {
      farmer: {
        sacco: {
          supervisorId: supervisorId
        }
      }
    },
    include: {
      farmer: {
        select: {
          name: true,
          location: true
        }
      }
    },
    orderBy: { createdAt: 'asc' },
  });
};

export const verifyProduce = async (produceId, status) => {
  return await prisma.produce.update({
    where: { id: produceId },
    data: {
      status: status, // VERIFIED or REJECTED
      verifiedAt: status === 'VERIFIED' ? new Date() : null,
    },
  });
};

export const getVerifiedProduce = async () => {
  return await prisma.produce.findMany({
    where: { status: 'VERIFIED' },
    include: {
      farmer: {
        select: {
          name: true,
          location: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  });
};
