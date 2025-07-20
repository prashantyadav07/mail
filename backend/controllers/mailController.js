import { sendBulkMail } from '../utils/mailer.js';
import Email from '../models/emailModel.js';
// Naya model import karein
import ScheduledEmail from '../models/scheduledEmailModel.js';

// --- AAPKA EXISTING FUNCTION (KOI BADLAAV NAHI) ---
export const sendMail = async (req, res) => {
  const { subject, body, recipients } = req.body;
  try {
    // ... aapka poora existing code ...
    console.log('📧 Sending bulk email immediately...');
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ message: 'Recipients array is required' });
    }
    if (!subject || !body) {
      return res.status(400).json({ message: 'Subject and body are required' });
    }
    await sendBulkMail(recipients, subject, body);
    const newEmail = new Email({ subject, body, recipients, sentAt: new Date() });
    await newEmail.save();
    console.log('✅ Immediate email record saved.');
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error('❌ Error in sendMail:', err.message);
    res.status(500).json({ message: 'Error sending emails', error: err.message });
  }
};


// --- NAYA SCHEDULING FUNCTION ---
export const scheduleMail = async (req, res) => {
  const { subject, body, recipients, scheduleAt } = req.body;

  try {
    console.log('🗓️ Scheduling a new bulk email...');

    // Validation
    if (!subject || !body || !recipients || !scheduleAt) {
      return res.status(400).json({ message: 'Subject, body, recipients, and scheduleAt are all required.' });
    }
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ message: 'Recipients must be a non-empty array.' });
    }
    if (new Date(scheduleAt) <= new Date()) {
      return res.status(400).json({ message: 'Schedule time must be in the future.' });
    }

    // Naye 'ScheduledEmail' model ka use karke database mein entry banayein
    const newScheduledEmail = new ScheduledEmail({
      subject,
      body,
      recipients,
      scheduleAt: new Date(scheduleAt),
      status: 'pending' // Initial status
    });

    await newScheduledEmail.save();
    console.log('✅ Email scheduled and saved to database.');

    res.status(201).json({
      message: 'Email has been scheduled successfully!',
      scheduleTime: scheduleAt
    });

  } catch (err) {
    console.error('❌ Error in scheduleMail:', err.message);
    res.status(500).json({
      message: 'Error scheduling email',
      error: err.message
    });
  }
};