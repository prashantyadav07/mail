
import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  fields: [
    {
      label: { type: String, required: true },
      type: { type: String, required: true }, // text, email, radio, etc.
      required: { type: Boolean, default: false },
      options: [String] // optional for select/radio
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;
