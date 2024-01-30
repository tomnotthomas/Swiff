var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
const DB_NAME = process.env.DATABASE_NAME;
const DB_PORT = process.env.DATABASE_PORT;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`);
        console.log('MongoDB Connected');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
});
export default connectDB;
