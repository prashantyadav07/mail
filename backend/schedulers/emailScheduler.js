import cron from 'node-cron';
import ScheduledEmail from '../models/scheduledEmailModel.js';
// Aapki mail bhejne wali utility ko import karein
import { sendBulkMail } from '../utils/mailer.js'; 

export const startEmailScheduler = () => {
  // Har minute ('* * * * *') yeh function chalega
  cron.schedule('* * * * *', async () => {
    console.log('⏰ Cron Job: Checking for emails to send...');

    const now = new Date();

    try {
      // Unn sabhi emails ko dhoondho jinka status 'pending' hai aur schedule time aa chuka hai
      const emailsToSend = await ScheduledEmail.find({
        status: 'pending',
        scheduleAt: { $lte: now }
      });

      if (emailsToSend.length === 0) {
        return; // Koi email nahi hai bhejme ke liye
      }

      console.log(`Found ${emailsToSend.length} email(s) to send.`);

      // Har email ko ek ek karke bhejo
      for (const email of emailsToSend) {
        try {
          // Aapki existing sendBulkMail utility ka use karein
          await sendBulkMail(email.recipients, email.subject, email.body);

          // Email bhejne ke baad, status ko 'sent' update kar dein
          email.status = 'sent';
          await email.save();
          console.log(`✅ Email (ID: ${email._id}) sent successfully.`);
          
        } catch (error) {
          console.error(`❌ Failed to send scheduled email (ID: ${email._id}):`, error.message);
          // Agar fail ho jaye, toh status 'failed' update kar dein
          email.status = 'failed';
          await email.save();
        }
      }
    } catch (error) {
      console.error('❌ Error in email scheduler cron job:', error.message);
    }
  });
};