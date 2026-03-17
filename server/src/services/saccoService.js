import prisma from '../database.js';

export const getSaccoStats = async (supervisorId) => {
  const sacco = await prisma.sACCO.findUnique({
    where: { supervisorId },
    include: {
      members: {
        select: { id: true, createdAt: true }
      }
    }
  });

  if (!sacco) {
    throw new Error('SACCO not found for this supervisor');
  }

  const memberIds = sacco.members.map(m => m.id);

  const [
    memberCount, 
    pendingProduce, 
    pendingLoans, 
    totalProduceWeight,
    totalProduceCount,
    verifiedProduceCount,
    totalLoanCount,
    approvedLoanCount
  ] = await Promise.all([
    prisma.user.count({ where: { saccoId: sacco.id, role: 'FARMER' } }),
    prisma.produce.count({ where: { farmerId: { in: memberIds }, status: 'PENDING' } }),
    prisma.loanRequest.count({ where: { farmerId: { in: memberIds }, status: 'PENDING' } }),
    prisma.produce.aggregate({
      where: { farmerId: { in: memberIds }, status: 'VERIFIED' },
      _sum: { quantity: true }
    }),
    prisma.produce.count({ where: { farmerId: { in: memberIds } } }),
    prisma.produce.count({ where: { farmerId: { in: memberIds }, status: 'VERIFIED' } }),
    prisma.loanRequest.count({ where: { farmerId: { in: memberIds } } }),
    prisma.loanRequest.count({ where: { farmerId: { in: memberIds }, status: 'APPROVED' } })
  ]);

  // Member growth trend over last 6 months
  const now = new Date();
  const growthData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const m = d.toLocaleString('en-US', { month: 'short' });
    const countBeforeDate = sacco.members.filter(m => m.createdAt < new Date(now.getFullYear(), now.getMonth() - i + 1, 1)).length;
    growthData.push({ month: m, members: countBeforeDate });
  }

  // Branch Outlook Percentages
  const processingRate = totalProduceCount > 0 ? Math.round((verifiedProduceCount / totalProduceCount) * 100) : 0;
  const approvalRate = totalLoanCount > 0 ? Math.round((approvedLoanCount / totalLoanCount) * 100) : 0;
  
  // Dummy data for farmer satisfaction for now
  const satisfactionRate = 94; 

  return {
    memberCount,
    pendingProduce,
    pendingLoans,
    totalProduceWeight: totalProduceWeight._sum.quantity || 0,
    saccoName: sacco.name,
    location: sacco.location,
    growthData,
    outlook: {
      processingRate,
      approvalRate,
      satisfactionRate
    }
  };
};

export const getSaccoRecentActivities = async (supervisorId) => {
  const sacco = await prisma.sACCO.findUnique({
    where: { supervisorId },
    include: { members: { select: { id: true } } }
  });

  if (!sacco) return [];

  const memberIds = sacco.members.map(m => m.id);

  const [loans, produce] = await Promise.all([
    prisma.loanRequest.findMany({
      where: { farmerId: { in: memberIds } },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { farmer: { select: { name: true } } }
    }),
    prisma.produce.findMany({
      where: { farmerId: { in: memberIds } },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { farmer: { select: { name: true } } }
    })
  ]);

  const activities = [
    ...loans.map(l => ({
      id: `loan-${l.id}`,
      type: 'Loan',
      farmer: l.farmer.name,
      item: `KES ${l.amount.toLocaleString()}`,
      status: l.status,
      createdAt: l.createdAt
    })),
    ...produce.map(p => ({
      id: `produce-${p.id}`,
      type: 'Produce',
      farmer: p.farmer.name,
      item: `${p.quantity}${p.unit} ${p.name}`,
      status: p.status,
      createdAt: p.createdAt
    }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return activities;
};

export const getSaccoMembers = async (supervisorId) => {
  const sacco = await prisma.sACCO.findUnique({
    where: { supervisorId },
  });

  if (!sacco) {
    throw new Error('SACCO not found for this supervisor');
  }

  return await prisma.user.findMany({
    where: { saccoId: sacco.id, role: 'FARMER' },
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      status: true,
      createdAt: true,
      _count: {
        select: { produce: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};
