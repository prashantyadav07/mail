import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  subject: String,
  body: String,
  recipients: [String],
  status: {
    type: String,
    enum: ['sent', 'failed'],
    default: 'sent'
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Email', emailSchema);