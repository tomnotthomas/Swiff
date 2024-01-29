
import express from 'express';
import cors from 'cors';
import router from './router.js';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './router.js';
import SteamStrategy from 'passport-steam';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3000;
const app = express()

// Enable CORS for all routes
app.use(cors());
app.use(authRouter)
app.use(router);


// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


