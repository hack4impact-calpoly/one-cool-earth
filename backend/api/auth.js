const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res) => {
    if (req.user) {
        res.send('Welcome! You are logged in!')

    } else {
        res.send('You are not logged in!')
    }
})

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/google' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/api/auth/');
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/api/auth')
})

module.exports = router