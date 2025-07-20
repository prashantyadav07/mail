import User from '../models/userModel.js';
import Form from '../models/formModel.js'; // Import the Form model

// GET: Fetch a list of all users (for the Manage Users page)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("❌ Get All Users Error:", error);
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
};

// --- START: NEW NOTIFICATION FUNCTIONS ---

// GET: Get the count of new forms for the logged-in user
export const getNotificationCount = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.lastViewedForms) {
      const totalForms = await Form.countDocuments();
      return res.status(200).json({ count: totalForms });
    }

    const newFormsCount = await Form.countDocuments({
      createdAt: { $gt: user.lastViewedForms }
    });

    res.status(200).json({ count: newFormsCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to get notification count", error: error.message });
  }
};

// POST: Clear notifications by updating the user's lastViewedForms timestamp
export const clearNotifications = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, {
      lastViewedForms: new Date()
    });
    res.status(200).json({ message: "Notifications cleared successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear notifications", error: error.message });
  }
};
