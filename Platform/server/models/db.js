import mongoose from 'mongoose';

const DB_NAME = process.env.DATABASE_NAME;
const DB_PORT = process.env.DATABASE_PORT;

const db = async () => {
  try {
    const mongoURI = `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default db;
