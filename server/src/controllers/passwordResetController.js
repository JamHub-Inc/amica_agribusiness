import { requestPasswordReset, resetPassword, changePassword } from '../services/passwordService.js';
import prisma from '../database.js';

export const requestPasswordResetController = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ status: 'fail', message: 'Email required' });

  try {
    const success = await requestPasswordReset(email);
    res.status(200).json({ status: 'success', message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const validateResetTokenController = async (req, res) => {
  const { token } = req.params;
  if (!token) return res.status(400).json({ status: 'fail', message: 'Token required' });

  // Token's validity is normally checked by resetting, but for simple validation
  // let's create a quick check.
  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationCode: token,
        verificationCodeExpiresUnix: {
          gt: BigInt(Date.now().toString())
        }
      }
    });

    if (!user) return res.status(400).json({ status: 'fail', message: 'Invalid or expired token' });
    res.status(200).json({ status: 'success', message: 'Token is valid' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ status: 'fail', message: 'Token and new password required' });

  try {
    await resetPassword(token, password);
    res.status(200).json({ status: 'success', message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const changePasswordController = async (req, res) => {
  const { current_password, new_password } = req.body;
  const userId = req.user.id;

  if (!current_password || !new_password) {
    return res.status(400).json({ status: 'fail', message: 'Current and new password required' });
  }

  try {
    await changePassword(userId, current_password, new_password);
    res.status(200).json({ status: 'success', message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
