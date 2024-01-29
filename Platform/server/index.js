const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router.js');
const db = require ('./models/index.js')
const passport = require('./config/passport-config.js')
const util = require('util')
const session = require('express-session')
const authRouter = require('./routes/auth-routes.js');

require('dotenv').config();

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




(async () =>{
  await db.sync()
    console.log('Created Database')
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  console.log('Server created')
  })();

