import express, { Express } from 'express';
import passport from 'passport';
import SteamStrategy from 'passport-steam';
import session from 'express-session';


export function configureSessionMiddleware(app: Express) {
  // Use the express-session middleware
  app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
  }));

  // Initialize Passport after the express-session middleware
  app.use(passport.initialize());
  app.use(passport.session());
}


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj:any , done) {
  done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3001/auth/steam/return',
    realm: 'http://localhost:3001/',
    apiKey: process.env.REACT_APP_STEAM_API_KEY!
  },

  function(identifier, profile: any, done) {
    console.log('Steam OpenID Response:', profile);
    process.nextTick(function () {
      if (!profile) {
        console.error('Profile is undefined or null');
        return done(new Error('Profile is undefined or null'));
      }
      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

export default passport;