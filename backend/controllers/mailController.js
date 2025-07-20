// controllers/mailController.js
import { sendBulkMail } from '../utils/mailer.js';
import Email from '../models/emailModel.js';

export const sendMail = async (req, res) => {
  const { subject, body, recipients } = req.body;

  try {
    console.log('📧 Sending bulk email...');
    console.log('Recipients:', recipients);
    console.log('Subject:', subject);
    
    // Validate input
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ 
        message: 'Recipients array is required and cannot be empty' 
      });
    }
    
    if (!subject || !body) {
      return res.status(400).json({ 
        message: 'Subject and body are required' 
      });
    }

    // Send email
    await sendBulkMail(recipients, subject, body);

    // Save to database
    const newEmail = new Email({
      subject,
      body,
      recipients,
      sentAt: new Date()
    });

    await newEmail.save();
    console.log('✅ Email record saved to database');

    res.status(200).json({ 
      message: 'Emails sent successfully',
      recipients: recipients.length,
      subject: subject
    });
    
  } catch (err) {
    console.error('❌ Error in sendMail:', err.message);
    res.status(500).json({ 
      message: 'Error sending emails', 
      error: err.message 
    });
  }
};