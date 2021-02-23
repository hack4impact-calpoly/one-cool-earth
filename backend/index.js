const loginEndpoint = require('./api/login.js');
const sign_upEndpoint = require('./api/signup.js');
const bodyParser = require('body-parser')
const express = require('express')
const app = express();

app.use(bodyParser.json())

app.use('api/login', loginEndpoint);
app.use('api/sign-up', sign_upEndpoint);

app.listen(3001)