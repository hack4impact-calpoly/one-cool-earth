const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()
require('./auth/config-passport.js')   // import passport configuration for google authentication
const cookieSession = require('cookie-session')

const app = express();

// json body parsing middleware
app.use(bodyParser.json())

// cookie session
app.use(cookieSession({
    name: 'test-sesion',
    keys: ['key1', 'key2']
}))

// const loginEndpoint = require('./api/login.js')
// const signUpEndpoint = require('./api/signup.js')
const authEndpoint = require('./api/auth.js')

app.use(passport.initialize())
app.use(passport.session())

// app.use('api/login', loginEndpoint)
// app.use('api/sign-up', signUpEndpoint)
app.use('/api/auth', authEndpoint)

app.listen(3001)