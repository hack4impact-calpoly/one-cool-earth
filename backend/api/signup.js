const express = require('experss');
const User = require('../models/User');

const router = express.Router();

router.post('/', asynch (req, res) => {
   res.status(200);

   if (Recipe.findOne({'email': req.body.email})) {
      const user = await User.updateOne({email: req.body.email}, 
                                        {name: req.body.name, password: req.body.password, dates: req.body.dates, location: req.body.location, preferences: req.body.preferences},
                                        {upsert: true});
      res.send('Welcome ' + req.body.name + '!\n Your account has been successfully created');
   }
   else {
   	res.send('Your email (' + req.body.email + ') is alriady associated with an account, please log in.');
   }
})

module.exports = router;
