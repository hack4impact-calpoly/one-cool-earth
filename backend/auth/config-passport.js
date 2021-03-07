const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
// const User = require('../model/User.js')

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
    done(null, user);
});

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOne({ name: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));