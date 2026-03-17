import prisma from '../database.js';

export const getMarketPrices = async () => {
  return await prisma.marketPrice.findMany({
    orderBy: { date: 'desc' }
  });
};

export const getPriceInsights = async (location) => {
  // Mock logic or AI calls can go here
  return [
    { text: "Demand for Maize is rising in Nairobi region.", trend: 'UP' },
    { text: "Tomato supply is peaking in Central, prices expected to dip.", trend: 'DOWN' }
  ];
};

export const createMarketPrice = async (data) => {
  return await prisma.marketPrice.create({
    data: {
      commodity: data.commodity,
      price: parseFloat(data.price),
      unit: data.unit,
      region: data.region,
      trend: data.trend || 'STABLE'
    }
  });
};

export const updateMarketPrice = async (id, data) => {
  return await prisma.marketPrice.update({
    where: { id: parseInt(id) },
    data: {
      price: data.price ? parseFloat(data.price) : undefined,
      trend: data.trend,
      region: data.region,
      unit: data.unit,
      commodity: data.commodity
    }
  });
};

export const deleteMarketPrice = async (id) => {
  return await prisma.marketPrice.delete({
    where: { id: parseInt(id) }
  });
};
