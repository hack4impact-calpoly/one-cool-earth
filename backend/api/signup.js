const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async(req, res) => {
   email = req.body.email
   userName = req.body.name
   location = req.body.location
   volunteerPreferences = req.body.volunteerPreferences
   phone = req.body.phoneNumber;
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
            "volunteerPreferences": volunteerPreferences,
            "admin": false,
            "phoneNumber": phone,
            "shifts": [],
            "active": true,
            "signedWaiver": false,
         })
         doc.save()
         res.status(200)
         res.json({status: 'ok'})
      }
   })
})

module.exports = router
