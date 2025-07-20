import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: successfully`);
  } catch (error) {
    console.error(`MongoDB connection error:`, error);
    process.exit(1); // exit with failure
  }
};

export default connectDB;