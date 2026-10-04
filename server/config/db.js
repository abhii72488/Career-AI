import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/career_ai', {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.log(`[Database Warning] MongoDB connection failed (${error.message}). Running in hybrid stateful memory mode.`);
  }
};

export const checkMongoStatus = () => isMongoConnected;
