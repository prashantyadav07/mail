import { generateFormSchemaFromPrompt } from '../utils/gemini.js';
import Form from '../models/formModel.js';

export const generateFormWithAI = async (req, res) => {
  try {
    const { title, description, prompt } = req.body;

    
    const fields = await generateFormSchemaFromPrompt(prompt);

    const validatedFields = fields.map(field => {
      const validatedField = {
        label: field.label || 'Untitled Field',
        type: field.type || 'text',
        required: Boolean(field.required),
        options: []
      };

      if (field.type === 'radio' || field.type === 'select') {
        if (Array.isArray(field.options)) {
          validatedField.options = field.options.map(option => {
            if (typeof option === 'string') return option;
            if (typeof option === 'object' && option !== null) {
              return option.label || JSON.stringify(option);
            }
            return String(option);
          });
        } else {
          validatedField.options = ['Option 1', 'Option 2'];
        }
      }

      return validatedField;
    });

    console.log('✅ Validated fields:', JSON.stringify(validatedFields, null, 2));

    const newForm = new Form({
      title,
      description,
      fields: validatedFields,
      createdBy: req.user._id
    });

    await newForm.save();

    res.status(201).json({
      message: 'Form generated and saved successfully',
      form: newForm
    });

  } catch (err) {
    console.error("❌ AI Form Error:", err);
    res.status(500).json({ message: 'AI Form generation failed', error: err.message });
  }
};