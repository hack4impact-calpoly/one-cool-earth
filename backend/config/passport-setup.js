const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')


passport.use(
  new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    User.findOne({ googleId: profile.id })
    .then((err, user) => {
      if (user) {
        return done(err, user)
      }
      // if user is in database but doesn't have googleId (after initial signup)
      else {
        User.findOneAndUpdate(
          { email : profile.emails[0].value},
          { googleId : profile.id },
          { new : true }
        ).then((usr) => {
          return done(null, usr)
        })
      }
    })
  }
))