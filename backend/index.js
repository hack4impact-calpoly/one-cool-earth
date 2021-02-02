const login = require('./api/login.js');
const sign_up = require('./api/sign-up.js');
const express = require('express')
const app = express();

app.use(express.json())

app.use('api/login', login);
app.use('api/sign-up', sign_up);