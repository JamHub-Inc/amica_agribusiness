import nodemailer from 'nodemailer';
import { config } from '../../configs/configs.js';
import { wrapWithLayout } from './emailLayout.js';

const BRAND_DARK = '#0F172A';

const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    return transporter;
  } catch (error) {
    throw new Error(`Failed to create transporter: ${error.message}`);
  }
};

const verifyTransporter = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Transporter verification failed:', error);
    return false;
  }
};

const createVerificationEmailTemplate = (userName, verificationCode) => {
  const content = `
    <p>Dear ${userName || 'Client'},</p>
    <p>Thank you for initiating your registration with Amica Agribusiness. To finalize your account security, please utilize the authorization code provided below.</p>
    
    <div style="text-align: center; margin: 40px 0;">
        <div style="display: inline-block; background-color: #F8FAFC; border: 1px solid #E2E8F0; color: ${BRAND_DARK}; font-size: 32px; font-weight: 700; padding: 20px 40px; border-radius: 4px; letter-spacing: 10px; font-family: monospace;">
            ${verificationCode}
        </div>
        <p style="color: #64748B; font-size: 13px; margin-top: 16px;">This authorization code is valid for 10 minutes.</p>
    </div>
    
    <div class="section">
        <span class="section-title">Completion Steps</span>
        <p style="font-size: 14px; color: #334155; margin: 0;">Please enter this code on the verification screen to activate your professional profile.</p>
    </div>
    
    <p style="font-size: 12px; color: #94A3B8; text-align: center;">If you did not initiate this request, please contact our administrative team immediately.</p>
  `;

  return wrapWithLayout('Account Verification', content);
};

const createWelcomeEmailTemplate = (userName) => {
  const content = `
    <div style="text-align: center;">
        <p>Dear <strong>${userName || 'Client'}</strong>,</p>
        <p>Welcome to Amica Agribusiness. Your account has been successfully verified, and you now have full access to our premium agricultural services and features.</p>
    </div>
    
    <div class="section">
        <span class="section-title">Getting Started</span>
        <p style="font-size: 14px; color: #334155;">You can now log in to your dashboard to manage your activities and access our specialized tools for farmers and supervisors.</p>
    </div>
    
    <div style="text-align: center;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" class="button">Log In to Dashboard</a>
    </div>
  `;

  return wrapWithLayout('Welcome to Amica Agribusiness', content);
};

const createPasswordResetEmailTemplate = (userName, resetLink) => {
  const content = `
    <div style="text-align: center; margin-bottom: 32px;">
      <p>Dear <strong>${userName || 'Client'}</strong>,</p>
      <p>We received an administrative request to reset the password associated with your Amica Agribusiness account.</p>
    </div>
    
    <div class="section">
        <span class="section-title">Security Authorization</span>
        <p style="font-size: 14px; color: #334155;">To establish a new secured password, please utilize the authorization link provided below. This link is valid for 60 minutes.</p>
        
        <div style="text-align: center;">
            <a href="${resetLink}" class="button" style="margin: 20px 0;">Reset Password</a>
        </div>
        
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E2E8F0;">
            <p style="font-size: 11px; color: #94A3B8; margin-bottom: 8px;">If the button is not responsive, please utilize the direct URL below:</p>
            <div style="background-color: #F8FAFC; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 10px; word-break: break-all; color: #64748B; border: 1px solid #E2E8F0;">
                ${resetLink}
            </div>
        </div>
    </div>
  `;

  return wrapWithLayout('Security Update: Password Reset', content);
};

const createPasswordChangedEmailTemplate = (userName) => {
  const content = `
    <div style="text-align: center; margin-bottom: 32px;">
      <p>Dear <strong>${userName || 'Client'}</strong>,</p>
      <p>Your Amica Agribusiness account password was successfully updated on ${new Date().toLocaleString()}.</p>
    </div>
    
    <div class="section">
        <span class="section-title">Security Alert</span>
        <p style="font-size: 14px; color: #334155;">If you did not initiate this change, please restrict your account immediately and contact our security team.</p>
    </div>
  `;

  return wrapWithLayout('Password Change Confirmation', content);
};

const sendEmail = async (to, subject, html, text = null) => {
  try {
    // Check if configuration exists
    if (!config.email.host || !config.email.user) {
      console.log('-----------------------------------------');
      console.log('📧 EMAIL LOG (SMTP NOT CONFIGURED)');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content: ${text || 'Check HTML content'}`);
      console.log('-----------------------------------------');
      return { messageId: 'dev-mode-log' };
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Amica Agribusiness" <${config.email.user}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    
    // Fallback logging in development
    console.log('-----------------------------------------');
    console.log('📧 EMAIL FALLBACK LOG');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Error: ${error.message}`);
    console.log('-----------------------------------------');
    
    // In development, we don't want to crash the whole flow if email fails
    if (process.env.NODE_ENV !== 'production') {
      return { messageId: 'fallback-log' };
    }
    
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendVerificationEmail = async (userEmail, userName, verificationCode) => {
  const subject = 'Account Verification Required - Amica Agribusiness';
  const html = createVerificationEmailTemplate(userName, verificationCode);
  return await sendEmail(userEmail, subject, html);
};

export const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Your Account is Active - Welcome to Amica Agribusiness';
  const html = createWelcomeEmailTemplate(userName);
  return await sendEmail(userEmail, subject, html);
};

export const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
  const subject = 'Security Verification: Password Reset Request';
  const html = createPasswordResetEmailTemplate(userName, resetLink);
  return await sendEmail(userEmail, subject, html);
};

export const sendPasswordChangedEmail = async (userEmail, userName) => {
  const subject = 'Security Notification: Password Updated';
  const html = createPasswordChangedEmailTemplate(userName);
  return await sendEmail(userEmail, subject, html);
};

export { createTransporter, verifyTransporter, sendEmail };
