import express, { Express, Request, Response } from "express";
import cors from 'cors';
import router from './router.js';
import dotenv from 'dotenv';
import connectDB from "./models/db.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import { configureSessionMiddleware } from './config/passport-config.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3001;
const app = express();

dotenv.config();

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://steamcommunity.com/',  // Add other origins as needed
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

configureSessionMiddleware(app);

app.use(express.static(__dirname + '/../../public'));

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


