import express, { Express, Request, Response } from "express";
import cors from 'cors';
import router from './router.ts';
import dotenv from 'dotenv';
import connectDB from "./models/db.ts";
import authRoutes from './router.ts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRouter from './routes/auth-routes.js';
import { configureSessionMiddleware } from './config/passport-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3001;

const app = express();

dotenv.config();

// Enable CORS for all routes
app.use(cors());
app.use(authRouter)

// Use the router
app.use(router);


configureSessionMiddleware(app);


app.use(express.static(__dirname + '/../../public'));

// See views/auth.js for authentication routes
app.use('/auth', authRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


