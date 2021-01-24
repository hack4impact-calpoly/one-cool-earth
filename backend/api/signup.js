const express = require('experss');
const User = require('../models/User');
const DB = require('../database/recipeDataase.js');

const router = express.Router();

router.post('/', asynch (req, res) => {
   res.status(200);
   
   const user = await User.updateOne({email: req.body.email}, 
                                       {admin: req.body.email, name: req.body.name, password: req.body.password, dates: req.body.dates, location: req.body.location, preferences: req.body.preferences},
                                       {upsert: true});
   res.send('Welcome ' + req.body.name + '!\n Your account has been successfully created');

})

module.exports = router;
