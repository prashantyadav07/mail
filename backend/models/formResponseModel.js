import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  // This MUST be 'form' to match the key in your controller
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  // This MUST be 'user' to match the key in your controller
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  responses: [
    {
      label: String,
      answer: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('FormResponse', responseSchema);