import Form from '../models/formModel.js';
import FormResponse from '../models/formResponseModel.js';

// --- Function 1: Get All Forms (with submission status for the user dashboard) ---
export const getAllForms = async (req, res) => {
  try {
    const allForms = await Form.find({}).sort({ createdAt: -1 }).lean();
    const userResponses = await FormResponse.find({ user: req.user.userId }).select('form');
    const submittedFormIds = new Set(
      userResponses.map(response => response.form.toString())
    );
    const formsWithSubmissionStatus = allForms.map(form => ({
      ...form,
      isSubmitted: submittedFormIds.has(form._id.toString()),
    }));
    res.status(200).json({
      count: formsWithSubmissionStatus.length,
      forms: formsWithSubmissionStatus,
    });
  } catch (error) {
    console.error("❌ Get All Forms Error:", error);
    res.status(500).json({ message: "Failed to get forms", error: error.message });
  }
};

// --- Function 2: Get a Single Form by its ID ---
// This was missing and is now restored.
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error("❌ Get Form By ID Error:", error);
    res.status(500).json({ message: "Failed to get form", error: error.message });
  }
};

// --- Function 3: Delete a Form and its Responses ---
// This was missing and is now restored.
export const deleteForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    await FormResponse.deleteMany({ form: formId });
    await Form.findByIdAndDelete(formId);
    res.status(200).json({ message: 'Form and all associated responses have been deleted successfully.' });
  } catch (error)
  {
    console.error("❌ Delete Form Error:", error);
    res.status(500).json({ message: "Failed to delete form", error: error.message });
  }
};