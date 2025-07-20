import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee'
  },
  // --- This new field is added to track notifications ---
  lastViewedForms: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);