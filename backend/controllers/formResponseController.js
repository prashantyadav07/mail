import FormResponse from '../models/formResponseModel.js';

// --- Function 1: Submit a Form Response (Corrected) ---
// This function now correctly saves the user's ID.
export const submitFormResponse = async (req, res) => {
  try {
    const { formId, responses } = req.body;

    const newResponse = new FormResponse({
      form: formId,
      // --- THIS IS THE CORRECTED LINE ---
      // Your token's payload has 'userId', so we must use req.user.userId.
      user: req.user.userId,
      responses
    });

    await newResponse.save();

    res.status(201).json({
      message: 'Form response submitted successfully',
      response: newResponse
    });
  } catch (err) {
    console.error("❌ Submit Form Error:", err);
    res.status(500).json({ message: 'Failed to submit form response', error: err.message });
  }
};


// --- Function 2: Get All Responses for a Form (This part is already correct) ---
// This function fetches responses and populates the user details.
export const getFormResponses = async (req, res) => {
  try {
    const { formId } = req.params;

    const responses = await FormResponse.find({ form: formId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: responses.length,
      responses
    });

  } catch (error) {
    console.error("❌ Get Responses Error:", error);
    res.status(500).json({ message: "Failed to get responses", error: error.message });
  }
};