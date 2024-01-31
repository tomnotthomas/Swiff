import express from 'express';
import authRoutes from '../router.js';
import ensureAuthenticated from '../controllers/auth-controller.js';
import { Request, Response, NextFunction } from 'express';

const authRouter = express();

authRouter.get('/', function(req: Request, res: Response){
  res.render('index', { user: req.user });
});

authRouter.get('/account', ensureAuthenticated, function(req: Request, res: Response){
  res.render('account', { user: req.user });
});

authRouter.get('/logout', function(req: Request, res: Response, next: NextFunction){
  req.logout(function(err) {
    if (err) { 
      // handle error
      return next(err);
    }
    res.redirect('/');
  });
});

// See views/auth.js for authentication routes
authRouter.use('/auth', authRoutes);


export default authRouter