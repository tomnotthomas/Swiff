import { Router } from 'express'; // Import Router directly from express
import passport from './config/passport-config.js';
import { getSteamGames, getSteamId } from './controllers/steamController.js';
import { createUser, authUser } from './controllers/userController.js';
import { authByToken } from './middlewares/auth.js';
import { setPaymentStatus } from './controllers/paymentController.js';
import { stopVm } from './controllers/stopVmController.js';
import { startVm } from './controllers/startVmController.js';
const router = Router();
// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/login' }), function (req, res) { res.redirect('/'); });
router.get('/steamgames', getSteamGames);
router.post('/register', createUser);
router.post('/auth', authUser);
router.get('/auth/steam/return', authByToken, getSteamId);
router.post('/setpaiduser', setPaymentStatus);
router.post('/stopvm', stopVm);
router.post('/startvm', startVm);
// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get('/auth/steam/return',
//   passport.authenticate('steam', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/');
//   });
export default router;
