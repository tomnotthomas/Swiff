import express from 'express';
import cors from 'cors';
import router from './router.js';
import passport from '../server/config/passport-config.js';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './router.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRouter from './routes/auth-routes.js';
import { configureSessionMiddleware } from '../server/config/passport-config.js';

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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
