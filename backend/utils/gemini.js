import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateFormSchemaFromPrompt = async (prompt) => {
  try {
    // Updated to use current model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const fullPrompt = `
You are a smart form generator.

Return a JSON array of fields based on this prompt: "${prompt}"

Each field should include:
- label (string)
- type (text, email, textarea, radio, select)
- required (true/false)
- options (array, if applicable)

Respond ONLY with pure JSON.
`;

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    
    // Clean up the response to extract JSON
    const cleanJson = text.replace(/```json|```/g, '').trim();
    
    // Parse and return the JSON
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Error generating form schema:', error);
    throw new Error(`Form generation failed: ${error.message}`);
  }
};