import prisma from '../database.js';

export const createDemandListing = async (vendorId, data) => {
  return await prisma.demandListing.create({
    data: {
      vendorId,
      cropName: data.cropName,
      quantity: data.quantity,
      price: parseFloat(data.price),
      category: data.category || 'General',
      urgent: data.urgent || false,
      active: true,
    }
  });
};

export const getActiveDemandListings = async () => {
  return await prisma.demandListing.findMany({
    where: { active: true },
    include: {
      vendor: {
        select: {
          name: true,
          location: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getVendorDemandListings = async (vendorId) => {
  return await prisma.demandListing.findMany({
    where: { vendorId },
    orderBy: { createdAt: 'desc' }
  });
};

export const deleteDemandListing = async (id, vendorId) => {
  return await prisma.demandListing.deleteMany({
    where: { id, vendorId }
  });
};
