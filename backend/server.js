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

const signUpEndpoint = require('./api/signup.js')
const announcementEndpoint = require('./api/announcement')
const authEndpoint = require('./api/auth')
const adminEndpoint = require('./api/admin')
const userEndpoint = require('./api/user')
const eventEndpoint = require('./api/event')
const locationEndpoint = require('./api/locations')
const shiftEndpoint = require('./api/shift')
const userDataEndpoint = require('./api/userData')

app.use('/api/signup', signUpEndpoint)
app.use('/api/announcement', announcementEndpoint)
app.use('/api/auth', authEndpoint.router)
app.use('/api/admin', adminEndpoint)
app.use('/api/user', userEndpoint)
app.use('/api/event', eventEndpoint)
app.use('/api/location', locationEndpoint)
app.use('/api/shift', shiftEndpoint)
app.use('/api/userData', userDataEndpoint)

app.get('/api/logout', authEndpoint.auth, async (req, res) => {
    if (req.user) {
        const options = { secure: true, httpOnly: true, sameSite: 'none' }

        res.clearCookie('auth_token', options)
        res.status(200)
        res.redirect(`${process.env.CLIENT_URL}`)
    }
})

if (process.argv.includes('dev')) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

module.exports = app