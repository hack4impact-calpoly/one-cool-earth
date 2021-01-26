const express = require('express');
const app = express();
const router = express.Router();
const User = require('./models/User')

router.get('./api/signup.js', async (req, res) => {
   let users = await User.find();
   res.status(200);
   res.json(users);
})

app.get('./api/signup.js')

modules.exports = router;