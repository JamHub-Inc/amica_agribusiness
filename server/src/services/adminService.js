import prisma from '../database.js';

export const getSystemStats = async () => {
  const [
    farmerCount,
    supervisorCount,
    vendorCount,
    saccoCount,
    totalProduce,
    totalLoans,
    pendingLoans,
    pendingProduce
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'FARMER' } }),
    prisma.user.count({ where: { role: 'SUPERVISOR' } }),
    prisma.user.count({ where: { role: 'VENDOR' } }),
    prisma.sACCO.count(),
    prisma.produce.aggregate({
      where: { status: 'VERIFIED' },
      _sum: { quantity: true }
    }),
    prisma.loanRequest.aggregate({
      where: { status: 'DISBURSED' },
      _sum: { amount: true }
    }),
    prisma.loanRequest.count({ where: { status: 'PENDING' } }),
    prisma.produce.count({ where: { status: 'PENDING' } })
  ]);

  return {
    farmers: farmerCount,
    supervisors: supervisorCount,
    vendors: vendorCount,
    saccos: saccoCount,
    totalProduceWeight: totalProduce._sum.quantity || 0,
    totalLoansDisbursed: totalLoans._sum.amount || 0,
    pendingActions: pendingLoans + pendingProduce
  };
};

export const getSystemRecentActivity = async () => {
  const [users, loans, produce] = await Promise.all([
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, role: true, createdAt: true }
    }),
    prisma.loanRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { farmer: { select: { name: true } } }
    }),
    prisma.produce.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { farmer: { select: { name: true } } }
    })
  ]);

  const activities = [
    ...users.map(u => ({
      id: `user-${u.id}`,
      type: 'USER_REGISTRATION',
      description: `New ${u.role.toLowerCase()} ${u.name} joined`,
      createdAt: u.createdAt
    })),
    ...loans.map(l => ({
      id: `loan-${l.id}`,
      type: 'LOAN_REQUEST',
      description: `Loan of KES ${l.amount.toLocaleString()} requested by ${l.farmer.name}`,
      createdAt: l.createdAt
    })),
    ...produce.map(p => ({
      id: `produce-${p.id}`,
      type: 'PRODUCE_ADDED',
      description: `${p.quantity}${p.unit} of ${p.name} added by ${p.farmer.name}`,
      createdAt: p.createdAt
    }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

  return activities;
};
export const getUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      location: true,
      createdAt: true,
      _count: {
        select: { produce: true }
      }
    }
  });
};

export const getAllSaccos = async () => {
  return await prisma.sACCO.findMany({
    include: {
      supervisor: {
        select: { name: true }
      },
      members: {
        select: { id: true }
      },
      _count: {
        select: { members: true }
      }
    }
  });
};

export const getAllProduce = async () => {
  return await prisma.produce.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      farmer: {
        select: { name: true }
      }
    }
  });
};
export const getAllLoans = async () => {
  return await prisma.loanRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      farmer: {
        select: { 
          name: true,
          sacco: { select: { name: true } }
        }
      }
    }
  });
};
export const getDashboardCharts = async () => {
  const [farmers, produce, loans] = await Promise.all([
    // Group farmers by month for the last 7 months
    prisma.user.findMany({
      where: { role: 'FARMER' },
      select: { createdAt: true }
    }),
    // Group produce quantity by name
    prisma.produce.groupBy({
      by: ['name'],
      where: { status: 'VERIFIED' },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 6
    }),
    // Group loans by status
    prisma.loanRequest.groupBy({
      by: ['status'],
      _count: { id: true }
    })
  ]);

  // Process farmer growth
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const growth = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = months[d.getMonth()];
    const count = farmers.filter(f => f.createdAt <= new Date(d.getFullYear(), d.getMonth() + 1, 0)).length;
    growth.push({ month: monthName, farmers: count });
  }

  return {
    farmerGrowth: growth,
    produceSupply: produce.map(p => ({ crop: p.name, supply: p._sum.quantity || 0 })),
    loanDistribution: loans.map(l => ({ name: l.status, value: l._count.id }))
  };
};

export const createSacco = async (data) => {
  return await prisma.sACCO.create({
    data: {
      name: data.name,
      location: data.location,
      supervisorId: data.supervisorId ? parseInt(data.supervisorId) : null,
    },
  });
};

export const updateSacco = async (id, data) => {
  return await prisma.sACCO.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      location: data.location,
      supervisorId: data.supervisorId === null ? null : (data.supervisorId ? parseInt(data.supervisorId) : undefined),
    },
  });
};

export const getSaccoById = async (id) => {
  return await prisma.sACCO.findUnique({
    where: { id: parseInt(id) },
    include: {
      supervisor: { select: { id: true, name: true, email: true, phone: true } },
      _count: { select: { members: true } },
      members: {
        select: { id: true, name: true, role: true, location: true }
      }
    }
  });
};


