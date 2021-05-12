const express = require('express')
const passport = require('passport')
const router = express.Router()
const JWT_secret = process.env.JWT_SECRET || 'secretkey'
const jsonwebtoken = require('jsonwebtoken')
const ejwt = require('express-jwt')
const User= require('../models/User')

const jwt_options = {
    secret: JWT_secret,
    algorithms: ['sha1', 'RS256', 'HS256'],
    getToken: (req) => (req.cookies.auth_token),
}

const getUser = async (req, res, next) => {
    const { user } = req;

    if (user) {
        const { id } = req.user
        await User.findById(id, function(err, user) {
            req.user = user
        })
    }
    next()
}

const auth = [ejwt(jwt_options), getUser]

router.get('/', auth, async (req, res) => {
    res.json({ user: req.user })
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', 
    passport.authenticate('google', {
        session: false,
        failureRedirect: process.env.CLIENT_URL
    }),
    (req, res) => {
    // Successful authentication
    const token = jsonwebtoken.sign({id: req.user._id}, JWT_secret)
    res.redirect(`${process.env.CLIENT_URL}/auth/login/${token}`)
})

router.get('/logout', async (req, res) => {
    const options = { secure: true, httpOnly: true, sameSite: 'none' }

    res.clearCookie('auth_token', options)
    res.status(200)
    res.redirect(`${process.env.CLIENT_URL}`)
})

router.post('/token', async (req, res) => {
    const { token } = req.body
    const options = { secure: true, httpOnly: true, sameSite: 'none' }

    res.cookie('auth_token', token, options);
    res.sendStatus(200);
})

module.exports = router