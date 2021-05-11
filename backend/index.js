const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()
require('./config/passport-setup')   // import passport configuration for google authentication
require('./database/connection')    // connectino to database
const cookieSession = require('cookie-session')

const app = express();

// json body parsing middleware
app.use(bodyParser.json())

// cookie session
app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    name: 'test-session',
    keys: ['test-session-key']
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

const loginEndpoint = require('./api/login.js')
const signUpEndpoint = require('./api/signup.js')
const authEndpoint = require('./api/auth')
const datesEndpoint = require('./api/dates')
const adminEndpoint = require('./api/admin')
const userEndpoint = require('./api/user')

app.use('api/login', loginEndpoint)
app.use('api/signup', signUpEndpoint)
app.use('/api/auth', authEndpoint)
app.use('/api/user/events', datesEndpoint)
app.use('/api/admin', adminEndpoint)
app.use('/api/user', userEndpoint)

app.listen(3001, "localhost")