import express from 'express';
import authRoutes from '../router.js';
import ensureAuthenticated from '../controllers/auth-controller.js';
const authRouter = express();
authRouter.get('/', function (req, res) {
    res.render('index', { user: req.user });
});
authRouter.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});
authRouter.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            // handle error
            return next(err);
        }
        res.redirect('/');
    });
});
// See views/auth.js for authentication routes
authRouter.use('/auth', authRoutes);
export default authRouter;
