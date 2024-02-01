import { Router } from 'express'; // Import Router directly from express
import passport from './config/passport-config.js';
import session from './controllers/session-controller.js';
import { createUser, authUser } from './controllers/userController.js'
import { auth } from './middlewares/auth.js'
const router = Router();


router.get('/steamgames', session);
router.post('/register', createUser);
router.post('/auth', authUser);


  // GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get(
  '/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {res.redirect('/')}
);

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  '/auth/steam/return',
  function(req, res, next) {
    req.url = req.originalUrl;
    console.log('hi andro, its Router.ts, router.get(/auth/steam/return) finally hit' )
    next();
  },
  passport.authenticate('steam', { failureRedirect: '/steam-login' }),
  function(req, res) {res.redirect('/')}
);

export default router;
