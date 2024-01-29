const express = require('express');
const authRouter = express();
const authRoutes = require ('../router')
const ensureAuthenticated= require ('../controllers/auth-controller')

authRouter.get('/', function(req, res){
  res.render('index', { user: req.user });
});

authRouter.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

authRouter.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// See views/auth.js for authentication routes
authRouter.use('/auth', authRoutes);


module.exports= authRouter