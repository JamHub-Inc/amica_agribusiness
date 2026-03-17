import prisma from '../database.js';
import bcrypt from 'bcrypt';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Role } = require('@prisma/client');

const normalizeRole = (role) => {
  if (!role) return Role.FARMER;
  
  const normalized = role.toUpperCase();
  const validRoles = [
    Role.SYSTEM_ADMIN, Role.FARMER, Role.SUPERVISOR, 
    Role.VENDOR, Role.BUYER, Role.WHOLESALER, Role.SALES
  ];
  return validRoles.includes(normalized) ? normalized : Role.FARMER;
};

const toDateOrUndefined = (val) => {
  if (val == null) return undefined;
  if (val instanceof Date) return val;
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? undefined : d;
};
const buildCreatePayload = async (data) => {
  const name = data.name ?? data.full_name;
  const phone = data.phone ?? data.phone_number;
  let passwordHash = null;
  if (data.password) {
    passwordHash = await bcrypt.hash(data.password, 10);
  } else if (data.passwordHash) {
    passwordHash = data.passwordHash;
  }

  const payload = {
    email: data.email,
    name,
    phone,
    location: data.location,
    role: normalizeRole(data.role),
    status: data.status ? data.status.toUpperCase() : 'OFFLINE', 
    passwordHash,
    provider: 'EMAIL',
    isVerified: data.isVerified === true || data.isVerified === 'true',
  };
  if (!['ONLINE', 'OFFLINE', 'AWAY', 'BUSY'].includes(payload.status)) {
    payload.status = 'OFFLINE';
  }

  Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
  return payload;
};

const buildUpdatePayload = async (data) => {
  const out = {};

  if (data.email !== undefined) out.email = data.email;

  const name = data.name ?? data.full_name;
  if (name !== undefined) out.name = name;

  const phone = data.phone ?? data.phone_number;
  if (phone !== undefined) out.phone = phone;

  const location = data.location;
  if (location !== undefined) out.location = location;

  if (data.role !== undefined) out.role = normalizeRole(data.role);
  
  if (data.status !== undefined) {
    out.status = typeof data.status === 'string' ? data.status.toUpperCase() : data.status;
    
    if (!['ONLINE', 'OFFLINE', 'AWAY', 'BUSY'].includes(out.status)) {
      console.warn(`Invalid status value: ${data.status}, defaulting to OFFLINE`);
      out.status = 'OFFLINE';
    }
  }

  const lastSeen = data.lastSeen ?? data.last_seen;
  const lastSeenDate = toDateOrUndefined(lastSeen);
  if (lastSeen !== undefined && lastSeenDate !== undefined) out.lastSeen = lastSeenDate;

  if (data.password) {
    out.passwordHash = await bcrypt.hash(data.password, 10);
  } else if (data.passwordHash) {
    out.passwordHash = data.passwordHash;
  }

  return out;
};

export const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: { sacco: true, managedSacco: true }
  });
  if (!user || !user.passwordHash) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');
  return user;
};

export const joinSacco = async (userId, saccoId) => {
  return prisma.user.update({
    where: { id: Number(userId) },
    data: { saccoId: Number(saccoId) },
    include: {
      sacco: true
    }
  });
};

export const registerUser = async ({ email, password, name, full_name, phone, phone_number, location, role, status }) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error('User with this email already exists');

  const payload = await buildCreatePayload({
    email,
    password,
    name,
    full_name,
    phone,
    phone_number,
    location,
    role,
    status: status ? status.toUpperCase() : 'OFFLINE', 
  });

  console.log('Creating user with payload:', payload); 

  return prisma.user.create({ data: payload });
};

export const createUser = async (data) => {
  const payload = await buildCreatePayload(data);
  return prisma.user.create({ data: payload });
};

export const updateUser = async (id, data) => {
  const userId = Number(id);
  const payload = await buildUpdatePayload(data);

  try {
    return await prisma.user.update({ where: { id: userId }, data: payload });
  } catch (e) {
    if (e.code === 'P2002') throw new Error('Email already exists');
    throw e;
  }
};


export const deleteUserById = (id) =>
  prisma.user.delete({ where: { id: Number(id) } });

// service/userService.js
export const getAllUsers = async (params = {}) => {
  const { search, role, status } = params;
  const where = {};
  
  if (role) {
    where.role = role.toUpperCase();
  }
  
  if (status) {
      where.status = status;
  }
  
  if (search) {
      where.OR = [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } }
      ];
  }

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      provider: true,
      location: true,
      isVerified: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  });
  
  return users.map(user => ({
    ...user,
    verificationCodeExpiresUnix: user.verificationCodeExpiresUnix 
      ? user.verificationCodeExpiresUnix.toString() 
      : null,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    lastSeen: user.lastSeen ? user.lastSeen.toISOString() : null,
    lastPasswordChange: user.lastPasswordChange ? user.lastPasswordChange.toISOString() : null,
  }));
};

export const getUserById = (id) =>
  prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      sacco: true,
      managedSacco: true
    }
  });

export const updateUserLastSeen = async (userId) =>
  prisma.user.update({
    where: { id: Number(userId) },
    data: { lastSeen: new Date() },
  });
export const updateCurrentUser = async (userId, data) => {
  const allowedFields = [
    'name', 'full_name', 'phone', 'phone_number', 
    'location',
  ];
  const updateData = {};
  Object.keys(data).forEach(key => {
    if (allowedFields.includes(key)) {
      updateData[key] = data[key];
    }
  });
  
  if (updateData.full_name) {
    updateData.name = updateData.full_name;
    delete updateData.full_name;
  }
  
  if (updateData.phone_number) {
    updateData.phone = updateData.phone_number;
    delete updateData.phone_number;
  }
  
  if (updateData.location) {
    updateData.location = updateData.location;
  }
  
  if (data.email && data.email !== undefined) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (existingUser && existingUser.id !== userId) {
      throw new Error('Email already in use');
    }
    
    updateData.email = data.email;
    updateData.isVerified = false;
    
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAtUnix = Date.now() + (10 * 60 * 1000);
    
    updateData.verificationCode = verificationCode;
    updateData.verificationCodeExpiresUnix = BigInt(expiresAtUnix);
  }
  
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    
    const { passwordHash, verificationCode, verificationCodeExpiresUnix, ...safeUser } = updatedUser;
    
    return safeUser;
  } catch (e) {
    if (e.code === 'P2002') {
      throw new Error('Email already exists');
    }
    throw e;
  }
};

export const deleteCurrentUser = async (userId, password = null) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true, provider: true },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  if (user.provider === 'EMAIL' && user.passwordHash) {
    if (!password) {
      throw new Error('Password is required to delete account');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
  }
  
  const deletedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
      email: `deleted_${userId}_${Date.now()}@deleted.com`, 
      status: 'OFFLINE',
    },
  });
  
  await prisma.session.deleteMany({
    where: { userId },
  });
  
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });
  
  return {
    success: true,
    message: 'Account deleted successfully',
    deletedAt: deletedUser.deletedAt,
  };
};

export const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      status: true,
      isVerified: true,
      provider: true,
      location: true,
      createdAt: true,
      updatedAt: true,
      lastSeen: true,
    },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};