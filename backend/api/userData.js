const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authEndpoint = require('./auth');

router.get('/get-users', async(req, res) => {
  User.find({}).then(users => {
    res.json(users)
  })
})

module.exports = router