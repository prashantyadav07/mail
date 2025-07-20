// utils/mailer.js - Updated for Plain Text Emails
import nodemailer from 'nodemailer';

let transporter = null;

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS environment variables are required');
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    pool: true,
  });
};

const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

export const verifyConnection = async () => {
  try {
    await getTransporter().verify();
    return { success: true, message: "SMTP connection verified" };
  } catch (error) {
    throw error;
  }
};

export const sendMail = async (to, subject, body) => {
  try {
    await verifyConnection();
    const mailOptions = {
      from: `"Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: body, // Use 'text' for plain text emails
    };
    const result = await getTransporter().sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    throw error;
  }
};

export const sendBulkMail = async (recipients, subject, body) => {
  try {
    await verifyConnection();
    const recipientList = Array.isArray(recipients) ? recipients.join(', ') : recipients;
    const mailOptions = {
      from: `"Admin" <${process.env.EMAIL_USER}>`,
      to: recipientList,
      subject,
      text: body, // Use 'text' for plain text emails
    };
    const result = await getTransporter().sendMail(mailOptions);
    return {
      success: true,
      messageId: result.messageId,
      recipientCount: Array.isArray(recipients) ? recipients.length : 1,
    };
  } catch (error) {
    throw error;
  }
};