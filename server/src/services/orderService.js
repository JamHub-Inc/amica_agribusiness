import prisma from '../database.js';

export const createOrder = async (buyerId, orderData) => {
  let farmerId = orderData.farmerId;
  if (!farmerId) {
    const produce = await prisma.produce.findUnique({ where: { id: orderData.produceId } });
    if (!produce) throw new Error('Produce not found');
    farmerId = produce.farmerId;
  }

  return await prisma.order.create({
    data: {
      buyerId,
      farmerId,
      produceId: orderData.produceId,
      quantity: parseFloat(orderData.quantity),
      totalPrice: parseFloat(orderData.totalPrice),
      status: 'PENDING',
    }
  });
};

export const getVendorOrders = async (buyerId) => {
  return await prisma.order.findMany({
    where: { buyerId },
    include: {
      produce: true,
      farmer: {
        select: {
          name: true,
          location: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getFarmerOrders = async (farmerId) => {
  return await prisma.order.findMany({
    where: { farmerId },
    include: {
      produce: true,
      buyer: {
        select: {
          name: true,
          location: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const updateOrderStatus = async (orderId, status) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};
