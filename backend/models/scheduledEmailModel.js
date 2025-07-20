import mongoose from 'mongoose';

const scheduledEmailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  recipients: {
    type: [String],
    required: true,
  },
  scheduleAt: {
    type: Date,
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
    index: true,
  },
}, { timestamps: true });

const ScheduledEmail = mongoose.model('ScheduledEmail', scheduledEmailSchema);

export default ScheduledEmail;