import { config } from '../configs/configs.js';
import {
  registerUser,
  authenticateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  createUser,
  joinSacco,
} from '../services/userService.js';
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenUtils.js';
import prisma from '../database.js';
import { signupValidator, loginValidator } from '../validators/userValidators.js';
import { 
  sendVerificationEmail, 
  sendWelcomeEmail
} from '../services/emails/emailService.js';
import { 
  generateVerificationCode, 
  saveVerificationCode,
  verifyUserCode,
  resendVerificationCode as resendCode
} from '../services/emails/emailVerificationService.js';
// import NotificationService from '../services/notification.service.js';

const getRedirectUrlByRole = (role) => {
  switch (role) {
    case 'SYSTEM_ADMIN': return '/super-admin-dashboard';
    case 'FARMER': return '/farmers-dashboard';
    case 'SUPERVISOR': return '/supervisors-dashboard';
    case 'VENDOR':
    case 'BUYER':
    case 'WHOLESALER':
    case 'SALES':
      return '/sales-dashboard';
    default: return '/';
  }
};
const cookieName = config.cookies.refreshName;
const cookieOptions = config.cookies.options;

function setRefreshCookie(res, token) {
  res.cookie(cookieName, token, cookieOptions);
}

export const loginController = async (req, res) => {
  const { error, value } = loginValidator(req.body);
  if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });

  try {
    const user = await authenticateUser(value.email, value.password);
    
    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({ 
        message: 'Please verify your email before logging in.',
        verificationRequired: true,
        userId: user.id,
        action: 'verify-email'
      });
    }
    
    // Only set ONLINE if verified


    await prisma.user.update({ 
      where: { id: user.id }, 
      data: { 
        status: 'ONLINE', 
        lastSeen: new Date() 
      } 
    });
  


    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    // User login successful
    if (user.role === 'SYSTEM_ADMIN') {
      // Admin specific logic can go here
    }

    res.status(200).json({ 
      accessToken, 
      role: user.role, 
      user,
      redirectTo: getRedirectUrlByRole(user.role)
    });
  } catch {
    res.status(400).json({ message: 'Invalid email or password' });
  }
};

// google info removed

// google login removed
export const refreshTokenController = async (req, res) => {
  const token = req.cookies?.[cookieName];
  
  if (!token) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const user = await getUserById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    const newAccess = generateToken(user);
    const newRefresh = generateRefreshToken(user);
    setRefreshCookie(res, newRefresh);

    return res.status(200).json({ accessToken: newAccess });
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Refresh token expired' });
    }
    if (e.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};


export const getCurrentUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Error fetching current user' });
  }
};

export const joinSaccoController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { saccoId } = req.body;
    if (!saccoId) return res.status(400).json({ message: 'SACCO ID is required' });
    
    const updatedUser = await joinSacco(userId, saccoId);
    res.status(200).json({ 
      success: true, 
      message: 'Successfully joined the SACCO network',
      user: updatedUser
    });
  } catch (error) {
    console.error('Join SACCO error:', error);
    res.status(500).json({ message: error.message || 'Failed to join SACCO' });
  }
};

// controller
export const getAllUsersController = async (req, res) => {
  try {
    console.log('Fetching users from database...', req.query);
    const users = await getAllUsers(req.query);
    console.log(`Found ${users.length} users`);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAllUsersController:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    res.status(500).json({ 
      message: 'Failed to retrieve users',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ message: e.message || 'Error fetching user' });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    await deleteUserById(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (e) {
    res.status(400).json({ message: e.message || 'Error deleting user' });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const createUserController = async (req, res) => {
  try {
    const created = await createUser(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


export const userHeartbeatController = async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ 
      success: false,
      message: 'User ID is required' 
    });
  }
  
  try {
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { 
        lastSeen: new Date(),
        status: 'ONLINE'
      }
    });
    
    res.status(200).json({ 
      success: true,
      message: 'Heartbeat received'
    });
  } catch (error) {
    console.error('Heartbeat error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating heartbeat'
    });
  }
};


export const registerController = async (req, res) => {
  const { error, value } = signupValidator(req.body);
  if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });

  try {
    const user = await registerUser({
      email: value.email,
      password: value.password,
      name: value.name || value.full_name, 
      phone: value.phone || value.phone_number,
      location: value.location,
      role: value.role,
    });

    const verificationCode = generateVerificationCode();
    await saveVerificationCode(user.id, verificationCode);
    await sendVerificationEmail(user.email, user.name || 'User', verificationCode);

    await prisma.user.update({ 
      where: { id: user.id }, 
      data: { 
        status: 'OFFLINE', 
        lastSeen: new Date()
      } 
    });
    


    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    res.status(201).json({ 
      accessToken, 
      role: user.role, 
      user: {
        ...user,
        isVerified: false 
      },
      message: 'Registration successful. Please check your email for verification code.',
      verificationRequired: true,
      verificationSent: true
    });
  } catch (e) {
    res.status(400).json({ message: e.message || 'Registration failed' });
  }
};
export const postLoginRedirectController = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getUserById(userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (!user.isVerified) {
      return res.status(403).json({ 
        message: 'Please verify your email first',
        redirectTo: '/verify-email'
      });
    }

    let redirectTo = getRedirectUrlByRole(user.role);
    
    res.status(200).json({ 
      message: 'Login successful',
      redirectTo,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Post-login redirect error:', error);
    res.status(500).json({ message: 'Error determining redirect' });
  }
};
export const logoutController = async (req, res) => {
  try {
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to logout',
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;
    
    if (!code) {
      return res.status(400).json({ message: 'Verification code is required' });
    }

    const user = await verifyUserCode(userId, code);
    
    // Send welcome email after successful verification
    await sendWelcomeEmail(user.email, user.name || 'User');
    
    // Generate new access token since verification status changed
    const accessToken = generateToken(user);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully',
      accessToken,
      user
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({ message: error.message || 'Verification failed' });
  }
};

export const resendVerificationController = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const { code, email } = await resendCode(Number(userId));
    
    const user = await getUserById(Number(userId));
    await sendVerificationEmail(email, user.name || 'User', code);
    
    res.status(200).json({ 
      success: true, 
      message: 'Verification code resent. Please check your email.' 
    });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(400).json({ message: error.message || 'Failed to resend code' });
  }
};

export const sendUserEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, message, html } = req.body;
    
    if (!subject || (!message && !html)) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use provided HTML or wrap text message in a basic template
    const emailHtml = html || `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f4f4f4; padding: 10px; border-radius: 5px; }
          .content { padding: 20px 0; }
          .footer { font-size: 12px; color: #666; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Amica Agribusiness</h2>
          </div>
          <div class="content">
            <p>Dear ${user.name || 'Customer'},</p>
            ${message.replace(/\n/g, '<br>')}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Amica Agribusiness. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Import sendEmail dynamically to avoid circular dependency issues or just import at top if possible
    // Since we are in controller, top level import of emailService is fine (it was already imported)
    const { sendEmail } = await import('../services/emails/emailService.js');
    
    await sendEmail(user.email, subject, emailHtml);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};