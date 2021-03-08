const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User.js')

passport.serializeUser( (user, done) => {
  done(null, user.id);
});
  
passport.deserializeUser( (id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  });
});

passport.use(
  new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    User.findOne({ googleId: profile.id }).then((user) => {
      // if user exists
      if (user) { 
        return done(null, user);
      }
      // if user exists without googleId
      // add googleId to user
      else {
        User.findOneAndUpdate({email: profile._json.email}, {googleId: profile.id}, {new: true}).then((user) => {
          // if user isn't found
          if (!user) {
            n = { first: profile._json.given_name, last: profile._json.family_name };
            new User({
              googleId: profile.id,
              name: n,
              email: profile._json.email,
              password: '',
              admin: false,
              location: '',
              volunteerPreferences: [],
              availableDates: []
            }).save();
          }
          return done(null, user);
        })
      }
    });
  }
));