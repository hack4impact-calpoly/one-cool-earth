const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async(req, res) => {
   email = req.body.email
   userName = req.body.name
   location = req.body.location
   pref = req.body.preferences
   phone = req.body.phoneNum;
   await User.findOne({"email": email})
   .then( (user) => {
      if (user) {
         res.status(200)
         res.json({status: 'user already exists'})
      } else {
         var doc = new User({
               "email": email, 
               "name": userName, 
               "location": location, 
               "volunteerPreferences": pref, 
               "admin": false,
               "phoneNumber": phone,
               "shifts": [null],
            })
         doc.save()
         res.status(200)
         res.json({status: 'ok'})
      }
   })
})

module.exports = router;