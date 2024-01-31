import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const DB_NAME = process.env.DATABASE_NAME;
const DB_PORT = process.env.DATABASE_PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`)
    console.log('MongoDB Connected');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
