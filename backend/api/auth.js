const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('You are not logged in!')
})

router.get('/failed', (req, res) => {
    res.send('Login attempt failed! :(')
})

router.get('/good', (req, res) => {
    res.send(`Login attempt successful! Hello ${req.user.displayName} :)`)
    console.log(req.user._json)
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/auth/good');
})

router.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/api/auth')
})

module.exports = router