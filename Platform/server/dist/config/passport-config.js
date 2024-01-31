import passport from 'passport';
import SteamStrategy from 'passport-steam';
import session from 'express-session';
export function configureSessionMiddleware(app) {
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
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: process.env.REACT_APP_STEAM_API_KEY
}, function (identifier, profile, done) {
    process.nextTick(function () {
        if (!profile) {
            console.error('Profile is undefined or null');
            return done(new Error('Profile is undefined or null'));
        }
        profile.identifier = identifier;
        return done(null, profile);
    });
}));
export default passport;
