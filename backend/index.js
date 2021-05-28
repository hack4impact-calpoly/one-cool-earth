const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()
require('./config/passport-setup')   // import passport configuration for google authentication
require('./database/connection')    // connection to database
const cookieParser = require('cookie-parser')

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// json body parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())

const loginEndpoint = require('./api/login.js')
const signUpEndpoint = require('./api/signup.js')
const authEndpoint = require('./api/auth')
const adminEndpoint = require('./api/admin')
const userEndpoint = require('./api/user')
const eventEndpoint = require('./api/event')
const addShiftEndpoint = require('./api/user/addShift')
const deleteShiftEndpoint = require('./api/user/deleteShift.js')

app.use('/api/login', loginEndpoint)
app.use('/api/signup', signUpEndpoint)
app.use('/api/auth', authEndpoint)
app.use('/api/admin', adminEndpoint)
app.use('/api/user', userEndpoint)
app.use('/api/event', eventEndpoint)
app.use('/api/user/addShift', addShiftEndpoint)
app.use('/api/user/deleteShift', deleteShiftEndpoint)

app.get('/api/user', async (req, res) => {
    res.redirect(`${process.env.SERVER_URL}/api/auth`)
})

app.get('/api/logout', async (req, res) => {
    res.redirect(`${process.env.SERVER_URL}/api/auth/logout`)
})

app.listen(3001, "localhost")