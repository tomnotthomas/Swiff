import express from 'express';
import authRoutes from '../router.ts';
import ensureAuthenticated from '../controllers/auth-controller.ts';
const authRouter = express();
authRouter.get('/', function (req, res) {
    res.render('index', { user: req.user });
});
authRouter.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});
authRouter.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
// See views/auth.js for authentication routes
authRouter.use('/auth', authRoutes);
export default authRouter;
