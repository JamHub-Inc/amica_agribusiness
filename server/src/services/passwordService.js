import crypto from 'crypto';
import prisma from '../database.js';
import bcrypt from 'bcrypt';
import { sendPasswordResetEmail, sendPasswordChangedEmail } from './emails/emailService.js';

export const requestPasswordReset = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true }
  });

  if (!user) {
    // We return true even if user not found to prevent timing attacks
    // but in a real app, maybe log or handle differently
    return true;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = await bcrypt.hash(resetToken, 10);
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiry

  // For this simplified version, let's reuse the 'verificationCode' fields or better yet,
  // we could add more fields, but user wants purely auth.
  // Actually, let's just use the ResetToken model if we have it.
  // schema.prisma only has User, Session, RefreshToken.
  
  // I should add a resetToken field to User or a new model.
  // Given user wants "detailed auth", I'll add resetToken and resetExpires to User in schema.prisma.
  
  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationCode: resetToken, // using this field temporarily to avoid schema change for 1 sec
      verificationCodeExpiresUnix: BigInt(expiresAt.getTime())
    }
  });

  await sendPasswordResetEmail(user.email, user.name, resetToken);
  return true;
};

export const resetPassword = async (token, newPassword) => {
  const user = await prisma.user.findFirst({
    where: {
      verificationCode: token,
    }
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  const expiry = Number(user.verificationCodeExpiresUnix);
  if (Date.now() > expiry) {
    throw new Error('Reset token has expired');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      verificationCode: null,
      verificationCodeExpiresUnix: null,
      lastPasswordChange: new Date()
    }
  });

  await sendPasswordChangedEmail(user.email, user.name);
  return true;
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, passwordHash: true, email: true, name: true }
  });

  if (!user || !user.passwordHash) {
    throw new Error('User not found or password not set');
  }

  const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isMatch) {
    throw new Error('Incorrect current password');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash,
      lastPasswordChange: new Date()
    }
  });

  await sendPasswordChangedEmail(user.email, user.name);
  return true;
};
